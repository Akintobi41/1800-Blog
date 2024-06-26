/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import authService from "../../appwrite/auth";
import { login as authLogin } from "../../store/authSlice";
import Button from "../button/Button";
import ButtonLoader from "../button/ButtonLoader";
import Input from "../input/Input";
import Title from "../title/Title";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { setToggle } = useContext(MyContext);
  const [disabled, setDisabled] = useState(null);

  const login = async (data) => {
    setError(""); // Resetting the error to the initial state
    setDisabled(true);
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <div className="flex justify-center px-4 h-full">
      <div className={`flex flex-col items-center mx-auto w-full`}>
        <div className="mb-2 flex justify-center">
         
        </div>
        <h2 className="text-center text-2xl pt-4 font-[500] leading-tight">
          Log in to <Title />
        </h2>

        <p className="text-red-600 mt-8 text-center h-[1.5rem]">
          {error ? error : ""}
        </p>
        <form onSubmit={handleSubmit(login)} className="mt-8 w-full">
          <div className="space-y-5 w-full">
            <Input
              label="Email : "
              placeholder="Email Address"
              type="email"
              {...register("email", {
                required: true,
              })}
            />
            <Input
              label="Password : "
              type="password"
              placeholder="Password "
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              className="w-full"
              bgColor={"bg-[#abf600]"}
              textColor={"text-[var(--black)]"}
              disabled={disabled}
            >
              {disabled ? <ButtonLoader /> : "Log in"}{" "}
            </Button>
          </div>
          <p className="mt-2 text-center text-base text-black/60 text-[.7rem]">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
