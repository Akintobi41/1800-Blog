/* eslint-disable react/prop-types */
import Container from "./../container/Container";
import Logo from "./../logo/Logo";
import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { useRef } from "react";
import { MyContext } from "../../MyContext";
import { useContext } from "react";

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
  const { toggle } = useContext(MyContext);

  return (
    <>
      <header className=" flex items-center p-6 shadow bg-[var(--primary-color)] border-x-0 border-b-[1px] border-solid border-[var(--black)]">
        <Container>
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
        </Container>
      </header>
    </>
  );
}

export default Header;
