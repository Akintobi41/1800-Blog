/* eslint-disable react/prop-types */
import { useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import Logo from "./../logo/Logo";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status); // Check if the user is logged or not

  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, // if user is logged in do not show login section
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus, // if user is logged in do not show signup section
    },
    {
      name: "All Posts",
      slug: "/all-posts", // if user is logged in show all-posts section
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post", // if user is logged in show add-post section
      active: authStatus,
    },
  ];
  const ref = useRef();
  const { toggle, confirmed } = useContext(MyContext);

  return (
    <>
      <header
        className={`flex items-center p-4 shadow bg-[var(--bg-color)] border-x-0 border-b-[1px] border-solid border-[var(--black)] ${
          confirmed.status ? "opacity-[.05] -z-20" : "opacity-100 z-0"
        }`}
      >
        <div className="w-full m-auto flex justify-center max-w-[2000px]">
          <nav className="flex items-center justify-between w-full">
            <div className="mr-4">
              <Logo></Logo>
            </div>
            <div>
              <HamburgerMenu />

              <ul
                className={`flex ml-auto items-center sm:items-baseline sm:p-0 ${
                  !toggle
                    ? "sm:flex opacity-100 bg-red left-0"
                    : "fixed flex bottom-0 top-0 bg-red pt-[5rem] left-0 z-10 bg-[var(--alt)] flex-col w-full sm:opacity-100"
                } `}
                ref={ref}
              >
                {navItems.map((item) =>
                  item.active ? ( //logic for displaying the sections based on if the user is logged in or not
                    <li
                      key={item.name}
                      className={`mt-4 relative sm:mt-0 px-4 py-2 cursor-pointer transition hover:underline duration-400 ${
                        !toggle ? "hidden" : "block"
                      } sm:block`}
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </li>
                  ) : null,
                )}
                {authStatus && <LogoutBtn />}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
