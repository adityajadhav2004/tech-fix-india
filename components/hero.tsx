"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Hero() {
  const [trackingId, setTrackingId] = useState("")

  const handleQuickComplaint = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Complaint Submitted!",
      description: "Your complaint has been registered. Complaint ID: TF" + Math.floor(10000 + Math.random() * 90000),
    })
  }

  const handleTrackComplaint = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingId) {
      toast({
        title: "Error",
        description: "Please enter a valid complaint ID",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would fetch from the database
    toast({
      title: "Complaint Status",
      description: "Your complaint (ID: " + trackingId + ") is currently Under Repair. Estimated completion: 24 hours.",
    })
  }

  return (
    <section className="relative py-12 md:py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Fast & Reliable Laptop Repairs – Hassle-Free!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert laptop repair services in India. Quick turnaround, genuine parts, and affordable pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="sm:w-auto">
                <Link href="/complaint">Lodge a Complaint</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="sm:w-auto">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>

          <div>
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <Tabs defaultValue="complaint" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="complaint">Quick Complaint</TabsTrigger>
                    <TabsTrigger value="track">Track Status</TabsTrigger>
                  </TabsList>

                  <TabsContent value="complaint" className="p-6">
                    <form onSubmit={handleQuickComplaint} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your full name" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="Your phone number" required />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="brand">Laptop Brand</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dell">Dell</SelectItem>
                                <SelectItem value="hp">HP</SelectItem>
                                <SelectItem value="lenovo">Lenovo</SelectItem>
                                <SelectItem value="acer">Acer</SelectItem>
                                <SelectItem value="asus">Asus</SelectItem>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="model">Model</Label>
                            <Input id="model" placeholder="Laptop model" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="issue">Issue Description</Label>
                          <Textarea id="issue" placeholder="Describe your laptop issue" required />
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Submit Complaint
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="track" className="p-6">
                    <form onSubmit={handleTrackComplaint} className="space-y-4">
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

                      <Button type="submit" className="w-full">
                        Track Status
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}

