import Hero from "@/components/hero"
import Services from "@/components/services"
import WhyChooseUs from "@/components/why-choose-us"
import Brands from "@/components/brands"
import Chatbot from "@/components/chatbot"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <main className="min-h-screen">
        <Hero />
        <WhyChooseUs />
        <Brands />
        <Services />
        <Chatbot />
      </main>
    </ThemeProvider>
  )
}

