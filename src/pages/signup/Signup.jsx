import BackgroundContainer from "../../components/backgroundContainer/BackgroundContainer";
import { Signup as SignupComponent } from "../../components/index";
import { MyContext } from "../../MyContext";
import { useContext, useEffect } from "react";

function Signup() {
  const { setToggle } = useContext(MyContext);

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <div className="w-full flex">
      {" "}
      <BackgroundContainer h={"h-[690px]"} />
      <div className="sm:w-[52%] max-w-[900px] my-0 mx-auto">
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;
