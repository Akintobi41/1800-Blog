/* eslint-disable react/prop-types */
function ButtonLoader({ width = 6, height = 6 }) {
  return (
    <div
      className={`absolute w-${width} h-${height} rounded-[50%] border-4 border-r-[4px] border-r-[green] border-[rgba(128,128,128,.7)] animate-spin`}
    ></div>
  );
}

export default ButtonLoader;
