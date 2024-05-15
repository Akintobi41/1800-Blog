import { useContext } from "react";
import { MyContext } from "../../MyContext";
import FooterContent from "./footer-content/FooterContent";

function Footer() {
  const { confirmed } = useContext(MyContext);

  return (
    <section
      className={`relative bottom-0 pt-10 bg-[var(--bg-color)] ${
        confirmed.status
          ? "opacity-[.3] pointer-events-none"
          : "opacity-100 z-0"
      } border border-t-2 border-t-black`}
    >
      <div className="relative mx-auto max-w-[2000px] px-4">
        <div className="flex flex-wrap">
          <FooterContent />
        </div>
      </div>
    </section>
  );
}

export default Footer;
