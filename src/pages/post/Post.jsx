import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import Button from "./../../components/button/Button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { MyContext } from "../../MyContext";
import EditDeleteIcon from "./../../components/editDeleteIcon/EditDeleteIcon";
import Loader from "../../components/loader/Loader";

function Post() {
  // The way in which the application was built is that
  // Tiny MCE saves as pure HTML into your  database and if you bring your pure HTML in to react, there would be errors that is the reason why we are using a react package called html-react-parser
  // up next we grab our userData from the store with the help of the useSelector
  // up next was to verify if the post was actually written by you or not
  // up next was to create a function that is responsible for deleting posts

  const [post, setPost] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const permission = post?.$permissions[0];
  const userId = permission?.match(/user:(.*?)"/)[1];
  const isAuthor = post && userData ? userId === userData.$id : false;
  const { confirmed, setConfirmed } = useContext(MyContext);

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

  // const deletePost = (post) => {
  //   appwriteService.deletePost(post.$id).then((status) => {
  //     if (status) {
  //       appwriteService.deleteFile(post.featuredImage);
  //       navigate("/");
  //     }
  //   });
  // };
  const updatedDate = new Date(post?.$updatedAt);

  // function confirmDelete() {
  //   return (
  //     <div>
  //       <p>Delete Blog?</p>

  //       <p>All share links will be inaccessible.</p>
  //       <p>This blog history will be destroyed.</p>

  //       <button onClick={deletePost}>Yes, delete blog</button>
  //       <button>No, keep it</button>
  //     </div>
  //   );
  // }

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
          <p className="text-[.8rem] ">back</p>
        </Link>
        <p className="hidden sm:block mx-4 mt-[8rem] text-[.6rem]">
          Last updated: {updatedDate.toDateString()}
        </p>
      </div>
      <div className="py-8 px-4 w-full max-w-[900px] m-auto">
        <p className="sm:text-[2.5rem] sm:font-bold text-[2rem] font-medium text-center sm:text-left">
          {post?.title}
        </p>
        <div className="flex justify-center sm:justify-start px-4 sm:px-0 text-[.55rem]">
          <p> By {userData?.name}</p>
          <p className="ml-8">Last updated: {updatedDate.toDateString()}</p>
        </div>
        {isAuthor && (
          <div className="flex justify-end mt-2 pl-4 mb-4">
            <Link to={`/edit-post/${post.$id}`} className="block">
              <Button
                bgColor="bg-[var(--bg-color)]"
                className="text-[.65rem] h-[0] w-[5rem] pt-3 pb-3 py-0 px-0 ml-0 mr-0"
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
          <div className="browser-css px-4 sm:px-0 text-[.8rem]">
            {parse(post.content)}
          </div>
        </div>
        {isAuthor && (
          <div className="flex justify-end mt-2 px-4 border-t-[1px] border-solid border-[var(--bg-color)] pt-4">
            <Button
              bgColor="bg-red-500 text-[.65rem] h-[0] w-[5rem] pt-3 pb-3 py-0 px-0 ml-0 mr-0"
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
