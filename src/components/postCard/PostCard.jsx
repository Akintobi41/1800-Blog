/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="max-w-full rounded-xl overflow-hidden shadow-sm h-[15rem]">
        <div className="w-full justify-center mb-4"></div>
        <div className="w-full mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-[95%] h-[11rem]"
          />
        </div>
        <h2 className="text-xl font-bold">{title.slice(0, 25)}...</h2>
      </div>
    </Link>
  );
}

export default PostCard;
