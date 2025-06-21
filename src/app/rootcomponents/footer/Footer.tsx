import Link from "next/link";
import FooterLogo from "./FooterLogo";
import FooterMenu from "./FooterMenu";
import Footersocials from "./FooterSocials";
import ThemeToggler from "../ThemeToggler";

export default function Footer() {
  return (
    <footer className="min-w-full bg-lightmode-footer-bg-color p-6 dark:bg-darkmode-footer-bg-color mt-12">
      <div className="relative flex flex-col gap-[2rem] rounded-lg bg-[url(/images/footer.png)] bg-cover bg-no-repeat bg-bottom h-full w-full p-4 sm:pb-3 md:p-10 md:pb-5 lg:p-12 lg:pb-6">
        <div className="absolute inset-0 bg-[#181818] opacity-50 rounded-lg"></div>
        <div className="relative min-w-full grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2 flex flex-col items-start justify-between gap-4">
            <Link href="/" aria-label="go home" className="block size-fit">
              <FooterLogo />
            </Link>
            <ThemeToggler />
          </div>

          <FooterMenu />
        </div>
        <div className="relative min-w-full pt-[2rem] flex flex-wrap items-end justify-between gap-6 border-t dark:border-t">
          <span className="text-white/80 order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} OnPoint Travel Agency
          </span>

          <Footersocials />
        </div>
      </div>
    </footer>
  );
}
