import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/header-logout/Header";
import Footer from "./components/footer/Footer";
import authService from "./appwrite/auth";
import Logo from "./components/logo/Logo";
import { MyContext } from "./MyContext";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <MyContext.Provider value={{ toggle, setToggle, loader, setLoader }}>
      {" "}
      <div
        className={` overflow-x-hidden ${
          toggle ? "h-screen" : "min-h-screen"
        } flex flex-wrap content-between bg-[#ffffff]`}
      >
        <div className="w-full block h-full">
          <Header toggle={toggle} setToggle={setToggle} />
          <main className="bg-[#ffffff]">
            <Outlet setToggle={setToggle} />
          </main>
        </div>
        <div className="w-full block">
          <Footer />
        </div>
      </div>
    </MyContext.Provider>
  ) : null;
}

export default App;
