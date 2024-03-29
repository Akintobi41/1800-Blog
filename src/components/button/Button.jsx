/* eslint-disable react/prop-types */
function Button({
  children,
  type = "button",
  bgColor = "bg-[var(--secondary-color)]",
  textColor = "text-[var(--black)]",
  className = "",
  ...props
}) {
  return (
    <button
      className={`flex items-center justify-center px-6 py-2 h-[2.5rem] rounded-lg font-bold ${bgColor} ${textColor} ${className} duration-300 shadow-none hover:shadow-[0_4px_0px_0_var(--black)]`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
