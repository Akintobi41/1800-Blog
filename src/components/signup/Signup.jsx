/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
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
  const { register, handleSubmit, watch, formState } = useForm();
  const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
  const { errors } = formState;
  const { name, email, password } = errors;
  const { setToggle } = useContext(MyContext);
  const [disabled, setDisabled] = useState(false);

  const create = async (data) => {
    console.log(data);
    console.log("is button disabled");
    setError(""); // for resetting the error on to the initial state
    setDisabled(true);
    console.log(disabled);

    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setDisabled(false);
      console.log(disabled, "disabled");
    }
  };

  useEffect(() => {
    setToggle(false);
  }, []);
  // useEffect(() => {
  //   const sub = watch(
  //     (value, { name, type }) =>
  //       // console.log(value, name, type),l'dj
  //       "fk",
  //   );
  // }, [handleSubmit]);

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
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8" noValidate>
          <div className="">
            <Input
              {...register("name", {
                required: true,
                maxLength: 40,
                pattern: /^[A-Za-z\s]+$/i,
              })}
              label="Full Name : "
              type="text"
              placeholder="Full Name (0 to 40 characters)"
              maxLength="40"
            />
            <small className="h-[20px] block text-[red] my-[-.35rem]">
              {name?.type === "pattern" ? "Invalid Name Format" : ""}
            </small>
            <Input
              {...register("email", {
                required: true,
                pattern: {
                  // esl int-disable-next-line no-useless-escape
                  value: "[^@s]+@[^@s]+",
                  message: "Invalid email format",
                },
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
              className="w-full relative mt-10"
              bgColor={"bg-[#abf600]"}
              textColor={"text-black"}
              disabled={disabled}
            >
              {disabled ? (
                <div className="absolute w-6 h-6 rounded-[50%] border-4 border-r-[4px] border-r-[green] border-[rgba(128,128,128,.7)] animate-spin"></div>
              ) : (
                "Create Account"
              )}
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
