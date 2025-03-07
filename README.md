# Tech Fix India - Laptop Service Center Website

## 🚀 Project Overview

Tech Fix India is a modern, responsive laptop service center website designed specifically for the Indian market. This project was built as part of my college journey to enhance my web development skills and solve a real-world problem. The website enables users to:

- Lodge complaints (stored in MySQL)
- Track complaint status via a unique complaint ID
- Submit feedback (saved in MySQL)
- Interact with a simple chatbot (pre-set responses, not AI-based)
- View available services & pricing
- Access an admin panel to manage complaints & feedback

---

## 🎨 UI/UX Design

✅ Clean, minimalist, mobile-first design  
✅ Color Theme: Indian-inspired – Blue & Orange (trust + energy)  
✅ Google Fonts: Poppins or Roboto for a professional look  
✅ Animations: Smooth page transitions & hover effects  
✅ Dark/Light Mode Toggle for better accessibility  
✅ Icons & Illustrations: FontAwesome & Indian-themed graphics  

---

## 🔧 Tech Stack & Tools

### Frontend:
- HTML5, CSS3 (TailwindCSS or Bootstrap 5), JavaScript (Vanilla/React.js for interactivity)
- EJS (for templating if using Express.js)

### Backend:
- Node.js (Express.js for routing & APIs)

### Database:
- MySQL (XAMPP or WAMP for localhost testing)

### Hosting (for later deployment):
- DigitalOcean / AWS / Linode / Hostinger

---

## 📌 Core Website Features & Functionality

### 1️⃣ Homepage (Landing Page)
- Hero Banner: "Fast & Reliable Laptop Repairs – Hassle-Free!"
- Quick Complaint Form (Name, Phone, Laptop Model, Issue, Submit Button)
- Complaint Tracking Field (User enters complaint ID to check status)
- Why Choose Us? – Fast, Affordable, Genuine Parts
- Top Laptop Brands We Service (Dell, HP, Lenovo, Acer, etc.)

### 2️⃣ Complaint Management System
- **Complaint Form (Stored in MySQL)**
  - Customer Name
  - Email & Phone Number
  - Laptop Brand & Model
  - Issue Description (Detailed)
  - Upload Image (if needed)
  - Preferred Contact Time
- **Complaint Tracking System**
  - User enters Complaint ID → Fetch status from MySQL
  - Possible statuses: Pending, Under Repair, Ready for Pickup, Completed
  - Sends SMS/WhatsApp Notification via API (e.g., Twilio, Msg91)

### 3️⃣ Feedback Form (Saved in MySQL)
- Name, Email
- Service Rating (1-5 Stars)
- Comments / Suggestions
- Thank You Message on Submission

### 4️⃣ Chatbot (Non-AI, Pre-Defined Responses)
- A simple chatbot that answers FAQs such as:
  - "How much does a laptop screen replacement cost?" → "Depends on the brand; usually ₹2500 - ₹7000."
  - "How long does repair take?" → "Typically 24-48 hours for most issues."
  - "Where is your service center?" → "Located at MG Road, Mumbai. Open Mon-Sat 10 AM - 7 PM."

### 5️⃣ Services Page
- List of services offered (Battery Replacement, OS Installation, Data Recovery, etc.)
- Estimated Pricing Table (₹ ranges)

### 6️⃣ Contact Us Page
- Google Maps Integration (Service Center Location)
- Phone, Email, and WhatsApp Support
- Business Hours

### 7️⃣ Admin Panel (Login Required)
- View all complaints in a dashboard
- Update complaint status (Pending → Under Repair → Completed)
- View feedback submissions
- Manage chatbot responses (optional)

---

## 📌 Database Schema (MySQL)

```sql
CREATE DATABASE laptop_service_center;

USE laptop_service_center;

CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(15),
    laptop_brand VARCHAR(50),
    model VARCHAR(50),
    issue TEXT,
    image_url VARCHAR(255),
    status ENUM('Pending', 'Under Repair', 'Ready for Pickup', 'Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255),
    email VARCHAR(255),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Complete Working Backend for Laptop Service Center

### 📌 Backend Setup

1. **Create a new directory for the backend**:
   ```sh
   mkdir laptop-service-center-backend
   cd laptop-service-center-backend
   ```

2. **Initialize a new Node.js project**:
   ```sh
   npm init -y
   ```

3. **Install required dependencies**:
   ```sh
   npm install express mysql2 cors body-parser dotenv multer
   npm install --save-dev nodemon
   ```

4. **Create the `server.js` file** with the provided code.
5. **Create a `.env` file** with the following content:
   ```plaintext
   PORT=3001
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=laptop_service_center
   ```

6. **Create an uploads directory** for storing images:
   ```sh
   mkdir uploads
   ```

7. **Update `package.json`** to include the type module and scripts:
   ```json
   {
     "type": "module",
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
   }
   ```

### 📌 Running the Application

1. **Start the backend server**:
   ```sh
   cd laptop-service-center-backend
   npm run dev
   ```

2. **Start the frontend development server**:
   ```sh
   cd laptop-service-center
   npm run dev
   ```

3. **Access the website** at `http://localhost:3000`.
4. **Access the admin panel** at `http://localhost:3000/admin` (username: admin, password: admin123).

### 📌 Key Features of the Backend

- **Complete API Integration** (Frontend connects with backend seamlessly)
- **File Upload Handling** (Image uploads for complaints)
- **Database Integration** (Automatic table creation & sample data insertion)
- **Error Handling** (Comprehensive error messages)
- **Authentication** (Secure admin login system)
- **Data Validation** (Proper input checks for all form submissions)

---

## 🎯 Expected Outcome

A beautiful, user-friendly Indian laptop service center website with:
- ✔ Complaint & Tracking System (stored in MySQL)
- ✔ Feedback System
- ✔ Simple Chatbot for FAQs
- ✔ Admin Panel for Complaint Management
- ✔ Fully Responsive & Mobile-Optimized UI

---

🚀 **Want More Features?** Let me know! 😃
