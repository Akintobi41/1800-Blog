/* eslint-disable react/prop-types */
import Button from "../../../components/button/Button";
import EditDeleteIcon from "../../../components/editDeleteIcon/EditDeleteIcon";

function ModifyPost({ bg, text, deleteP }) {
  return (
    <Button
      bgColor={bg}
      className="text-[.9em] pt-0 pb-0 py-0 ml-0 mr-0"
      height={"h-[1.5rem]"}
      px="px-4"
      onClick={() => {
        text === "Delete" ? deleteP() : null;
      }}
    >
      <EditDeleteIcon
        className={"h-[.7rem] w-[.7rem] mr-[.45rem]"}
        text={text}
      />
      {text}
    </Button>
  );
}

export default ModifyPost;
