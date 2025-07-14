"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Martha Uhuru",
    role: "Traveled to Bali",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743444845/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/2148770373_vvjhzq.jpg",
    quote:
      "onPoint helped me get straight to where I wanted to go. I enjoyed every minute.",
  },
  {
    name: "Elijah Christopher",
    role: "Traveled to 20+ countries",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743444935/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/christian-buehner-ova2gZ39-uk-unsplash_uxzd56.jpg",
    quote:
      "I was new to traveling when I came across onPoint. They make it so easy to plan and book trips. I love how they have everything in one place.",
  },
  {
    name: "Micheal Oluoch",
    role: "Traveled all over Africa",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743442864/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/2148328985_ce1loc.jpg",
    quote:
      "onPoint is the best travel agency I've ever used. They are so professional and really care about their customers. I will never use another agency again as long as onPoint is here.",
  },
  {
    name: "Sifa Joy",
    role: "Had a road trip across Italy",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743444175/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/20801_uxbc3h.jpg",
    quote:
      "First of all, Italy was amazing 💯. Apart from havingh lots of fun, I learnt so many things on the way. Navigating wasn't easy, but with onPoint on my side, everything was like plug & play. They allowed me to focus on enjoying my road trip. Thank you, onPoint.",
  },
  {
    name: "Shekinah Mokaya",
    role: "Spent her honeymoon in Maldives",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743442882/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/2148644986_k5vxxj.jpg",
    quote:
      "After our wedding party, we found that our plane tickets, transfer taxi, and full-board hotel rooms were already booked and all we had to do was show up to the airport and the hotel. The spa treatments were a complimentary wedding gift from onPoint. We had the best time of our lives.",
  },
  {
    name: "Victor Fred",
    role: "Had a family trip to Madagascar",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743442969/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/2148342114_qwwcyh.jpg",
    quote:
      "How can people not love this? My family enjoyed our vacation in Madagascar and we'll definitely be doing it again next year. Thank you for making our vacation affordable and family friendly",
  },
  {
    name: "Bree Mokaya",
    role: "Travel blogger",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743445046/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/2147936152_jqwmmo.jpg",
    quote:
      "Every time I book my trips through onPoint, my content comes out top-notch 🔥. That's because they know the best places to be on a budget and my followers love that. onPoint is my number one choice any day.",
  },
  {
    name: "Sarafina Tsakhobele",
    role: "Spent her birthday in Santorini",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743444431/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/matthew-hamilton-tNCH0sKSZbA-unsplash_m23jrf.jpg",
    quote:
      "All I can say is that everyone in Africa should try onPoint. They are the best when it comes to planning trips. I had the best birthday ever in Santorini and I can't wait to go back next year. Thanks, onPoint!",
  },
  {
    name: "Jerome Martin",
    role: "Liked Dubai",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743444761/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/2148780090_tjitwy.jpg",
    quote:
      "When I said I wanted something luxurious, I didn't expect onPoint to go all the way. That was the best trip of my life. I loved every bit of it.",
  },
  {
    name: "Georgina Ursula",
    role: "Went to Diani Beach",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743444597/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/170_kijyta.jpg",
    quote:
      "I love onPoint ❤️. They ensured I had the best suite with a view of the Indain Ocean. I couldn't have asked for a better experience.",
  },
  {
    name: "Darishan Patel",
    role: "Indian wildlife photographer",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743444518/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/shubham-pawar-SanJsOPdLtU-unsplash_rtksxi.jpg",
    quote:
      "When one of my clients asked me to go to Kenya, I didn't know where to start. I knew there were Big Five but I didn't know where to find them all in one place. onPoint helped me with that information and planned my trip for me. I was able to get all the shots I needed and more.",
  },
  {
    name: "Liam O'Brien",
    role: "Went to see the Eiffel Tower in Paris",
    image: "https://res.cloudinary.com/doqbnfais/image/upload/v1743445166/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/testimonials%20faces/2148634061_dr6ofk.jpg",
    quote:
      "I had the best time in Paris. I was able to see the Eiffel Tower and all the other tourist attractions. I loved the food and the people were so nice. I can't wait to see what onPoint will put together for me next time!",
  },
];

const chunkArray = (
  array: Testimonial[],
  chunkSize: number
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const testimonialChunks = chunkArray(
  testimonials,
  Math.ceil(testimonials.length / 3)
);

export default function WallOfLoveTestimonials() {
  return (
    <section className="bg-transparent min-w-full">
      <div className="py-12 md:py-24 md:pt-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-lightmode-heading-color dark:text-darkmode-heading-color text-3xl font-semibold">
              Loved by Tourists All Around the World
            </h2>
            <p className="text-lightmode-text-color dark:text-darkmode-text-color mt-6">
              All our customers love our exceptional services and ability to
              customize their trips in an instant.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 relative">
            {/* SVG background shapes behind testimonials */}
            <svg className="absolute -z-10 left-0 top-0 w-full h-full pointer-events-none" viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="180" cy="120" rx="120" ry="40" fill="#bbf7d0" fillOpacity="0.18" />
              <ellipse cx="750" cy="320" rx="100" ry="30" fill="#34d399" fillOpacity="0.12" />
              {/* Example animal silhouette (leopard) */}
              <path d="M400 350 Q420 320 460 340 Q470 310 510 330 Q520 340 540 350 Q530 360 510 355 Q500 370 480 360 Q460 370 440 355 Q420 360 400 350 Z" fill="#047857" fillOpacity="0.08" />
            </svg>
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className="space-y-3 *:shadow-none"
              >
                {chunk.map(({ name, role, quote, image }, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                  >
                    <Card className="bg-lightmode-header-bg-color dark:bg-green-900/90 backdrop-blur-lg border border-gray-200/30 dark:border-green-700/30">
                      <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                        <Avatar className="size-9">
                          <AvatarImage
                            alt={name}
                            src={image}
                            loading="lazy"
                            width="120"
                            height="120"
                          />
                          <AvatarFallback>ST</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lightmode-heading-color dark:text-darkmode-heading-color font-medium">{name}</h3>
                          <span className="text-green-890/60 dark:text-green-100/60 block text-sm tracking-wide">
                            {role}
                          </span>
                          <blockquote className="mt-3">
                            <p className="text-lightmode-text-color dark:text-darkmode-text-color leading-relaxed">
                              {quote}
                            </p>
                          </blockquote>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
