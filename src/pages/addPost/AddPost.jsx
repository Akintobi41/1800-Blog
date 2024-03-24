import Container from "../../components/container/Container";
import PostForm from "./../../components/post-form/PostForm";
import { MyContext } from "../../MyContext";
import { useContext, useEffect } from "react";

function AddPost() {
  const { toggle, setToggle } = useContext(MyContext);

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <div>
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
