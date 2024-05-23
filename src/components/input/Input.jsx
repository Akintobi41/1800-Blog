/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full my-[.5rem]">
      {label && (
        <label
          htmlFor={id}
          className={`inline-block mb-4 pl-1 cursor-pointer  ${
            type === "file"
              ? "block relative text-[var(--black)] w-full text-center border-dashed border-[3px] rounded-[5px]"
              : ""
          }`}>
          {label} {type === "file" ? "Choose A Photo" : ""}
        </label>
      )}
      <input
        className={`${
          type === "file" ? "hidden" : ""
        } px-3 py-2 placeholder:text-sm placeholder:font-[500] rounded-lg border-[2px] border-solid border-[#8080801a] bg-[#00000000] w-full ${className}`}
        type={type}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
