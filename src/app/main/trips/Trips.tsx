import Link from "next/link";
import TripCards from "./TripCards";

export default function Trips() {
  return (
    <section className="py-[3rem] bg-green-50/20 dark:bg-green-900/10 relative flex flex-col min-w-full">
      
      <div className="absolute inset-0 -z-10">
        
        <svg className="absolute top-40 left-30 w-[30rem] h-[30rem] opacity-20" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="greenGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4caf50" />
      <stop offset="100%" stop-color="#2e7d32" />
    </radialGradient>
  </defs>

  <g fill="url(#greenGradient)">
    
    <path d="M180,120 
             C240,60 360,60 420,120 
             C480,180 480,300 420,360 
             C360,420 240,420 180,360 
             C120,300 120,180 180,120 
             Z 
             M220,180 
             C260,140 340,140 380,180 
             C420,220 420,280 380,320 
             C340,360 260,360 220,320 
             C180,280 180,220 220,180 
             Z" />

  
    <path d="M120,400 
             C160,360 240,360 280,400 
             C320,440 320,520 280,560 
             C240,600 160,600 120,560 
             C80,520 80,440 120,400 
             Z" />

  
    <path d="M300,300 
             C350,250 450,250 500,300 
             C550,350 550,450 500,500 
             C450,550 350,550 300,500 
             C250,450 250,350 300,300 
             Z" />

    
    <path d="M400,100 
             C500,120 550,200 520,300 
             C490,400 420,480 350,440 
             C280,400 300,300 330,240 
             C360,180 330,80 400,100 
             Z" />
  </g>
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
