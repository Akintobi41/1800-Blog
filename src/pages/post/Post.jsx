import parse from "html-react-parser";
import { Fragment, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../MyContext";
import appwriteService from "../../appwrite/config";
import Loader from "../../components/loader/Loader";
import Button from "./../../components/button/Button";
import EditDeleteIcon from "./../../components/editDeleteIcon/EditDeleteIcon";

function Post() {
  const [post, setPost] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const permission = post?.$permissions[0];
  const userId = permission?.match(/user:(.*?)"/)[1];
  const isAuthor = post && userData ? userId === userData.$id : false;
  const { confirmed, setConfirmed } = useContext(MyContext);
  const share = [
    "../../../public/Icons/twitter.svg",
    "../../../public/Icons/telegram.svg",
    "../../../public/Icons/facebook.svg",
  ];

  console.log(permission);
  console.log(userId);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updatedDate = new Date(post?.$updatedAt);

  return post ? (
    <>
      <div className="">
        <Link
          onClick={() => navigate("/")}
          className="flex items-center h-4 p-4"
        >
          <img
            src="/Icons/icons8-back-arrow-50.png"
            alt="go-back"
            className="w-4 h-4 mr-[.8rem] cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="text-[.8rem] sm:text-[1rem]">back</p>
        </Link>
        <p className="hidden sm:block mx-4 mt-[8rem] text-[.6rem] sm:text-[1rem]">
          Last updated: {updatedDate.toDateString()}
        </p>
      </div>
      <div className="py-8 px-4 w-full max-w-[900px] m-auto">
        <p className="sm:text-[2.5rem] sm:font-bold text-[1.5rem] font-[600] text-center sm:text-left text-gray-500">
          {post?.title}
        </p>
        <div className="flex justify-between gap-x-6  px-4 sm:px-0 text-[.55rem] sm:text-[1rem] mt-2">
          <p className="">Last updated: {updatedDate.toDateString()}</p>
          <div className="flex gap-x-4">
            {" "}
            {share.map((i) => (
              <Fragment key={i}>
                <img
                  src={i}
                  alt={i}
                  className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer"
                />
              </Fragment>
            ))}
          </div>
        </div>
        {isAuthor && (
          <div className="flex justify-end mt-12 pl-4 mb-4">
            <Link to={`/edit-post/${post.$id}`} className="block">
              <Button
                bgColor="bg-[var(--bg-color)]"
                className="text-[.65rem] w-[4.5rem] pt-0 pb-0 py-0 px-0 ml-0 mr-0"
                height={"h-[1.5rem]"}
              >
                <EditDeleteIcon
                  src={"/Icons/edit.svg"}
                  alt={"edit-post"}
                  className={"h-[.7rem] w-[.7rem] mr-[.45rem]"}
                />
                Edit
              </Button>
            </Link>
          </div>
        )}
        <div className="w-full flex justify-center rounded-xl max-h-[700px] mb-4 relative sm:px-0 bg-[var(--secondary-color)] h-[600px]">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full object-cover"
          />
        </div>
        <div className="w-full mb-6">
          <div className="browser-css px-4 sm:px-0 text-[.8rem] sm:text-[1rem]">
            {parse(post.content)}
          </div>
        </div>
        {isAuthor && (
          <div className="flex justify-between mt-2 border-t-[1px] border-solid border-[var(--bg-color)] pt-4">
            <div>
              <p className="">Share</p>
            </div>
            <Button
              bgColor="bg-red-500 text-[.65rem] h-[0] w-[5rem] pt-3 pb-3 py-0 px-0 ml-0 mr-0"
              height={"h-[1.5rem]"}
              onClick={() =>
                setConfirmed({ val: post, status: !confirmed.status })
              }
            >
              <EditDeleteIcon
                src={"/Icons/delete.svg"}
                alt={"edit-post"}
                className={"h-[.7rem] w-[.7rem] mr-[.45rem]"}
              />
              Delete
            </Button>
          </div>
        )}
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default Post;
