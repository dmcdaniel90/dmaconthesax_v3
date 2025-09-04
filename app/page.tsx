'use client'
import Announcement from "@/components/Announcement";
import EventList from "@/components/EventList";
import CallToAction from "@/components/CallToAction";
import Footer from "./layout/Footer";
import { useHeaderContext } from "./contexts/HeaderContext";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

export default function Home() {
  const HeaderContext = useHeaderContext()

  const handleNavChange = (route: string) => {
    HeaderContext.dispatch({ type: "SET_ACTIVE_LINK", payload: route })
  }

  return (
    <main className="grow shrink-0 basis-auto">
      {/* Above the fold - immediate animation */}
      <FadeInUp>
        <Announcement
          text="Welcome to the new website for DMAC on the Sax 🎷"
          textColor="text-white"
          bgColor="bg-[#02ACAC]"
        >
          <h1 className="font-heading font-bold text-2xl">Now Booking for 2026</h1>
        </Announcement>
      </FadeInUp>
      
      {/* Below the fold - scroll-triggered animations */}
      <StaggerContainer staggerDelay={0.2}>
        <StaggerItem direction="up" delay={0}>
          <EventList />
        </StaggerItem>
        
        <StaggerItem direction="up" delay={0.1}>
          <CallToAction
            title="DMAC on the Sax plays"
            subtitle="Booking for 2026"
            body="No matter what type of event, DMAC on the Sax has the experience and expertise to make your event a success. With over 20 years of worldwide experience from symphonic orchestras to jazz bands to Ibiza festivals, DMAC on the Sax is the perfect choice for any event."
            handlePrimaryBtnClick={() => handleNavChange('booking')}
            primaryRoute="booking"
            primaryBtnText="Book now"
            enableSecondaryBtn={true}
            handleSecondaryBtnClick={() => handleNavChange('faq')}
            secondaryRoute="faq"
            secondaryBtnText="More info"
            enableTypewriter={true}
            typewriterSequence={["Weddings", 1000, "Events", 1000, "Festivals", 1000]}
            imgName="sticker_007_wcvnkt" // Keep original for now, will be replaced by ResponsiveImage
            imgAltText="DMAC on the Sax is a professional saxophonist for your next event"
            imgClassnames="drop-shadow-2xl"
            imgWidth={1152}
            imgHeight={768}
            imgFallbackSrc="/image1.webp"
          />
        </StaggerItem>
        
        <StaggerItem direction="up" delay={0.2}>
          <Footer />
        </StaggerItem>
      </StaggerContainer>
    </main>
  );
}
