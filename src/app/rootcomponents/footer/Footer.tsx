import Link from "next/link";
import FooterLogo from "./FooterLogo";
import FooterMenu from "./FooterMenu";
import Footersocials from "./FooterSocials";

export default function Footer() {
  return (
    <footer className="min-w-full h-[60vh] bg-lightmode-footer-bg-color p-16 dark:bg-darkmode-footer-bg-color mt-12">
      <div className="rounded-lg bg-[url('/images/footer-bg.png')] bg-cover bg-no-repeat bg-bottom h-full w-full">
      <div className="absolute inset-0 pointer-events-none rounded-lg">
        <div
          className="w-full h-full rounded-lg"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)",
            
            mixBlendMode: "multiply",
          }}
        />
      </div>
        <div className="px-[2rem] grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" aria-label="go home" className="block size-fit">
              <FooterLogo />
            </Link>
          </div>

          <FooterMenu />
        </div>
        <div className="px-[2rem] lg:px-[2rem] mt-12 flex flex-wrap items-end justify-between gap-6 border-t dark:border-t py-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} OnPoint Travel Agency
          </span>

          <Footersocials />
        </div>
      </div>
    </footer>
  );
}
