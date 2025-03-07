import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      id: "screen-replacement",
      title: "Screen Replacement",
      description: "Replace cracked or damaged laptop screens with high-quality displays.",
      features: [
        "Genuine replacement screens",
        "All brands supported",
        "Same-day service available",
        "3-month warranty",
      ],
      pricing: [
        { item: "Standard LCD Screen", price: "₹2,500 - ₹4,000" },
        { item: "HD LED Screen", price: "₹3,500 - ₹5,500" },
        { item: "Full HD IPS Screen", price: "₹4,500 - ₹7,000" },
        { item: "Touch Screen", price: "₹6,000 - ₹12,000" },
      ],
    },
    {
      id: "battery-replacement",
      title: "Battery Replacement",
      description: "Restore your laptop's battery life with genuine replacement batteries.",
      features: [
        "Original or compatible batteries",
        "Free battery health check",
        "Proper disposal of old batteries",
        "6-month warranty",
      ],
      pricing: [
        { item: "Standard 3-Cell Battery", price: "₹1,800 - ₹3,000" },
        { item: "Extended 6-Cell Battery", price: "₹2,500 - ₹4,000" },
        { item: "Premium Battery (MacBook)", price: "₹3,500 - ₹7,000" },
      ],
    },
    {
      id: "os-installation",
      title: "OS Installation",
      description: "Clean installation of Windows, macOS, or Linux operating systems.",
      features: [
        "Data backup available",
        "Driver installation included",
        "Basic software setup",
        "System optimization",
      ],
      pricing: [
        { item: "Windows OS Installation", price: "₹800 - ₹1,200" },
        { item: "macOS Installation", price: "₹1,000 - ₹1,500" },
        { item: "Linux Installation", price: "₹600 - ₹1,000" },
        { item: "OS Installation + Software Package", price: "₹1,500 - ₹2,500" },
      ],
    },
    {
      id: "data-recovery",
      title: "Data Recovery",
      description: "Recover lost or deleted data from damaged hard drives or SSDs.",
      features: [
        "Advanced recovery techniques",
        "Confidential data handling",
        "Free evaluation",
        "No recovery, no fee policy",
      ],
      pricing: [
        { item: "Basic Data Recovery", price: "₹2,000 - ₹4,000" },
        { item: "Advanced Recovery (Corrupted Drive)", price: "₹4,000 - ₹6,000" },
        { item: "Complex Recovery (Physical Damage)", price: "₹6,000 - ₹8,000" },
      ],
    },
    {
      id: "motherboard-repair",
      title: "Motherboard Repair",
      description: "Expert repair of laptop motherboards and component-level fixes.",
      features: [
        "Chip-level repairs",
        "Circuit tracing and fixing",
        "Component replacement",
        "Thermal management solutions",
      ],
      pricing: [
        { item: "Diagnostic Fee", price: "₹500 - ₹1,000" },
        { item: "Minor Repairs", price: "₹1,500 - ₹3,000" },
        { item: "Major Component Replacement", price: "₹3,000 - ₹6,000" },
        { item: "Complex Board Repair", price: "₹5,000 - ₹8,000" },
      ],
    },
    {
      id: "virus-removal",
      title: "Virus Removal & System Optimization",
      description: "Remove malware, viruses, and optimize your laptop for better performance.",
      features: [
        "Complete system scan",
        "Malware removal",
        "Performance optimization",
        "Security software installation",
      ],
      pricing: [
        { item: "Basic Virus Scan & Removal", price: "₹500 - ₹1,000" },
        { item: "Advanced Malware Removal", price: "₹1,000 - ₹1,500" },
        { item: "System Optimization", price: "₹800 - ₹1,200" },
        { item: "Complete Security Package", price: "₹1,500 - ₹2,500" },
      ],
    },
  ]

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          We offer a comprehensive range of laptop repair services at competitive prices. All repairs come with a
          warranty and are performed by certified technicians.
        </p>
      </div>

      <div className="space-y-12">
        {services.map((service) => (
          <div key={service.id} id={service.id} className="scroll-mt-20">
            <Card>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Features</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Pricing</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-right">Price Range</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {service.pricing.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.item}</TableCell>
                            <TableCell className="text-right font-medium">{item.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <p className="text-sm text-muted-foreground mt-4">
                      * Actual prices may vary based on laptop model and complexity of the issue. Contact us for a
                      precise quote.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

