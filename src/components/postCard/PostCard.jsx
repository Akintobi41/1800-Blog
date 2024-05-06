/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/config";

function PostCard({ $id, title, featuredImage, content, $createdAt }) {
  const date_created = new Date($createdAt).toDateString();
  return (
    <Link to={`/post/${$id}`}>
      <motion.div
        className="max-w-full w-full overflow-hidden shadow-sm h-[20rem] border-[1px] rounded-xl"
    variants={{ 
      hidden : { opacity: 0, y:75 },
      visible: {opacity: 1, y: 0}
    }}   
       initial='hidden'
       animate ='visible'
      >
        <div className="w-full mb-4 h-[12rem]">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-end text-[.7rem] mr-2">
          <p>{date_created}</p>
        </div>
        <h2 className="text-xl font-bold px-2">{title}</h2>

        <div className="whitespace-wrap overflow-hidden text-ellipsis py-4 px-2 w-full text-[.7rem]">
          {parse(content)}
        </div>
      </motion.div>
    </Link>
  );
}
export default PostCard;
