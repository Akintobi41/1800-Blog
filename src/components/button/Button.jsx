import ButtonLoader from "./ButtonLoader";

/* eslint-disable react/prop-types */
function Button({
  children,
  type = "button",
  bgColor = "bg-[var(--secondary-color)]",
  textColor = "text-[var(--black)]",
  className = "",
  height = "h-[2.5rem]",
  px = "px-6",
  disabled,
  loading,
  ...props
}) {
  return (
    <button
      className={`flex items-center justify-center ${px} py-2 ${height} rounded-lg font-bold ${bgColor} ${textColor} ${className} duration-300 shadow-none hover:shadow-[0_4px_0px_0_var(--black)]`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <ButtonLoader /> : children}
    </button>
  );
}

export default Button;
