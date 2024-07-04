/* eslint-disable react-hooks/exhaustive-deps */
import { Login as LoginComponent } from "../../components/index";
import { MyContext } from "../../MyContext";
import { useEffect, useContext } from "react";
import BackgroundContainer from "./../../components/backgroundContainer/BackgroundContainer";

function Login() {
  const { toggle,setToggle } = useContext(MyContext);
  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <div className={`w-full ${toggle ? 'opacity-0 invisible' : 'opacity-100 visible'} flex sticky top-0 mb-4 md:mb-0 min-h-[700px]`}>
      <BackgroundContainer h={"h-auto"} type={'login'} />
      <div className="md:w-[52%] w-full max-w-[900px] my-0 mx-auto relative -z-10">
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
