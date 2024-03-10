function HamburgerMenu({ toggle, setToggle }) {
  function menuToggle(e) {
    setToggle(!toggle);
  }
  return (
    <>
      {toggle ? (
        <div
          className="sm:hidden cursor-pointer relative z-[12]"
          onClick={(e) => menuToggle(e)}
        >
          {" "}
          <img src="/Icons/icons8-hamburger-menu-24.svg" alt="hamburger" />{" "}
        </div>
      ) : (
        <div
          className="sm:hidden cursor-pointer "
          onClick={(e) => menuToggle(e)}
        >
          {" "}
          <img src="/Icons/icons8-hamburger-menu-24.svg" alt="hamburger" />{" "}
        </div>
      )}
    </>
  );
}

export default HamburgerMenu;
