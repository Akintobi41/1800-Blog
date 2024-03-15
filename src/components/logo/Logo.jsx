/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link className="" to="/">
      <img
        src="/Icons/logo.svg"
        className="w-[2.5rem]"
        alt="logo-placeholder"
      />
    </Link>
  );
}

export default Logo;
