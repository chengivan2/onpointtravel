import FooterSubscribe from "../footer/FooterSubscribe";

export default function FooterBefore() {
  return (
    <section className="relative flex justify-center items-center min-w-full px-3 py-2">
      <div className="min-w-[100%] flex flex-col-reverse md:flex-row bg-lightmode-footer-bg-color/80 dark:bg-darkmode-footer-bg-color/80 pt-20 rounded-[15px] md:rounded-[20px] lg:rounded-[40px] xl:rounded-[60px] shadow-lg shadow-green-900/30 dark:shadow-green-900/50 backdrop-blur-md border border-gray-200/40 dark:border-green-900/30 overflow-hidden z-10">
      <div className="w-full md:w-[50%] bg-[url('https://res.cloudinary.com/doqbnfais/image/upload/v1743614500/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/before%20footer%20images/newsletter%20featured%20images/onPoint_newsletter_subscription_featured_image_light_a5g8ed.png')] dark:bg-[url('https://res.cloudinary.com/doqbnfais/image/upload/v1743614503/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/before%20footer%20images/newsletter%20featured%20images/onPoint_newsletter_subscription_featured_image_dark_ummwx6.png')] bg-cover bg-center bg-no-repeat h-full flex items-center justify-center">

      </div>
        <FooterSubscribe />
    </div>
    </section>
  )
}
