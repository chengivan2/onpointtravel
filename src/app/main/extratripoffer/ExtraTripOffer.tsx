import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function ExtraTripOffer() {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/doqbnfais/image/upload/v1745260620/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/three-impalas_kwx3j6.jpg')",
        }}
      ></div>
      <div className="relative bg-transparent py-12 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-md px-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#0F0_70%,transparent_100%)]">
            <div className="bg-white/60 dark:bg-green-900/50 rounded-xl backdrop-blur-md border p-3 shadow-xl">
              <Image
                src="https://res.cloudinary.com/doqbnfais/image/upload/v1745260620/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/three-impalas_kwx3j6.jpg"
                alt="Three gazelles staring"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-lightmode-heading-color dark:text-darkmode-heading-color text-3xl font-semibold md:text-4xl lg:text-5xl">
              Play even harder
            </h2>
            <p className="md:text-md text-lightmode-text-color dark:text-darkmode-text-color">
              Book three trips in a year and get a 27% discount on the next one.
            </p>

            <Button
              className="bg-lightmode-btn-bg-color hover:bg-lightmode-btn-bg-hover-color dark:bg-darkmode-btn-bg-color hover:dark:bg-darkmode-btn-bg-hover-color shadow-2xl"
              size="lg"
              asChild
            >
              <Link
                className="text-lightmode-text-color dark:text-darkmode-text-color md:text-md"
                href="/trips"
              >
                Book a Trip
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const Integration = ({
  icon,
  name,
  description,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-dashed py-3 last:border-b-0">
      <div className="bg-muted border-foreground/5 flex size-12 items-center justify-center rounded-lg border">
        {icon}
      </div>
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-muted-foreground line-clamp-1 text-sm">
          {description}
        </p>
      </div>
      <Button variant="outline" size="icon" aria-label="Add integration">
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
