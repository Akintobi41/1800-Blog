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
    <div className="w-full flex sticky top-0 mb-4 md:mb-0 min-h-[500px]">
      <BackgroundContainer h={"h-[650px]"} type={'login'} />
      <div className="md:w-[52%] w-full max-w-[900px] my-0 mx-auto">
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
