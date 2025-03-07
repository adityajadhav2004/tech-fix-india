"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Star } from "lucide-react"
import { submitFeedback } from "@/lib/api"

export default function FeedbackPage() {
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    comments: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting your feedback.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await submitFeedback({
        customer_name: formData.customer_name,
        email: formData.email,
        rating,
        comments: formData.comments,
      })

      toast({
        title: "Thank You for Your Feedback!",
        description: "We appreciate your input and will use it to improve our services.",
      })

      // Reset form
      setRating(0)
      setFormData({
        customer_name: "",
        email: "",
        comments: "",
      })

      // Reset form element
      const form = e.target as HTMLFormElement
      form.reset()
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Your Feedback Matters</h1>
          <p className="text-muted-foreground mt-2">
            We value your opinion! Please share your experience with our laptop repair services.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription>Help us improve our services by providing your valuable feedback</CardDescription>
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
              </div>

              <div className="space-y-2">
                <Label>Service Rating</Label>
                <div className="flex items-center justify-center py-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        (hoveredRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  {rating === 0 ? "Click to rate our service" : `You rated our service ${rating} out of 5 stars`}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comments / Suggestions</Label>
                <Textarea
                  id="comments"
                  placeholder="Please share your experience and any suggestions for improvement"
                  className="min-h-[120px]"
                  value={formData.comments}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}

