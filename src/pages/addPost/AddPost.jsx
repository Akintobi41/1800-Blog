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
    <>
      <div className="sm:bg-[url('./background/br-org.jpg')] bg-[#abf600] w-[45%] hidden bg-cover sm:flex"></div>
      <div className="w-full sm:w-[52%] max-w-[900px] m-auto">
        <PostForm />
      </div>
    </>
  );
}

export default AddPost;
