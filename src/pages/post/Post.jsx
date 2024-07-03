import parse from "html-react-parser";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../MyContext";
import appwriteService from "../../appwrite/config";
import Loader from "../../components/loader/Loader";
import SharePost from "./sharePost/SharePost";
import ModifyPost from "./modifyPost/ModifyPost";
import Button from "../../components/button/Button";

function Post() {
  const [post, setPost] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const permission = post?.$permissions[0];
  const userId = permission?.match(/user:(.*?)"/)[1];
  const isAuthor = post && userData ? userId === userData.$id : false;
  const { confirmed, setConfirmed } = useContext(MyContext);
  const [copy, setCopy] = useState(false);

  const url = "1800-blog.vercel.app/post/";

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


  function runDelete() {
    setConfirmed({ val: post, status: !confirmed.status });
  }
  async function copyTextToClipboard(text) {
    return await navigator.clipboard.writeText(text);
  }
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard

    if (!copy) {
      copyTextToClipboard(`${url}${id}`)
        .then(() => {
          // If successful, update the setCopy state value
          setCopy(true);
        })
        .catch((err) => {
          throw err;
        });
    }
    setCopy(false);
  };
  const updatedDate = new Date(post?.$updatedAt);

  return post ? (
    <>
      <section>
        <Link
          onClick={() => navigate("/")}
          className="flex items-center h-4 p-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 mr-[.8rem] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>

          <p className="text-[.8rem] sm:text-[1rem]">back</p>
        </Link>
        <p className="hidden sm:block mx-4 mt-[8rem] text-[.6rem] sm:text-[1rem]">
          Last updated: {updatedDate.toDateString()}
        </p>
      </section>
      <div className="py-8 px-4 w-full max-w-[900px] m-auto">
        <p className="sm:text-[2.5rem] sm:font-bold text-[1.5rem] font-[600] text-center sm:text-left">
          {post?.title}
        </p>
        <div className="flex justify-between gap-x-6  px-4 sm:px-0 text-[.55rem] sm:text-[1rem] mt-2">
          <p className="">Last updated: {updatedDate.toDateString()}</p>
          <SharePost link={`${url}${post.$id}`} />
        </div>
        {isAuthor && (
          <div className="flex justify-end mt-12 pl-4 mb-4">
            <Link to={`/edit-post/${post.$id}`} className="block">
              <ModifyPost text={"Edit"} bg={"bg-[var(--bg-color)]"} />
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
        <div className="flex flex-col">
          <section className="flex align-center items-center">
            <p className="mr-4">Share</p>
            <SharePost />
          </section>
          <Button
            bgColor={"#e7ffee"}
            onClick={handleCopyClick}
            className="w-40 justify-start p-0"
          >
            <img
              src="/Icons/icons8-copy-24.png"
              alt="copy"
              className="mx-1"
              loading="lazy"
            />
            {copy ? "Copied" : "Copy link"}
          </Button>
        </div>
        {isAuthor && (
          <div className="flex justify-end mt-2 border-t-[1px] border-solid border-[var(--bg-color)] pt-4">
            <ModifyPost text={"Delete"} bg={"bg-red-500"} deleteP={runDelete} />
          </div>
        )}
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default Post;
