/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useEffect } from "react";
import { MyContext } from "../../MyContext";
import { useContext } from "react";

function LogoutBtn() {
  const dispatch = useDispatch();
  const { toggle, setToggle } = useContext(MyContext);
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <button
      className={`${
        toggle ? "inline-block" : "hidden"
      }  sm:inline-block pl-6 duration-200 hover:underline mt-4`}
      onClick={logoutHandler}
    >
      {" "}
      Logout
    </button>
  );
}

export default LogoutBtn;
