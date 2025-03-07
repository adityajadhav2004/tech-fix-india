import { Shield, Clock, Banknote } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Why Choose Us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide exceptional laptop repair services with a focus on quality, speed, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <Clock className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Fast Turnaround</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Most repairs completed within 24-48 hours. We value your time and work efficiently to get your laptop
                back to you as quickly as possible.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <Banknote className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Affordable Pricing</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                Competitive and transparent pricing with no hidden charges. We offer the best value for high-quality
                laptop repair services.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-2">
              <Shield className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Genuine Parts</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base">
                We use only authentic parts for all repairs, ensuring optimal performance and longevity for your laptop.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

