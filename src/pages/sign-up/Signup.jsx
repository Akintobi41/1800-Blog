import BackgroundContainer from "../../components/backgroundContainer/BackgroundContainer";
import { Signup as SignupComponent } from "../../components/index";

function Signup() {
  return (
    <div className="w-full flex">
      {" "}
      <BackgroundContainer />
      <div className="py-7 sm:w-[52%] max-w-[900px] m-auto">
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;