import FooterSubscribe from "../footer/FooterSubscribe";

export default function FooterBefore() {
  return (
    <section className="relative flex justify-center min-h-[80vh] min-w-full px-3 py-2">
      <div className="min-w-full h-[30vh] flex flex-col-reverse md:flex-row bg-lightmode-footer-bg-color/80 dark:bg-darkmode-footer-bg-color/80 rounded-[8px] lg:rounded-[16px] backdrop-blur-md border">
        <div className="relative min-h-full md:w-[50%] bg-[url('https://res.cloudinary.com/doqbnfais/image/upload/v1743619051/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/before%20footer%20images/newsletter%20featured%20images/1_plilsj.png')] dark:bg-[url('https://res.cloudinary.com/doqbnfais/image/upload/v1743619052/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/before%20footer%20images/newsletter%20featured%20images/2_ixo865.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center"></div>
        <FooterSubscribe />
      </div>
    </section>
  );
}
