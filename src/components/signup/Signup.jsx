import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import authService from "../../appwrite/auth";
import { login } from "../../store/authSlice";
import Button from "../button/Button";
import Input from "../input/Input";
import Logo from "../logo/Logo";
import Title from "../title/Title";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { toggle, setToggle } = useContext(MyContext);

  const create = async (data) => {
    setError(""); // for resetting the error on to the initial state

    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <div className="flex items-center justify-center px-6">
      <div className={`flex flex-col mx-auto w-full max-w-[40rem] ml-[0rem]`}>
        <div className="mb-2 flex justify-center">
          <span className="flex justify-center w-full">
            <Logo />
          </span>
        </div>
        <h6 className="text-center text-2xl font-[500] leading-tight">
          Sign up to <Title />
        </h6>
        {/* <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p> */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              {...register("name", { required: true })}
              label="Full Name : "
              placeholder="Full Name"
            />
            <Input
              {...register("email", {
                required: true,
              })}
              label="Email : "
              placeholder="Email Address"
              type="email"
            />
            <Input
              {...register("password", { required: true })}
              label="Password : "
              type="password"
              placeholder="Password (8+ characters please)"
            />
            <Button
              type="submit"
              className="w-full"
              bgColor={"bg-[#abf600]"}
              textColor={"text-black"}
            >
              Create Account
            </Button>
          </div>
          <div className="text-[.7rem] text-center mt-4">
            <p>
              Signing up your account means you agree to the{" "}
              <a>Privacy Policy</a>,
              <a href="">Terms of Service and Affiliate Terms</a>.
            </p>

            <p className="mt-4">
              Already signed up?{" "}
              <Link to={"/login"} className="italic hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
