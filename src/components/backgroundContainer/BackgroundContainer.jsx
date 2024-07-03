import LoginImage from "../../../public/background/LoginImage";
import SignUpImage from "../../../public/background/SignUpImage";

/* eslint-disable react/prop-types */
function BackgroundContainer({ width = "w-[45%]", h = "h-full", type = ""}) {
  return (
    <div
      className={`${h} bg-[#abf600] ${width} ${h} hidden bg-contain bg-no-repeat bg-center md:flex md:items-center md:justify-center`}
    >
      { type ==='login' ? <LoginImage/> : <SignUpImage/>} 
    </div>
  );
}

export default BackgroundContainer;
