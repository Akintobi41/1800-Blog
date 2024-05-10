/* eslint-disable react-hooks/exhaustive-deps */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { MyContext } from "./MyContext";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import appwriteService from "./appwrite/config";
import ConfirmDelete from "./components/confirmDelete/ConfirmDelete";
import Footer from "./components/footer/Footer";
import Header from "./components/headerLogout/Header";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(null);
  const [confirmed, setConfirmed] = useState({ value: "", status: false }); // I set the state here
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);
  const deletePost = (post) => {
    appwriteService.deletePost(post?.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
        setConfirmed({ ...confirmed, status: false });
        setDisabled(false);
      }
    });
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MyContext.Provider
        value={{ toggle, setToggle, confirmed, setConfirmed }}
      >
        {confirmed.status && (
          <ConfirmDelete
            confirmed={confirmed}
            setConfirmed={setConfirmed}
            deletePost={deletePost}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        )}
        {!loading && (
          <div
            className={`  ${
              toggle ? "h-screen overflow-hidden" : "min-h-screen"
            } flex flex-wrap bg-[#ffffff] overflow-x-hidden`}
          >
            <div className="w-full block h-full min-h-[500px]">
              <Header toggle={toggle} setToggle={setToggle} />
              <main
                className={`bg-[#ffffff] ${
                  confirmed.status ? "opacity-[.05] -z-20" : "opacity-100 z-10"
                }`}
              >
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
