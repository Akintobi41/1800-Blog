/* eslint-disable react/prop-types */
function Container({ children }) {
  return (
    <div className="w-full max-w-[1500px] m-auto flex justify-center">
      {children}
    </div>
  );
}
export default Container;
