/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Protected({ children, authentication = true }) {
  const authStatus = useSelector(
    (state) => state.auth.status
  );

  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {}, [
    authStatus,
    authentication,
    navigate,
  ]);

  return <>{children}</>;
}

export default Protected;
