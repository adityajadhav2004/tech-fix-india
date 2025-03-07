import Image from "next/image"

export default function Brands() {
  const brands = [
    { name: "Dell", logo: "/placeholder.svg?height=60&width=120" },
    { name: "HP", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Lenovo", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Acer", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Asus", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Apple", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-8">Top Laptop Brands We Service</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} logo`}
                width={120}
                height={60}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
              <span className="mt-2 font-medium">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

