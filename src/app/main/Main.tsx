import BookingSteps from "./bookingsteps/BookingSteps";
import Destinations from "./destinations/Destinations";
import HomeHero from "./hero/Hero";
import OurServicesSection from "./ourservices/OurServices";

export default function Main() {
  return (
    <>
      <HomeHero />
      <OurServicesSection />
      <Destinations />
      <BookingSteps />
    </>
  );
}
