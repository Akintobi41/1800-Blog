/* eslint-disable react/prop-types */
function Container({ children }) {
  return (
    <div className="w-full max-w-[1500px] m-auto" type={children.type}>
      {children}
    </div>
  );
}
export default Container;
