import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import PostForm from "./../../components/post-form/PostForm";
import BackgroundContainer from "./../../components/backgroundContainer/BackgroundContainer";

function EditPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      appwriteService.getPost(id).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [id, navigate]);

  return (
    <div className="flex w-full py-7 px-4 sm:py-0 sm:pl-0">
      <BackgroundContainer />
      <div className="w-full sm:w-[52%] max-w-[900px] m-auto">
        <PostForm post={post} />
      </div>
    </div>
  );
}

export default EditPost;
