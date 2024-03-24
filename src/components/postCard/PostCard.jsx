/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import parse from "html-react-parser";

function PostCard({ $id, title, featuredImage, content, ...props }) {
  console.log(content);
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
        <h2 className="text-xl font-bold">{title}</h2>

        <p>{parse(content)}</p>
      </div>
    </Link>
  );
}
//limit title characters
// I IMPLEMENTED THAT ON THE BACKEND AS WELL AS ON THE FRONT END
// Also using the HTML REACT PARSER to make changes to my content coming from Appwrite to make it in good format

export default PostCard;
