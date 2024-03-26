/* eslint-disable react-hooks/exhaustive-deps */
import { Login as LoginComponent } from "../../components/index";
import { MyContext } from "../../MyContext";
import { useEffect, useContext } from "react";

function Login() {
  const { setToggle } = useContext(MyContext);
  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <div className="py-8 sm:w-[43%]">
      <LoginComponent />
    </div>
  );
}

export default Login;
