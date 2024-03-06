/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
function Logo({ width = "100%" }) {
  return <Link className="font-logo font-extrabold text-4xl">1800blog</Link>;
  //  <img src="" style={{ width }} alt="logo-placeholder" />;
}

export default Logo;
