/* eslint-disable react/prop-types */
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import Tooltip from "../tooltip/Tooltip";

function RTE({ name, control, label, defaultValue = "", editorRef }) {
  const api_Key = import.meta.env.VITE_APP_TINY_MCE;

  return (
    <div className="w-[100%] h-[30rem]">
      {label && (
        <label className="flex items-center mb-1 pl-1">
          {" "}
          {label} <Tooltip />
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        rules={{
          required: true,
          maxLength: 1000,
        }}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={api_Key}
            onInit={(_evt, editor) => (editorRef.current = editor)}
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
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
