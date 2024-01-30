import authService from "./../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./../../components/button/Button";
import Input from "./../../components/input/Input";
import Logo from "./../../components/logo/Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.getCurrentUser();

      if (session) {
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return <div>Login</div>;
}

export default Login;
