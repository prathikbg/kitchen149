import Navigation from '@/sections/Navigation'
import Hero from '@/sections/Hero'
import CravingMeter from '@/sections/CravingMeter'
import NightPersonality from '@/sections/NightPersonality'
import SurvivalKits from '@/sections/SurvivalKits'
import Signatures from '@/sections/Signatures'
import NightHub from '@/sections/NightHub'
import HungryWeGotYou from '@/sections/HungryWeGotYou'
import Footer from '@/sections/Footer'
import OrderCart from '@/sections/OrderCart'
import { CartProvider } from '@/contexts/CartContext'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
        <Navigation />
        <Hero />
        <CravingMeter />
        <NightPersonality />
        <SurvivalKits />
        <Signatures />
        <NightHub />
        <HungryWeGotYou />
        <Footer />
        <OrderCart />
      </div>
    </CartProvider>
  )
}
