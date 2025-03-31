import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Roberto Rosario",
    role: "Traveled to Bali",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    quote:
      "onPoint helped me get straight to where I wanted to go. I enjoyed every minute.",
  },
  {
    name: "Elijah Success",
    role: "Traveled to 20+ countries",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    quote:
      "I was new to traveling when I came across onPoint. They make it so easy to plan and book trips. I love how they have everything in one place.",
  },
  {
    name: "Micheal Oluoch",
    role: "Traveled all over Africa",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    quote:
      "onPoint is the best travel agency I've ever used. They are so professional and really care about their customers. I will never use another agency again as long as onPoint is here.",
  },
  {
    name: "Sifa Joy",
    role: "Had a road trip across Italy",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    quote:
      "First of all, Italy was amazing 💯. Apart from havingh lots of fun, I learnt so many things on the way. Navigating wasn't easy, but with onPoint on my side, everything was like plug & play. They allowed me to focus on enjoying my road trip. Thank you, onPoint.",
  },
  {
    name: "Shekinah Mokaya",
    role: "Spent her honeymoon in Maldives",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote:
      "After our wedding party, we found that our plane tickets, transfer taxi, and full-board hotel rooms were already booked and all we had to do was show up to the airport and the hotel. The spa treatments were a complimentary wedding gift from onPoint. We had the best time of our lives.",
  },
  {
    name: "Victor Fred",
    role: "Had a family trip to Madagascar",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote:
      "How can people not love this? My family enjoyed our vacation in Madagascar and we'll definitely be doing it again next year. Thank you for making our vacation affordable and family friendly",
  },
  {
    name: "Zeke Thalorry",
    role: "Travel blogger",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    quote:
      "Every time I book my trips through onPoint, my content comes out top-notch 🔥. That's because they know the best places to be on a budget and my followers love that. onPoint is my number one choice any day.",
  },
  {
    name: "Sarafina Tsakhobele",
    role: "Spent her birthday in Santorini",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    quote:
      "All I can say is that everyone in Africa should try onPoint. They are the best when it comes to planning trips. I had the best birthday ever in Santorini and I can't wait to go back next year. Thanks, onPoint!",
  },
  {
    name: "Jerome Martin",
    role: "Liked Dubai",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    quote:
      "When I said I wanted something luxurious, I didn't expect onPoint to go all the way. That was the best trip of my life. I loved every bit of it.",
  },
  {
    name: "Georgina Ursula",
    role: "Went to Diani Beach",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    quote:
      "I love onPoint ❤️. They ensured I had the best suite with a view of the Indain Ocean. I couldn't have asked for a better experience.",
  },
  {
    name: "Darishan Patel",
    role: "Indian wildlife photographer",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    quote:
      "When one of my clients asked me to go to Kenya, I didn't know where to start. I knew there were Big Five but I didn't know where to find them all in one place. onPoint helped me with that information and planned my trip for me. I was able to get all the shots I needed and more.",
  },
  {
    name: "Leticia Muthoni",
    role: "Went to see the Eiffel Tower in Paris",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
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

export default function WallOfLoveSection() {
  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-title text-3xl font-semibold">
              Loved by Tourists All Around the World
            </h2>
            <p className="text-body mt-6">
              All our customers love our exceptional services and ability to
              customize their trips in an instant.
            </p>
          </div>
          <div className="mt-8 grid gap-3 [--color-card:var(--color-muted)] sm:grid-cols-2 md:mt-12 lg:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className="space-y-3 *:border-none *:shadow-none"
              >
                {chunk.map(({ name, role, quote, image }, index) => (
                  <Card key={index}>
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
                        <h3 className="font-medium">{name}</h3>

                        <span className="text-muted-foreground block text-sm tracking-wide">
                          {role}
                        </span>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {quote}
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
