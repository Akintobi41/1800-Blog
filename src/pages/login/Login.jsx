/* eslint-disable react-hooks/exhaustive-deps */
import { Login as LoginComponent } from "../../components/index";
import { MyContext } from "../../MyContext";
import { useEffect, useContext } from "react";
import BackgroundContainer from "./../../components/backgroundContainer/BackgroundContainer";

function Login() {
  const { setToggle } = useContext(MyContext);
  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <div className="w-full flex sticky top-0">
      <BackgroundContainer />
      <div className="py-7 sm:w-[52%] max-w-[900px] m-auto">
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
