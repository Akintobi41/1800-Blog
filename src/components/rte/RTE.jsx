/* eslint-disable react/prop-types */
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function RTE({ name, control, label, defaultValue = "" }) {
  const api_Key = import.meta.env.VITE_APP_TINY_MCE;
  console.log(api_Key);

  return (
    <div className="w-[100%] h-[30rem]">
      {label && <label className="inline-block mb-1 pl-1"> {label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={api_Key}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              selector: "textarea",
              auto_focus: "tiny-react_6255810451714222692121",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
