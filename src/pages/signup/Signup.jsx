import authService from "./../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./../../components/button/Button";
import Input from "./../../components/input/Input";
import Logo from "./../../components/logo/Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError(""); // for resetting the error on to the initial state

    try {
      const userData = await authService.createAccount(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return <div>Signup</div>;
}

export default Signup;
