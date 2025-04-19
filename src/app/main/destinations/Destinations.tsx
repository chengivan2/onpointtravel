import DestinationCards from "./DestinationCards";
import DestinationsSectionBg from "./DestinationsSectionBg";

export default function Destinations() {
  return (
    <section className="relative flex flex-col min-w-full">
     <DestinationsSectionBg />
      <div className="flex relative min-w-full justify-center">
        <h2 className="text-4xl font-black text-lightmode-heading-color dark:text-darkmode-heading-color">
          Top Destinations
        </h2>
      </div>

      <DestinationCards />
    </section>
  );
}
