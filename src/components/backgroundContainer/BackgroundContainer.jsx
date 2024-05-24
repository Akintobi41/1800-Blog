/* eslint-disable react/prop-types */
function BackgroundContainer({ width = "w-[45%]", h = "h-full" }) {
  return (
    <div
      className={`${h} sm:bg-[url('./background/bg.svg')] bg-[#abf600] ${width} ${h} hidden bg-cover sm:flex`}
    ></div>
  );
}

export default BackgroundContainer;
