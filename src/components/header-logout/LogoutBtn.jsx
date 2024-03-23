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

  toggle;

  return (
    <button
      className={`${
        toggle ? "inline-block" : "hidden"
      }  sm:inline-block px-6 duration-200 hover:underline mt-4`}
      onClick={logoutHandler}
    >
      {" "}
      Logout
    </button>
  );
}

export default LogoutBtn;
