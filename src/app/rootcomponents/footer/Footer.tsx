import Link from "next/link";
import FooterLogo from "./FooterLogo";
import FooterMenu from "./FooterMenu";
import Footersocials from "./FooterSocials";

export default function Footer() {
  return (
    <footer className="min-w-full h-[60vh] bg-lightmode-footer-bg-color p-16 dark:bg-darkmode-footer-bg-color mt-12">
      <div className="relative flex flex-col gap-[1rem] rounded-lg bg-[url(/images/footer.png)] bg-cover bg-no-repeat bg-bottom h-full w-full px-4 py-3">
        <div className="absolute inset-0 bg-[#FAFAFA] dark:bg-[#181818] opacity-30 dark:opacity-40 rounded-lg"></div>
        <div className="relative min-w-full px-[2rem] grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" aria-label="go home" className="block size-fit">
              <FooterLogo />
            </Link>
          </div>

          <FooterMenu />
        </div>
        <div className="relative min-w-full px-[2rem] lg:px-[2rem] flex flex-wrap items-end justify-between gap-6 border-t dark:border-t py-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} OnPoint Travel Agency
          </span>

          <Footersocials />
        </div>
      </div>
    </footer>
  );
}
