/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import { useContext } from "react";
import Loader from "../loader/Loader";

function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const { loader, setLoader } = useContext(MyContext);

  useEffect(() => {
    const redirectToLogin = authentication && authStatus !== authentication;
    const redirectToHome = !authentication && authStatus !== authentication;

    redirectToHome, redirectToLogin;
    if (redirectToLogin) {
      navigate("/login");
      ("login");
    } else if (redirectToHome) {
      navigate("/");
      ("home");
    }
    setLoader(false); // Adjust this based on whether it should be inside the conditions
  }, [authStatus, authentication, navigate]);

  return loader ? (
    <Loader />
  ) : (
    <>
      <div className="sm:flex justify-between">
        <div className="sm:bg-[url('./background/br-org.jpg')] bg-[#abf600] hidden bg-cover sm:w-[55%] h-[37rem] sm:flex"></div>
        {children}
      </div>
    </>
  );
}

export default Protected;
