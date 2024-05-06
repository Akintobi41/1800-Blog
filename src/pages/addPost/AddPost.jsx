/* eslint-disable react-hooks/exhaustive-deps */
import PostForm from "../../components/postForm/PostForm";
import { MyContext } from "../../MyContext";
import { useContext, useEffect } from "react";
import BackgroundContainer from "./../../components/backgroundContainer/BackgroundContainer";

function AddPost() {
  const { setToggle } = useContext(MyContext);

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <div className="w-full flex px-4 sm:p-0 max-w-[2000px]">
      <BackgroundContainer />
      <div className="w-full sm:w-[54%] h-full">
        <PostForm />
      </div>
    </div>
  );
}

export default AddPost;
