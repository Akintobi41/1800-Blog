import FooterContent from "./footer-content/FooterContent";
function Footer() {
  return (
    // hid the overflow on the section element
    <section className="relative py-10 bg-[var(--bg-color)] border border-t-2 border-t-black">
      <div className="relative mx-auto max-w-[2000px] px-4">
        <div className="-m-6 flex flex-wrap">
          <FooterContent />
        </div>
      </div>
    </section>
  );
}

export default Footer;
