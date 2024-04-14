/* eslint-disable react/prop-types */
function ButtonLoader({ width = "w-6", height = "h-6" }) {
  console.log(
    `absolute ${width} ${height} rounded-[50%] border-4 border-r-[4px] border-r-[green] border-[rgba(128,128,128,.7)] animate-spin`,
  );
  return (
    <div
      className={`absolute ${width} ${height} rounded-[50%] border-4 border-r-[4px] border-r-[green] border-[rgba(128,128,128,.7)] animate-spin`}
    ></div>
  );
}

export default ButtonLoader;
