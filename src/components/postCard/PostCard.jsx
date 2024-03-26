/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import parse from "html-react-parser";

function PostCard({ $id, title, featuredImage, content }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="max-w-full w-full overflow-hidden shadow-sm h-[18rem] border-b-[1px]">
        <div className="w-full mb-4 h-[12rem]">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold px-2">{title}</h2>

        <div className="whitespace-wrap overflow-hidden text-ellipsis px-2 w-[350px]">
          {parse(content)}
        </div>
      </div>
    </Link>
  );
}
export default PostCard;
