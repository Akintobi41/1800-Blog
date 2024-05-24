/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef} from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import Button from "../button/Button";
import Input from "../input/Input";
import RTE from "../rte/RTE";

function PostForm({ post }) {
  const userData = useSelector((state) => state.auth.userData); // accessing the store
  const navigate = useNavigate();
  const { register, handleSubmit, formState, control, getValues, setValue } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
      },
    });
    
  const { errors } = formState;
  const [loading, setLoading] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [val, setVal] = useState(null);
  const [caption, setCaption] = useState("");
  const editorRef = useRef(null);

  async function submit(data) {
    setLoading(true);
    setDisabled(true);
    document.body.style.opacity = '.3';
    document.body.style.pointerEvents = 'none'

    if (post) {
      const file = data?.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        try {
          const dbPost = await appwriteService.createPost({
            ...data,
            name: userData.name,
            userId: userData.$id,
          });
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    setLoading(false);
    setDisabled(false);
    document.body.style.opacity = '1'
    document.body.style.pointerEvents = 'auto'

  }

  function uploadImage(e) {
    const reader = new FileReader();
    const img = e.target.files[0];

    if (!img) {
      setVal("no image");
      setCaption("");
      return; // Exit early if no image selected
    }
    // Read the selected image
    reader.onload = () => {
      setVal(reader.result);
      setCaption(img.name);
    };
    // Read the file as a data URL
    reader.readAsDataURL(img);
  }

  useEffect(() => {
    post && setValue("title", post.title);
    post && setValue("content", post.content);
  }, [post]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full sm:w-full sm:pr-0 flex flex-wrap flex-col gap-y-4 mt-6 sm:px-4 mb-4"
    >
      <div className="flex items-center mb-6">
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
        <span className="px-2 font-bold text-[.85rem]">Posts</span>
      </div>
      <p className="font-bold">{!post ? "Create a Post" : "Edit Post"}</p>
      <div className="w-full">
        <Input
          label="Title:"
          placeholder="Title (20 characters please)"
          className={`mb-4 [max-] border-[1px] ${
            errors.title &&
            errors.title.type === "required" &&
            "border-[red] border-[solid]"
          }`}
          maxLength="20"
          {...register("title", { required: true })}
        />

        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          editorRef={editorRef}
        />
      </div>
      <div className="1/3 mt-12">
        <p className="mb-2">Featured Image:</p>
        <figure>
          <div
            className={`w-20 h-20 sm:w-[12rem] sm:h-[12rem] ${
              val == "no image" && "border border-solid border-[#0000000d]"
            }`}
          >
            <img
              src={
                val ||
                (post && appwriteService.getFilePreview(post.featuredImage))
              }
              alt=""
              className={`${
                val == "no image" && "hidden"
              } w-[5rem] h-[5rem] sm:w-[12rem] sm:h-[12rem] object-cover`}
            />
          </div>

          <figcaption id="file-name" className="h-[1.5rem]">
            {caption}
          </figcaption>
        </figure>
        <Input
          label={<FontAwesomeIcon icon={faFileUpload} className="mr-4" />}
          type="file"
          id="img"
          className="mb-2"
          accept="image/png, image/jpg, image/jpeg"
          onInput={(e) => uploadImage(e)}
          {...register("image", { required: !post })}
        />
        <div className="mt4 mb-4 text-[.65rem] italic text-[red] h-6">
          {errors.image && errors.image.type === "required" && (
            <span>Image is required*</span>
          )}
          {errors.content && errors.content.type === "required" && (
            <>
              <span className="block">Content is required*</span>
              {editorRef?.current?.selection.scrollIntoView()}
            </>
          )}
          <div className="-mt-6 mb-6 text-[.65rem] italic text-[red] h-[.8rem]">
            {errors.content && errors.content.type === "maxLength" && (
              <span>content length must not be more than 1000 characters*</span>
            )}
          </div>
        </div>{" "}
        <Button
          type="submit"
          className="w-full"
          loading={loading}
          disabled={disabled}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
