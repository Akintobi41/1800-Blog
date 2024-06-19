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
    <div className="w-full flex mb-4 md:mb-0 min-h-[500px]">
      {" "}
      <BackgroundContainer h={"h-[650px]"} type={'signup'} />
      <div className="md:w-[52%] max-w-[900px] my-0 mx-auto">
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;
