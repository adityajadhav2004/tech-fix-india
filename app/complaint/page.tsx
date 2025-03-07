"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Upload } from "lucide-react"
import { submitComplaint } from "@/lib/api"

export default function ComplaintPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    laptop_brand: "",
    model: "",
    issue: "",
    preferred_contact_time: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData object for file upload
      const data = new FormData()

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value)
      })

      // Add file if selected
      if (selectedFile) {
        data.append("image", selectedFile)
      }

      // Submit to API
      const response = await submitComplaint(data)

      toast({
        title: "Complaint Submitted Successfully!",
        description: (
          <div className="mt-2">
            <p>
              Your complaint has been registered with ID: <strong>{response.complaint_id}</strong>
            </p>
            <p className="mt-2">We will contact you shortly to address your issue.</p>
          </div>
        ),
      })

      // Reset form
      setFormData({
        customer_name: "",
        email: "",
        phone: "",
        laptop_brand: "",
        model: "",
        issue: "",
        preferred_contact_time: "",
      })
      setSelectedFile(null)

      // Reset form element
      const form = e.target as HTMLFormElement
      form.reset()
    } catch (error) {
      console.error("Error submitting complaint:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit complaint. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Lodge a Complaint</h1>
          <p className="text-muted-foreground mt-2">
            Fill out the form below to register your laptop issue. We'll get back to you as soon as possible.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Complaint Form</CardTitle>
            <CardDescription>Please provide detailed information about your laptop issue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customer_name">Full Name</Label>
                  <Input
                    id="customer_name"
                    placeholder="Your full name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferred_contact_time">Preferred Contact Time</Label>
                  <Select onValueChange={(value) => handleSelectChange("preferred_contact_time", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                      <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="laptop_brand">Laptop Brand</Label>
                  <Select onValueChange={(value) => handleSelectChange("laptop_brand", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dell">Dell</SelectItem>
                      <SelectItem value="HP">HP</SelectItem>
                      <SelectItem value="Lenovo">Lenovo</SelectItem>
                      <SelectItem value="Acer">Acer</SelectItem>
                      <SelectItem value="Asus">Asus</SelectItem>
                      <SelectItem value="Apple">Apple</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Laptop Model</Label>
                  <Input
                    id="model"
                    placeholder="e.g., Dell XPS 13, MacBook Pro"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue">Issue Description</Label>
                <Textarea
                  id="issue"
                  placeholder="Please describe your laptop issue in detail"
                  className="min-h-[120px]"
                  value={formData.issue}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image")?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {selectedFile ? "Change Image" : "Upload Image"}
                  </Button>
                  <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-2">Selected file: {selectedFile.name}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}

