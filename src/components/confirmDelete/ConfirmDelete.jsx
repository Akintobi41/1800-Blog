/* eslint-disable react/prop-types */
import ButtonLoader from "../button/ButtonLoader";
function ConfirmDelete({
  confirmed,
  setConfirmed,
  deletePost,
  disabled,
  setDisabled,
}) {
  return (
    <div className="w-full fixed top-[10%] translate-x-0 translate-y-[50%] sm:translate-y-[50%] flex justify-center z-20">
      <div className="flex flex-col bg-[var(--secondary-color)] rounded p-4 duration-300 shadow-[3px_5px_3px_2px_var(--black)]">
        <p className="font-bold">Delete Blog?</p>

        <p className="text-[.9rem] mt-2 mr-2">
          All share links will be inaccessible.
        </p>
        <p className="text-[.9rem]">This blog history will be destroyed.</p>

        <div className="flex text-[.6rem] mt-6">
          <button
            onClick={() => {
              deletePost(confirmed.val);
              setDisabled(true);
            }}
            className="w-[50%] bg-[#f66d6d] text-[white] py-1 px-2 rounded cursor-pointer flex items-center justify-center"
          >
            {disabled ? (
              <ButtonLoader width="w-5" height="h-5" />
            ) : (
              "Yes,delete blog"
            )}{" "}
          </button>
          <button
            className="w-[50%] bg-[var(--bg-color)] ml-2 py-1 px-2 rounded cursor-pointer"
            onClick={() => setConfirmed({ ...confirmed, status: !confirmed })}
          >
            No, keep it
          </button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmDelete;
