import express from "express"
import mysql from "mysql2/promise"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"

// Initialize environment variables
dotenv.config()

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"), false)
    }
    cb(null, true)
  },
})

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "laptop_service_center",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Test database connection
app.get("/api/test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 as test")
    res.json({
      success: true,
      message: "Database connection successful",
      data: rows,
    })
  } catch (error) {
    console.error("Database connection error:", error)
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    })
  }
})

// API to submit complaint with image upload
app.post("/api/complaints", upload.single("image"), async (req, res) => {
  try {
    const { customer_name, email, phone, laptop_brand, model, issue, preferred_contact_time } = req.body

    // Get image path if uploaded
    const image_url = req.file ? `/uploads/${req.file.filename}` : null

    const [result] = await pool.query(
      `INSERT INTO complaints 
       (customer_name, email, phone, laptop_brand, model, issue, image_url, preferred_contact_time) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [customer_name, email, phone, laptop_brand, model, issue, image_url, preferred_contact_time],
    )

    // Generate a complaint ID with TF prefix
    const complaintId = `TF${result.insertId.toString().padStart(5, "0")}`

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint_id: complaintId,
    })
  } catch (error) {
    console.error("Error submitting complaint:", error)
    res.status(500).json({
      success: false,
      message: "Failed to submit complaint",
      error: error.message,
    })
  }
})

// API to track complaint
app.get("/api/complaints/track/:id", async (req, res) => {
  try {
    const complaintId = req.params.id
    // Extract numeric part if ID starts with TF
    const numericId = complaintId.startsWith("TF") ? complaintId.substring(2) : complaintId

    const [rows] = await pool.query(
      `SELECT id, customer_name, laptop_brand, model, issue, status, 
       DATE_FORMAT(created_at, '%Y-%m-%d') as created_at,
       DATE_FORMAT(DATE_ADD(created_at, INTERVAL 3 DAY), '%Y-%m-%d') as estimated_completion
       FROM complaints WHERE id = ?`,
      [Number.parseInt(numericId)],
    )

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      })
    }

    // Format the response
    const complaint = rows[0]
    const formattedResponse = {
      id: `TF${complaint.id.toString().padStart(5, "0")}`,
      customerName: complaint.customer_name,
      laptopModel: `${complaint.laptop_brand} ${complaint.model}`,
      issueDescription: complaint.issue,
      status: complaint.status,
      createdAt: complaint.created_at,
      estimatedCompletion: complaint.estimated_completion,
    }

    res.json({
      success: true,
      data: formattedResponse,
    })
  } catch (error) {
    console.error("Error tracking complaint:", error)
    res.status(500).json({
      success: false,
      message: "Failed to track complaint",
      error: error.message,
    })
  }
})

// API to update complaint status (admin)
app.put("/api/complaints/:id/status", async (req, res) => {
  try {
    const complaintId = req.params.id
    const { status } = req.body

    // Extract numeric part if ID starts with TF
    const numericId = complaintId.startsWith("TF") ? complaintId.substring(2) : complaintId

    // Validate status
    const validStatuses = ["Pending", "Under Repair", "Ready for Pickup", "Completed"]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      })
    }

    const [result] = await pool.query("UPDATE complaints SET status = ? WHERE id = ?", [
      status,
      Number.parseInt(numericId),
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      })
    }

    res.json({
      success: true,
      message: "Complaint status updated successfully",
    })
  } catch (error) {
    console.error("Error updating complaint status:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update complaint status",
      error: error.message,
    })
  }
})

// API to get all complaints (admin)
app.get("/api/complaints", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, customer_name, phone, laptop_brand, model, issue, status, 
      DATE_FORMAT(created_at, '%Y-%m-%d') as created_at
      FROM complaints ORDER BY created_at DESC
    `)

    // Format the complaint IDs and data
    const complaints = rows.map((complaint) => ({
      id: `TF${complaint.id.toString().padStart(5, "0")}`,
      customerName: complaint.customer_name,
      phone: complaint.phone,
      laptopModel: `${complaint.laptop_brand} ${complaint.model}`,
      issue: complaint.issue,
      status: complaint.status,
      createdAt: complaint.created_at,
    }))

    res.json({
      success: true,
      data: complaints,
    })
  } catch (error) {
    console.error("Error fetching complaints:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch complaints",
      error: error.message,
    })
  }
})

// API to submit feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const { customer_name, email, rating, comments } = req.body

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      })
    }

    const [result] = await pool.query(
      `INSERT INTO feedback 
       (customer_name, email, rating, comments) 
       VALUES (?, ?, ?, ?)`,
      [customer_name, email, rating, comments],
    )

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback_id: result.insertId,
    })
  } catch (error) {
    console.error("Error submitting feedback:", error)
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback",
      error: error.message,
    })
  }
})

// API to get all feedback (admin)
app.get("/api/feedback", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, customer_name, email, rating, comments, 
      DATE_FORMAT(created_at, '%Y-%m-%d') as created_at
      FROM feedback ORDER BY created_at DESC
    `)

    res.json({
      success: true,
      data: rows,
    })
  } catch (error) {
    console.error("Error fetching feedback:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback",
      error: error.message,
    })
  }
})

// Admin authentication
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body

    // In a real application, you would check against a database
    // For this demo, we're using hardcoded credentials
    if (username === "admin" && password === "admin123") {
      res.json({
        success: true,
        message: "Login successful",
        user: { username: "admin", role: "administrator" },
      })
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      })
    }
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Create database and tables if they don't exist
async function initializeDatabase() {
  try {
    // Create connection without database selected
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    })

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "laptop_service_center"}`)

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || "laptop_service_center"}`)

    // Create complaints table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS complaints (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        laptop_brand VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        issue TEXT NOT NULL,
        image_url VARCHAR(255),
        preferred_contact_time VARCHAR(50),
        status ENUM('Pending', 'Under Repair', 'Ready for Pickup', 'Completed') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create feedback table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comments TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insert sample data if tables are empty
    const [complaintRows] = await connection.query("SELECT COUNT(*) as count FROM complaints")
    if (complaintRows[0].count === 0) {
      await connection.query(`
        INSERT INTO complaints (customer_name, email, phone, laptop_brand, model, issue, status)
        VALUES 
        ('Rahul Sharma', 'rahul.s@example.com', '+919876543210', 'Dell', 'XPS 15', 'Laptop not turning on, battery issues', 'Pending'),
        ('Priya Patel', 'priya.p@example.com', '+918765432109', 'HP', 'Pavilion', 'Screen flickering and keyboard not working properly', 'Under Repair'),
        ('Amit Kumar', 'amit.k@example.com', '+917654321098', 'Lenovo', 'ThinkPad', 'Overheating and slow performance', 'Ready for Pickup'),
        ('Sneha Gupta', 'sneha.g@example.com', '+916543210987', 'Apple', 'MacBook Pro', 'Charging port damaged', 'Completed')
      `)
    }

    const [feedbackRows] = await connection.query("SELECT COUNT(*) as count FROM feedback")
    if (feedbackRows[0].count === 0) {
      await connection.query(`
        INSERT INTO feedback (customer_name, email, rating, comments)
        VALUES 
        ('Vikram Singh', 'vikram.s@example.com', 5, 'Excellent service! My laptop was fixed within 24 hours and works perfectly now.'),
        ('Neha Sharma', 'neha.s@example.com', 4, 'Good service and reasonable pricing. Would recommend to others.'),
        ('Rajesh Kumar', 'rajesh.k@example.com', 3, 'Service was okay. Took a bit longer than expected but the repair was done well.')
      `)
    }

    console.log("Database and tables initialized successfully")

    // Close the connection
    await connection.end()
  } catch (error) {
    console.error("Error initializing database:", error)
  }
}

// Initialize the database when the server starts
initializeDatabase()

