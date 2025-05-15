import dynamic from "next/dynamic";
import OnPointFAQs from "./faqs/OnPointFAQs";
import HomeHero from "./hero/Hero";
import LogoSeparator from "./separator/LogoSeparator";

const OurServicesSection = dynamic(() => import("./ourservices/OurServices"), { ssr: false });
const Destinations = dynamic(() => import("./destinations/Destinations"), { ssr: false });
const BookingSteps = dynamic(() => import("./bookingsteps/BookingSteps"), { ssr: false });
const Stats = dynamic(() => import("./stats/Stats"), { ssr: false });
const WallOfLoveTestimonials = dynamic(() => import("./testimonials/Testimonials"), { ssr: false });
const Trips = dynamic(() => import("./trips/Trips"), { ssr: false });
const ExtraTripOffer = dynamic(() => import("./extratripoffer/ExtraTripOffer"), { ssr: false });

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
