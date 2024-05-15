/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import { login } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import Button from "../button/Button";
import Input from "../input/Input";
import Logo from "../logo/Logo";
import Title from "../title/Title";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { name } = errors;
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(null);

  const create = async (data) => {
    setError(""); // for resetting the error on to the initial state
    setDisabled(true);
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-6">
      <div className={`flex flex-col mx-auto w-full ml-[0rem]`}>
        <div className="mb-2 flex justify-center">
          <span className="flex justify-center w-full">
            <Logo />
          </span>
        </div>
        <h6 className="text-center text-2xl font-[500] leading-tight">
          Sign up to <Title />
        </h6>
        <div className="h-[1.5rem] mt-4 ">
          {error && (
            <p className="text-[.8rem] text-red-600 text-center h-full ">
              {error}
            </p>
          )}
        </div>

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
              disabled={loading}
              loading={loading}
            >
              Create Account
            </Button>
          </div>
          <div className="text-center mt-4">
            <p>
              Signing up your account means you agree to the{" "}
              <a>Privacy Policy</a>,
              <a href="">Terms of Service and Affiliate Terms</a>.
            </p>

            <p className="mt-4">
              Already signed up?{" "}
              <Link to={"/login"} className="italic hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
