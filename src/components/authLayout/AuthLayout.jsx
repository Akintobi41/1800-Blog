/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const redirectToLogin = authentication && authStatus !== authentication;
    const redirectToHome = !authentication && authStatus !== authentication;
    if (redirectToLogin) {
      navigate("/login");
    } else if (redirectToHome) {
      navigate("/");
    }
    setLoader(false); // Adjust this based on whether it should be inside the conditions
  }, [authStatus, authentication, navigate]);

  return loader ? <h2>...loading</h2> : <div>{children}</div>;
}

export default Protected;

// Consider erros for cases in which navigate fails
