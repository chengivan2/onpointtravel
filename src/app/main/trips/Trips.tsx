import Link from "next/link";
import TripCards from "./TripCards";

export default function Trips() {
  return (
    <section className="py-[3rem] bg-contain bg-center bg-repeat-y md:bg-no-repeat bg-[url(https://res.cloudinary.com/doqbnfais/image/upload/v1745310480/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/green_blob_fztfvo.png)] relative flex flex-col min-w-full">
      

      <div className="flex relative min-w-full justify-center">
        <h2 className="text-4xl font-black text-lightmode-heading-color dark:text-darkmode-heading-color">
          Top Trips
        </h2>
      </div>

      <TripCards />

      <div className="relative min-w-full flex justify-center items-center p-4">
        <Link href="/trips">
          <button
            className="cursor-pointer bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            aria-label="See all trips"
          >
            View All Trips
          </button>
        </Link>
      </div>
    </section>
  );
}
