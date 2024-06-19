import { useEffect,useContext } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../MyContext";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { setToggle} = useContext(MyContext);


  useEffect(() => {
    window.scrollTo(0, 0);
    setToggle(true)
  }, [pathname]);

  return null;
}