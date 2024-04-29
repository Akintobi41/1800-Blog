/* eslint-disable react-hooks/exhaustive-deps */
import Home from "../home/Home";
import { useEffect, useContext } from "react";
import { MyContext } from "../../MyContext";
function AllPost() {
  const { setToggle } = useContext(MyContext);

  useEffect(() => {
    setToggle(false);
  }, []);

  return (
    <>
      <Home />
    </>
  );
}

export default AllPost;
