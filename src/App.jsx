/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { MyContext } from "./MyContext";
import authService from "./appwrite/auth";
import Footer from "./components/footer/Footer";
import Header from "./components/header-logout/Header";
import { login, logout } from "./store/authSlice";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

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
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MyContext.Provider value={{ toggle, setToggle }}>
        {!loading && (
          <div
            className={`  ${
              toggle ? "h-screen" : "min-h-screen"
            } flex flex-wrap bg-[#ffffff]`}
          >
            <div className="w-full block h-full min-h-[500px]">
              <Header toggle={toggle} setToggle={setToggle} />
              <main className="bg-[#ffffff]">
                <Outlet />
              </main>
            </div>
            <div className="w-full block self-end">
              <Footer />
            </div>
          </div>
        )}
      </MyContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
