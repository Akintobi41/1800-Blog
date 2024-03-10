import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/header-logout/Header";
import Footer from "./components/footer/Footer";
import authService from "./appwrite/auth";
import Logo from "./components/logo/Logo";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(null);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);
  console.log(toggle);

  return !loading ? (
    <div
      className={` overflow-x-hidden ${
        toggle ? "h-screen" : "min-h-screen"
      } flex flex-wrap content-between bg-[#fff6dc]`}
    >
      <div className="w-full block h-full">
        <Header toggle={toggle} setToggle={setToggle} />
        <main className="p-6 bg-[#fff6dc]">
          <Outlet />
        </main>
      </div>
      <div className="w-full block">
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
