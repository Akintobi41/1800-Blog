/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import Button from "../button/Button";
import Input from "../input/Input";
import RTE from "../rte/RTE";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";

function PostForm({ post }) {
  // postForm will be accepting a post
  const { register, handleSubmit, formState, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
    },
  });
  const { errors } = formState;
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); // accessing the store
  const [loading, setLoading] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [val, setVal] = useState(null);
  const [caption, setCaption] = useState("");

  const submit = async (data) => {
    setLoading(true);
    setDisabled(true);
    if (post) {
      const file = data.image[0] //
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$slug : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$slug}`);
      }
    } else {
      ("no post ");
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
  };

  function fileUpload(e) {
    const reader = new FileReader();
    const img = e.target.files[0];

    // Ensure an image is selected
    if (!img) {
      setVal(null);
      setCaption(null);
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

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full sm:w-full flex flex-wrap flex-col gap-y-4 mt-6 px-4 mb-4"
    >
      <div className="flex items-center mb-6">
        <img
          src="Icons/icons8-back-arrow-50.png"
          alt="go-back"
          className="w-4 h-4 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <span className="px-2 font-bold text-[.85rem]">Posts</span>
      </div>
      <p className="font-bold">Create a Post</p>
      <div className="w-full">
        <Input
          label="Title"
          placeholder="Title (20 characters please)"
          className={`mb-4 [max-] border-[1px] ${
            errors.title &&
            errors.title.type === "required" &&
            "border-[red] border-[solid]"
          }`}
          maxLength="20"
          {...register("title", { required: true })}
        />
        <div className="-mt-6 mb-6 text-[.65rem] italic text-[red] h-[.8rem]">
          {errors.title && errors.title.type === "required" && (
            <span>blog title is required*</span>
          )}
        </div>

        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="1/3 mt-12">
        <p className="mb-2">Featured Image:</p>
        <figure>
          <img
            src={val}
            alt=""
            className="w-[5rem] h-[5rem] sm:w-[12rem] sm:h-[12rem] object-cover"
          />
          <figcaption id="file-name" className="h-[1.5rem]">
            {caption}
          </figcaption>
        </figure>
        <Input
          label={<FontAwesomeIcon icon={faFileUpload} className="mr-4" />}
          type="file"
          id="img"
          className="mb-4"
          onInput={(e) => {
            fileUpload(e);
          }}
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />
        <div className="-mt-6 mb-6 text-[.65rem] italic text-[red]">
          {errors.image && errors.image.type === "required" && (
            <span>Image is required*</span>
          )}
        </div>
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

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
