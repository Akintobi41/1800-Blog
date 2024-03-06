import Container from "./../container/Container";
import Logo from "./../logo/Logo";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";

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

  console.log(authStatus);
  //Learn how to use hex codes in tailwind CSS

  return (
    <header className=" flex items-center p-6 shadow bg-[#C4C1A4]">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Logo></Logo>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? ( //logic for displaying the sections based on if the user is logged in or not
                <>
                  <li key={item.name} className="hidden sm:block">
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-[#9E9FA5] rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                </>
              ) : null,
            )}
            <HamburgerMenu />

            {authStatus && <LogoutBtn />}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
