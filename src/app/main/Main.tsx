import BookingSteps from "./bookingsteps/BookingSteps";
import Destinations from "./destinations/Destinations";
import ExtraTripOffer from "./extratripoffer/ExtraTripOffer";
import OnPointFAQs from "./faqs/OnPointFAQs";
import HomeHero from "./hero/Hero";
import OurServicesSection from "./ourservices/OurServices";
import Stats from "./stats/Stats";
import WallOfLoveTestimonials from "./testimonials/Testimonials";
import Trips from "./trips/Trips";

export default function Main() {
  return (
    <>
      <HomeHero />
      <OurServicesSection />
      <Destinations />
      <BookingSteps />
      <Trips />
      <Stats />
      <WallOfLoveTestimonials />
      <OnPointFAQs />
      <ExtraTripOffer />
    </>
  );
}
