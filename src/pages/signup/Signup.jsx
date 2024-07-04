import BackgroundContainer from "../../components/backgroundContainer/BackgroundContainer";
import { Signup as SignupComponent } from "../../components/index";
import { MyContext } from "../../MyContext";
import { useContext, useEffect } from "react";

function Signup() {
  const { toggle,setToggle } = useContext(MyContext);

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <div className={`w-full flex ${toggle ? 'opacity-0 invisible' : 'opacity-100 visible'}  mb-4 md:mb-0 min-h-[700px]`}>
      {" "}
      <BackgroundContainer h={"h-auto"} type={'signup'} />
      <div className="md:w-[52%] max-w-[900px] my-0 mx-auto">
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;
