/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import Button from "../button/Button";
import Input from "../input/Input";
import RTE from "../rte/RTE";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostForm({ post }) {
  // const element = <FontAwesomeIcon icon="fa-solid fa-upload" />;
  // postForm will be accepting a post
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
      },
    });
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
      const file = data.image[0]
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
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    setLoading(false);
    setDisabled(false);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+g/, "-")
        .replace(/\s/g, "-");
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransform, setValue]);

  function fileUpload(e) {
    // console.log("boy");

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files);
    reader.onload = () => {
      setVal(reader.result);
    };
    setCaption(e.target.files[0].name);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full flex flex-wrap flex-col gap-y-4 mt-6 px-4 mb-4"
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
          className="mb-4 [max-]"
          maxLength="20"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="1/3 mt-12">
        <p className="mb-2">Featured Image:</p>
        <figure className="">
          <img src={val} alt="" className="w-[6rem] h-[6rem]" />
          <figcaption id="file-name">{caption}</figcaption>
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
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Button type="submit" loading={loading} disabled={disabled}>
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
