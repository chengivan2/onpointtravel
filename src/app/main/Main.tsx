import OnPointFAQs from "./faqs/OnPointFAQs";
import HomeHero from "./hero/Hero";
import LogoSeparator from "./separator/LogoSeparator";
import OurServicesSection from "./ourservices/OurServices";
import Destinations from "./destinations/Destinations";
import BookingSteps from "./bookingsteps/BookingSteps";
import Trips from "./trips/Trips";
import Stats from "./stats/Stats";
import WallOfLoveTestimonials from "./testimonials/Testimonials";
import ExtraTripOffer from "./extratripoffer/ExtraTripOffer";

export default function Main() {
  return (
    <>
      <HomeHero />
      <OurServicesSection />
      <Destinations />
      <LogoSeparator />
      <BookingSteps />
      <LogoSeparator />
      <Trips />
      <LogoSeparator />
      <Stats />
      <LogoSeparator />
      <WallOfLoveTestimonials />
      <LogoSeparator />
      <OnPointFAQs />
      <ExtraTripOffer />
    </>
  );
}
