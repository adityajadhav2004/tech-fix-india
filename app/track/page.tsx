"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { CheckCircle2, Clock, Wrench, Package } from "lucide-react"
import { trackComplaint } from "@/lib/api"

type ComplaintStatus = "Pending" | "Under Repair" | "Ready for Pickup" | "Completed"

interface ComplaintDetails {
  id: string
  customerName: string
  laptopModel: string
  issueDescription: string
  status: ComplaintStatus
  createdAt: string
  estimatedCompletion?: string
}

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [complaintDetails, setComplaintDetails] = useState<ComplaintDetails | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingId) {
      toast({
        title: "Error",
        description: "Please enter a valid complaint ID",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await trackComplaint(trackingId)
      setComplaintDetails(response.data)
    } catch (error) {
      console.error("Error tracking complaint:", error)
      toast({
        title: "Complaint Not Found",
        description: "We couldn't find a complaint with the provided ID. Please check and try again.",
        variant: "destructive",
      })
      setComplaintDetails(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-8 w-8 text-yellow-500" />
      case "Under Repair":
        return <Wrench className="h-8 w-8 text-blue-500" />
      case "Ready for Pickup":
        return <Package className="h-8 w-8 text-green-500" />
      case "Completed":
        return <CheckCircle2 className="h-8 w-8 text-green-500" />
    }
  }

  const getStatusDescription = (status: ComplaintStatus) => {
    switch (status) {
      case "Pending":
        return "Your complaint has been registered and is pending review by our technicians."
      case "Under Repair":
        return "Our technicians are currently working on your laptop."
      case "Ready for Pickup":
        return "Your laptop has been repaired and is ready for pickup."
      case "Completed":
        return "Your repair has been completed and the laptop has been delivered/picked up."
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Track Your Complaint</h1>
          <p className="text-muted-foreground mt-2">
            Enter your complaint ID to check the current status of your laptop repair
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Complaint Tracking</CardTitle>
            <CardDescription>Enter the complaint ID you received when you submitted your complaint</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tracking-id">Complaint ID</Label>
                <Input
                  id="tracking-id"
                  placeholder="Enter your complaint ID (e.g., TF12345)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Searching..." : "Track Complaint"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {complaintDetails && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Complaint Details</span>
                <span className="text-sm font-normal text-muted-foreground">ID: {complaintDetails.id}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Status</h3>
                    <div className="flex items-center mt-1">
                      {getStatusIcon(complaintDetails.status)}
                      <span className="ml-2 font-semibold">{complaintDetails.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getStatusDescription(complaintDetails.status)}
                    </p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Submitted on:</span>{" "}
                      <span className="font-medium">{complaintDetails.createdAt}</span>
                    </p>
                    {complaintDetails.estimatedCompletion && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Estimated completion:</span>{" "}
                        <span className="font-medium">{complaintDetails.estimatedCompletion}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                  <div>
                    <h3 className="font-medium">Customer Information</h3>
                    <p className="text-sm mt-1">{complaintDetails.customerName}</p>
                  </div>

                  <div>
                    <h3 className="font-medium">Laptop Model</h3>
                    <p className="text-sm mt-1">{complaintDetails.laptopModel}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium">Issue Description</h3>
                  <p className="text-sm mt-1">{complaintDetails.issueDescription}</p>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium">Need Help?</h3>
                  <p className="text-sm mt-1">
                    If you have any questions about your repair, please contact us at{" "}
                    <a href="tel:+919876543210" className="text-primary hover:underline">
                      +91 98765 43210
                    </a>{" "}
                    or email us at{" "}
                    <a href="mailto:support@techfixindia.com" className="text-primary hover:underline">
                      support@techfixindia.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <Toaster />
    </div>
  )
}

