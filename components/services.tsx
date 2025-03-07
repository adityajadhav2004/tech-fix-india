import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Services() {
  const services = [
    {
      title: "Screen Replacement",
      description: "Replace cracked or damaged laptop screens with high-quality displays.",
      price: "₹2,500 - ₹7,000",
      link: "/services#screen-replacement",
    },
    {
      title: "Battery Replacement",
      description: "Restore your laptop's battery life with genuine replacement batteries.",
      price: "₹1,800 - ₹4,500",
      link: "/services#battery-replacement",
    },
    {
      title: "OS Installation",
      description: "Clean installation of Windows, macOS, or Linux operating systems.",
      price: "₹800 - ₹1,500",
      link: "/services#os-installation",
    },
    {
      title: "Data Recovery",
      description: "Recover lost or deleted data from damaged hard drives or SSDs.",
      price: "₹2,000 - ₹8,000",
      link: "/services#data-recovery",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of laptop repair services to address all your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-lg">{service.price}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="p-0 h-auto">
                  <Link href={service.link} className="flex items-center text-primary">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

