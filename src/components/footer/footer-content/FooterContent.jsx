import Legal from "./legal/Legal";
import Support from "./support/Support";
import Company from "./company/Company";
import Copyright from "./copyright/Copyright";

function FooterContent() {
  return (
    <>
      <Copyright />
      <Company />
      <Support />
      <Legal />
    </>
  );
}

export default FooterContent;
