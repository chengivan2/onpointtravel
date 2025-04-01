import FooterSubscribe from "../footer/FooterSubscribe";

export default function FooterBefore() {
  return (
    <div className="min-w-[100%] bg-lightmode-footer-bg-color/80 dark:bg-darkmode-footer-bg-color/80 pt-20">
        <FooterSubscribe />
    </div>
  )
}
