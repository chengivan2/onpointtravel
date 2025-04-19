import Link from "next/link";
import TripCards from "./TripCards";

export default function Trips() {
  return (
    <section className="py-[3rem] bg-green-50/20 dark:bg-green-900/10 relative flex flex-col min-w-full">
      
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute top-0 left-0 w-[30rem] h-[30rem] opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <path
            fill="url(#gradient1)"
            d="M40.5,-60.4C52.5,-50.3,61.5,-39.2,66.8,-26.8C72.1,-14.4,73.7,-0.8,70.6,11.1C67.5,23,59.7,33.2,50.1,42.1C40.5,51,29.1,58.6,16.6,62.6C4.1,66.6,-9.5,67,-22.4,62.6C-35.3,58.2,-47.5,48.9,-55.5,37.1C-63.5,25.3,-67.3,11,-67.4,-3.6C-67.5,-18.2,-63.9,-33.1,-55.3,-44.5C-46.7,-55.9,-33.1,-63.8,-19.1,-68.1C-5.1,-72.4,9.3,-73.1,22.7,-69.8C36.1,-66.5,48.5,-59.2,40.5,-60.4Z"
            transform="translate(100 100)"
          />
          <defs>
            <linearGradient id="gradient1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          className="absolute bottom-0 right-0 w-[20rem] h-[20rem] opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <path
            fill="url(#gradient2)"
            d="M34.5,-47.8C45.7,-37.8,54.3,-28.5,60.4,-16.8C66.5,-5.1,70.1,9,66.1,20.6C62.1,32.2,50.5,41.3,38.1,48.7C25.7,56.1,12.8,61.8,-0.3,62.2C-13.4,62.6,-26.8,57.7,-38.2,50.2C-49.6,42.7,-59,32.6,-63.4,20.8C-67.8,9,-67.2,-4.5,-61.8,-16.5C-56.4,-28.5,-46.2,-39,-34.7,-49.1C-23.2,-59.2,-11.6,-68.8,0.3,-69.1C12.2,-69.4,24.4,-60.5,34.5,-47.8Z"
            transform="translate(100 100)"
          />
          <defs>
            <linearGradient id="gradient2" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F87171" />
            </linearGradient>
          </defs>
        </svg>
      </div>

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
