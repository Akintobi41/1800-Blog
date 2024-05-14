/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function SharePost({ link }) {
  const share = [
    {
      icon: "/Icons/twitter.svg",
      url: `https://twitter.com/intent/tweet?url=${link}`,
    },
    {
      icon: "/Icons/telegram.svg",
      url: `https://t.me/share/url?url=${link}`,
    },
    {
      icon: "/Icons/icons8-linkedin.svg",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
    },
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
