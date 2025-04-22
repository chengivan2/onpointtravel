import DestinationCards from "./DestinationCards";

export default function Destinations() {
  return (
    <section className="relative flex flex-col min-w-full">
      <div className="flex relative min-w-full justify-center">
        <h2 className="text-4xl font-black text-lightmode-heading-color dark:text-darkmode-heading-color">
          Top Destinations
        </h2>
      </div>
      <DestinationCards />
    </section>
  );
}
