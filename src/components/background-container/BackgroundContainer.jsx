/* eslint-disable react/prop-types */
function BackgroundContainer({ width = "w-[45%]" }) {
  return (
    <div
      className={`h-full sm:bg-[url('./background/bg.svg')] bg-[#abf600] ${width} hidden bg-cover sm:flex`}
    ></div>
  );
}

export default BackgroundContainer;
