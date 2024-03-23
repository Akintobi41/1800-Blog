/* eslint-disable react/prop-types */
function HamburgerMenu({ toggle, setToggle }) {
  function menuToggle() {
    setToggle(!toggle);
  }
  return (
    <>
      {toggle ? (
        <div
          className="sm:hidden cursor-pointer relative z-[12]"
          onClick={() => menuToggle()}
        >
          {" "}
          <img src="/Icons/icons8-hamburger-menu-24.svg" alt="hamburger" />{" "}
        </div>
      ) : (
        <div className="sm:hidden cursor-pointer " onClick={() => menuToggle()}>
          {" "}
          <img src="/Icons/icons8-hamburger-menu-24.svg" alt="hamburger" />{" "}
        </div>
      )}
    </>
  );
}

export default HamburgerMenu;
