/* eslint-disable react/prop-types */
function BackgroundContainer({ width = "w-[45%]" , h = ''}) {
  return (
    <div
      className={`h-full sm:bg-[url('./background/bg.svg')] bg-[#abf600] ${width} ${h} hidden bg-cover sm:flex`}
    ></div>
  );
}

export default BackgroundContainer;
