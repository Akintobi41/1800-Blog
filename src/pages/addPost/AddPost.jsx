/* eslint-disable react-hooks/exhaustive-deps */
import PostForm from "./../../components/post-form/PostForm";
import { MyContext } from "../../MyContext";
import { useContext, useEffect } from "react";

function AddPost() {
  const { setToggle } = useContext(MyContext);

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <div className="w-full sm:w-[52%] max-w-[900px] m-auto">
      <PostForm />
    </div>
  );
}

export default AddPost;
