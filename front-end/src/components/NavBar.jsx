import { useState } from "react";
import Icon_menu from "../assets/hamgurgermenu.svg";
import Home_Icon from "../assets/homeicon.svg";
import { Link } from "react-router-dom";
//import { Link } from "react-router-dom";

//hiding navv bar
const NavBar = () => {
  const [hideNav, setHideNav] = useState(true);

  return (
    <nav
      className={`fixed h-[15vh] md:h-fit w-full text-white items-center pl-[10%]
     pr-[10%] flex justify-center z-30 px-0 py-1 left-0 top-0 bg-[#628281]`}
    >
      <img
        src={Icon_menu}
        alt="Burger-menu"
        className="absolute left-[5%] top-[50%] translate-y-[-50%] md:hidden z-40 cursor-pointer hover:scale-125
         h-[33px] w-[33px]"
        onClick={() => setHideNav(!hideNav)}
      />

      <Link to="/">
        <img
          src={Home_Icon}
          alt="Burger-menu"
          className="absolute right-[5%] top-[50%] translate-y-[-50%] md:hidden z-40 cursor-pointer hover:scale-125
         h-[33px] w-[33px] mr-3"
        />
      </Link>
      <ul
        className={`z-20 absolute md:relative bg-[#628281] duration-500 md:bg-[#628281] left-0
           md:right-0 top-[100%] md:top-0 h-screen md:h-fit w-fit flex md:flex-row flex-col text-base
            ${hideNav ? "translate-x-[-300px] md:translate-x-0" : "translate-x-0 pl-5 md:pl-0"}  gap-5`}
      >
        <Link to="/">
          <li className="inline-block text-base mx-3 lmd:mx-5 my-[5px] list-none hover:scale-125 duration-300">
            Home page
          </li>
        </Link>
        <Link to="/students">
          <li className="inline-block text-base mx-3 lmd:mx-5 my-[5px] list-none hover:scale-125 duration-300">
            Students
          </li>
        </Link>
        <Link to="/courses">
          <li className="inline-block text-base mx-3 lmd:mx-5 my-[5px] list-none hover:scale-125 duration-300">
            Courses
          </li>
        </Link>
        <Link to="/classes">
          <li className="inline-block text-base mx-3 lmd:mx-5 my-[5px] list-none hover:scale-125 duration-300">
            Classes
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
