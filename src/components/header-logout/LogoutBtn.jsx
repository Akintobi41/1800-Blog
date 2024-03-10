import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn({ toggle }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  console.log(toggle);

  return (
    <button
      className={`${
        toggle ? "inline-block" : ""
      }  sm:inline-block px-6 py-2 duration-200 hover:bg-[#9E9FA5] rounded-full mt-4`}
      onClick={logoutHandler}
    >
      {" "}
      Logout
    </button>
  );
}

export default LogoutBtn;
