import FooterSubscribe from "../footer/FooterSubscribe";

export default function FooterBefore() {
  return (
    <section className="relative flex justify-center items-center min-h-[45vh] min-w-full px-3 py-2">
      <div className="w-[20vw] h-[20vh] flex flex-col-reverse md:flex-row bg-lightmode-footer-bg-color/80 dark:bg-darkmode-footer-bg-color/80 pt-20 rounded-[10px] md:rounded-[10px] lg:rounded-[20px] backdrop-blur-md border">
        <div className="w-full md:w-[50%] bg-[url('https://res.cloudinary.com/doqbnfais/image/upload/v1743619051/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/before%20footer%20images/newsletter%20featured%20images/1_plilsj.png')] dark:bg-[url('https://res.cloudinary.com/doqbnfais/image/upload/v1743619052/onPoint%20website%20concept/website%20assets/website%20images/website%20design%20and%20stock%20photos/before%20footer%20images/newsletter%20featured%20images/2_ixo865.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center"></div>
        <FooterSubscribe />
      </div>
    </section>
  );
}
