import TripCards from "./TripCards";

export default function HomeTopTrips() {
  return (
    <section className="py-[3rem] bg-green-50/20 dark:bg-green-900/10 relative flex flex-col min-w-full">
      <div className="flex relative min-w-full justify-center">
        <h2 className="text-4xl font-black text-lightmode-heading-color dark:text-darkmode-heading-color">
          Top Trips
        </h2>
      </div>

      <TripCards />
    </section>
  );
}
