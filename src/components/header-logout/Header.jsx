import Container from "./../container/Container";
import Logo from "./../logo/Logo";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { useState } from "react";
import { motion } from "framer-motion";

function Header({ toggle, setToggle }) {
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

  return (
    <>
      <header className=" flex items-center p-6 shadow bg-[var(--primary-color)] border-x-0 border-b-[1px] border-solid border-[var(--black)]">
        <Container>
          <nav className="flex items-center justify-between">
            <div className="mr-4">
              <Logo></Logo>
            </div>
            <div>
              <HamburgerMenu toggle={toggle} setToggle={setToggle} />

              <motion.ul
                initial={{ opacity: 0, x: "100%", left: "100%" }}
                animate={{
                  opacity: toggle ? 1 : 0,
                  x: toggle ? 0 : "100%",
                  left: toggle ? 0 : "100%",
                }}
                transition={{ duration: 0.29 }}
                className={`flex ml-auto items-center pt-[5rem] sm:p-0 ${
                  !toggle
                    ? "hidden sm:flex opacity-100"
                    : "fixed flex bottom-0 top-0 z-10 bg-[var(--alt)] flex-col w-full"
                } `}
              >
                {navItems.map((item) =>
                  item.active ? ( //logic for displaying the sections based on if the user is logged in or not
                    <li
                      key={item.name}
                      className={`mt-4 sm:mt-0 ${
                        !toggle ? "hidden" : "block"
                      } sm:block`}
                    >
                      <button
                        onClick={() => navigate(item.slug)}
                        className="inline-block px-4 py-2 duration-200 hover:bg-[#9E9FA5] rounded-full"
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null,
                )}
                {authStatus && <LogoutBtn toggle={toggle} />}
              </motion.ul>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
