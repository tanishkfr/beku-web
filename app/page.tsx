import { Navbar } from "@/components/Navbar"
import { RoomRail } from "@/components/RoomRail"
import { AmbienceFab } from "@/components/AmbienceFab"
import { PageTransition } from "@/components/PageTransition"
import { ArrivalProvider } from "@/contexts/ArrivalContext"
import { Arrival } from "@/sections/Arrival"
import { Story } from "@/sections/Story"
import { Space } from "@/sections/Space"
import { Food } from "@/sections/Food"
import { Books } from "@/sections/Books"
import { Reviews } from "@/sections/Reviews"
import { Secret } from "@/sections/Secret"
import { Events } from "@/sections/Events"
import { Visit } from "@/sections/Visit"
import { SiteFooter } from "@/sections/SiteFooter"

export default function Home() {
  return (
    <ArrivalProvider>
      <Navbar />
      <RoomRail />
      <AmbienceFab />
      <PageTransition>
        <main id="main-content">
          <Arrival />
          <Story />
          <Food />
          <Space />
          <Books />
          <Reviews />
          <Secret />
          <Events />
          <Visit />
        </main>
        <SiteFooter />
      </PageTransition>
    </ArrivalProvider>
  )
}
