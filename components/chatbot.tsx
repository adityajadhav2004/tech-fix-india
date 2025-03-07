"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Send, X, MessageSquare, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your TechFix assistant. How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Pre-defined responses for common questions
  const responses: Record<string, string> = {
    "screen replacement":
      "Screen replacement costs depend on the brand and model. Typically, it ranges from ₹2,500 to ₹7,000 for most laptops.",
    "battery replacement": "Battery replacement costs between ₹1,800 to ₹4,500 depending on your laptop model.",
    "repair time": "Most repairs are completed within 24-48 hours. Complex repairs might take 3-5 business days.",
    location:
      "Our service center is located at 123 MG Road, Mumbai, Maharashtra 400001, India. We are open Monday to Saturday from 10 AM to 7 PM.",
    warranty: "We provide a 3-month warranty on all our repair services and replacement parts.",
    payment: "We accept cash, credit/debit cards, UPI payments (PhonePe, Google Pay, Paytm), and net banking.",
    pickup: "Yes, we offer free pickup and delivery services within city limits for repairs above ₹2,000.",
    data: "Your data is safe with us. We follow strict privacy protocols and do not access your personal files without permission.",
    "os installation":
      "OS installation costs between ₹800 to ₹1,500 depending on the operating system and additional software requirements.",
    virus: "Virus removal and system optimization services start from ₹500.",
    motherboard: "Motherboard repairs range from ₹1,500 to ₹8,000 depending on the issue complexity.",
    contact: "You can reach us at +91 98765 43210 or email us at info@techfixindia.com.",
  }

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Find matching response
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have information on that. Please call us at +91 98765 43210 for assistance."

      // Check for keywords in the user's message
      const userInput = input.toLowerCase()
      for (const [keyword, response] of Object.entries(responses)) {
        if (userInput.includes(keyword)) {
          botResponse = response
          break
        }
      }

      // Add bot response
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
      }
      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-lg">
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 sm:w-96 shadow-xl z-50 flex flex-col max-h-[500px]">
          <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="TechFix Assistant" />
                <AvatarFallback>TF</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">TechFix Assistant</h3>
                <p className="text-xs opacity-90">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 text-primary-foreground"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 text-primary-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 overflow-y-auto flex-grow">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <CardFooter className="p-3 border-t">
            <form onSubmit={handleSend} className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

