import React, { useEffect, useState } from "react";
import logoLight from "../assets/img/logo-light-icon.png";
import {
  PersonRounded,
  Menu,
  Settings,
  Logout,
  ArrowDropUp,
} from "@mui/icons-material";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth";
import Cookies from "js-cookie";
import { Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleSidebarCollapsed, info }) => {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [showUserOption, setShowUserOption] = useState(false);
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }, []);

  const handleScroll = () => {
    const navbar = document.getElementById("navbar");
    if (navbar.getBoundingClientRect().top === 0.5) {
      setScroll(false);
    } else {
      setScroll(true);
    }
  };

  const handleDropDown = () => {
    setShowUserOption(false);
    setDropdownPopoverShow(!dropdownPopoverShow);
  };

  const handleShowUserOption = () => {
    setDropdownPopoverShow(false);
    setShowUserOption(!showUserOption);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("type");
    Cookies.remove("id");
    Cookies.remove("ms-auth");
    Cookies.remove("user");
    Cookies.remove("company");
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <div
      id="navbar"
      className={`h-[10vh] 2xl:h-[10vh] ${
        scroll ? "bg-[hsla(0,0%,100%,.8)]" : "bg-[#141728]"
      } z-30 mt-[0.5px] transition-all ease-linear duration-200 rounded-md sticky top-[0.25px] flex items-center pl-[1.2rem] lg:pr-8 pr-[1.2rem] justify-between`}
    >
      <div className="flex items-center">
        <div
          className="lg:hidden cursor-pointer mr-4"
          onClick={handleSidebarCollapsed}
          // onClick={() => console.log("clicked")}
        >
          <Menu className={`${scroll ? "text-[#67748e]" : "text-white"}`} />
        </div>
        <div className="flex flex-col font-bold w-[7.7rem] md:w-[30vw] lg:w-[20vw]">
          <span
            className={`${
              scroll ? "text-[#67748e]" : "text-gray-400"
            } text-[1rem] md:text-lg`}
          >
            {info.title}
          </span>
          <div className="flex items-center justify-start gap-2 w-40 md:w-full">
            <Link to="/">
              <span
                className={`${
                  scroll ? "text-[#67748e]" : "text-gray-400"
                } text-xs md:text-[1rem]`}
              >
                {info.details[0]}
              </span>
            </Link>
            <span
              className={`${
                scroll ? "text-gray-800" : "text-gray-100"
              } text-xs md:text-[1rem]`}
            >
              {info.details[1]}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Dropdown
          dropdownPopoverShow={dropdownPopoverShow}
          handleDropDown={handleDropDown}
        />
        <PersonRounded
          className="cursor-pointer z-50 text-[#67748e]"
          onClick={handleShowUserOption}
        />
      </div>

      {/* <Collapse in={showUserOption}> */}
      <div
        className={` justify-start pr-10 pl-3  ${
          showUserOption ? "opacity-100 visible" : "invisible opacity-0"
        } bg-[#67748e] z-10 py-4 flex flex-col gap-2 transition-all duration-300 ease-linear absolute right-[0.8rem] top-[3.7rem] lg:right-[1.6rem] rounded-md`}
      >
        <ArrowDropUp className="z-0 absolute !text-[4rem] text-[#67748e] -top-[2.3rem] -right-[0.8rem]" />
        <span className="cursor-pointer text-white transition-all ease-linear duration-100 border-[#67748e] hover:border-white hover:translate-x-1 border-l-2 pl-2">
          {" "}
          <PersonRounded className=" mr-2" /> Profile
        </span>
        <span className="cursor-pointer text-white transition-all ease-linear duration-100 border-[#67748e] hover:border-white hover:translate-x-1 border-l-2 pl-2">
          {" "}
          <Settings className=" mr-2" /> Setting
        </span>
        <span
          onClick={handleLogout}
          className="cursor-pointer text-white transition-all ease-linear duration-100 border-[#67748e] hover:border-white hover:translate-x-1 border-l-2 pl-2"
        >
          {" "}
          <Logout className=" mr-2" /> Logout
        </span>
      </div>
      {/* </Collapse> */}
    </div>
  );
};

export default Navbar;
