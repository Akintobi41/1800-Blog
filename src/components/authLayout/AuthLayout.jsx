/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { useState } from "react";

function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const [loader, setLoader] = useState(null);

  useEffect(() => {
    const redirectToLogin = authentication && authStatus !== authentication;
    const redirectToHome = !authentication && authStatus !== authentication;

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
      <div className="w-full sm:flex justify-between max-w-[2000px]">
        {children}
      </div>
    </>
  );
}

export default Protected;
