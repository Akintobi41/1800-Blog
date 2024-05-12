/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function SharePost({ link }) {
  const share = [
    {
      icon: "../../../public/Icons/twitter.svg",
      url: `https://twitter.com/intent/tweet?text=${link}`,
    },
    {
      icon: "../../../public/Icons/telegram.svg",
      url: `https://t.me/share/url?url=${link}`,
    },
    { icon: "../../../public/Icons/facebook.svg", url: "" },
  ];

  return (
    <div className="flex gap-x-3">
      {" "}
      {share.map((i) => (
        <Link key={i.icon} to={i.url} target="_blank" rel="noopener noreferrer">
          <img
            src={i.icon}
            alt={i}
            className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer"
          />
        </Link>
      ))}
    </div>
  );
}

export default SharePost;
