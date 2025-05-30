import Image from "next/image";
import FooterSubscribe from "./FooterSubscribe";

export default function FooterBefore() {
  return (
    <section className="relative min-w-full p-12">
      <div className="min-w-full p-6 bg-gradient-to-r bg-green-200/50 dark:bg-green-900/50 rounded-[1rem] border border-green-100/30 dark:border-green-900/30 shadow-sm">
        <div className="flex items-center justify-around gap-6 flex-col-reverse md:flex-row">
          <div className="flex w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square flex-shrink-0 relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-darkmode-bg-color opacity-30 dark:opacity-40 rounded-[0.7rem]"></div><div className="absolute inset-0 bg-darkmode-bg-color opacity-30 dark:opacity-40 rounded-[0.7rem]"></div>

            <div className="dark:hidden">
              <Image
                src="https://res.cloudinary.com/doqbnfais/image/upload/v1743619051/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/before%20footer%20images/newsletter%20featured%20images/1_plilsj.png"
                alt="onPoint Newsletter featured image"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 30vw"
              />
            </div>

            <div className="hidden dark:block">
              <Image
                src="https://res.cloudinary.com/doqbnfais/image/upload/v1743619052/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/before%20footer%20images/newsletter%20featured%20images/2_ixo865.png"
                alt="onPoint Newsletter featured image"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 30vw"
              />
            </div>
          </div>

          <div className="relative flex flex-col space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-100">
              Subscribe to the onPoint Bulletin
            </h3>

            <p className="text-green-600 dark:text-green-300">
              Enter your email below to get weekly travel tips and exclusive
              offers.
            </p>

            <FooterSubscribe />
          </div>
        </div>
      </div>
    </section>
  );
}
