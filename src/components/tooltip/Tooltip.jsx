import { useState } from "react";

function Tooltip() {
  const [show, setShow] = useState(false);
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => (show ? setShow(false) : null)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>

      <section
        className={`transition-all duration-700 text-[.56rem] w-60 -ml-3 scale-[.85] bg-[var(--bg-color)] px-[.5rem] py-[.2rem] rounded ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        You can toggle between word count and character count by clicking on
        &quot;Word Count&quot; in the status bar.
      </section>
    </>
  );
}

export default Tooltip;
