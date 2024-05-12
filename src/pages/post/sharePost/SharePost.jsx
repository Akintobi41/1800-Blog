import { Fragment } from "react";

function SharePost() {
  const share = [
    "../../../public/Icons/twitter.svg",
    "../../../public/Icons/telegram.svg",
    "../../../public/Icons/facebook.svg",
  ];

  return (
    <div className="flex gap-x-3">
      {" "}
      {share.map((i) => (
        <Fragment key={i}>
          <img
            src={i}
            alt={i}
            className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer"
          />
        </Fragment>
      ))}
    </div>
  );
}

export default SharePost;
