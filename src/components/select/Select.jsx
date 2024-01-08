/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  { options, label, className, ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full">
      {" "}
      {label && (
        <label htmlFor={id} className="inline-block mb-4 pl-1">
          {label}{" "}
        </label>
      )}
      <select
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 w-full ${className}`}
        {...props}
        id={id}
        ref={ref}
      >
        {" "}
        {options.map((option) => (
          <option key={option} value={option}></option>
        ))}{" "}
      </select>
    </div>
  );
});

export default Select;
