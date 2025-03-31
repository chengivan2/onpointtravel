import BookingSteps from "./bookingsteps/BookingSteps";
import Destinations from "./destinations/Destinations";
import HomeHero from "./hero/Hero";
import OurServicesSection from "./ourservices/OurServices";
import Stats from "./stats/Stats";
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
    </>
  );
}
