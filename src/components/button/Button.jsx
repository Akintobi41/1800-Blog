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
      className={`px-6 py-2 rounded-lg font-bold ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
