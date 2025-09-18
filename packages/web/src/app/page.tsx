import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { HomePageClient } from './page-client'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HomePageClient />
      <Footer />
    </div>
  )
}
