import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import Container from "./../../components/container/Container";
import PostForm from "./../../components/post-form/PostForm";

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
    <div className="py-7">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
