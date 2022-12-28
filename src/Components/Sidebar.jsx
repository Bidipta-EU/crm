import React, { useEffect, useState } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  School,
  AccountBalance,
  KeyboardArrowDown,
  Circle,
  Dashboard,
  LocationOn,
  LocalShipping,
  LocationCityOutlined,
  ShoppingBag,
  ListAlt,
  LocationCity,
  BugReport,
  AssignmentReturnOutlined
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logoLight from "../assets/img/logo-light-icon.png";
import { Collapse } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useLayoutEffect } from "react";
import instance from "../Instance";
import Cookies from "js-cookie";
import { getToken } from "../util/msAuth";
import { protectedResources } from "../util/msConfig";
import TransitionsModal from "./Material/Model";

const Sidebar = ({ sidebarCollapsed, highLight, show }) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [isSchoolClicked, setIsSchoolClicked] = useState(
    show === 2 ? false : true
  );
  const [isSchoolDetailClicked, setIsSchoolDetailClicked] = useState(
    show === 2 ? true : false
  );
  const [user, setUser] = useState({});

  useEffect(() => {
    if (show === null) {
      setIsSchoolClicked(false);
      setIsSchoolDetailClicked(false);
    }
  }, []);

  useLayoutEffect(() => {
    const getUser = async () => {
      if (Cookies.get("ms-auth")) {
        const accessToken = await getToken(
          protectedResources.apiTodoList.scopes.read
        );
        const res = await instance({
          url: "user/profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(res.data.message);
      } else {
        const res = await instance({
          url: "user/profile",
          method: "GET",
          headers: {
            Authorization: `${Cookies.get("accessToken")}`,
          },
        }).catch((err) => {
          if (err.response.status === 401) {
            setModelOpen(true);
          }
        });
        setUser(res.data.message);
      }
    };
    getUser();
  }, []);

  return (
    <div
      className={`fixed transition-all h-[100vh] ease-linear duration-300 ${
        window.innerWidth < 1024 ? "-left-[100%]" : "left-[0%]"
      } lg:py-2 md:py-4 py-8 z-[100] w-[85vw] lg:w-[18vw] md:w-[30vw] bg-[#111322] h-[100vh] overflow-auto`}
    >
      <TransitionsModal open={modelOpen} />;
      <div
        className={`flex flex-col gap-6 transition-all ease-linear duration-100`}
      >
        <div className="flex items-center gap-3 justify-center">
          <img
            src={logoLight}
            className=" w-[10vw] md:w-[3.7vw] h-auto object-cover"
            alt=""
          />
          <h4 className="text-gray-100">Eupheus Learning</h4>
        </div>
        {/* <section>
          <div
            className="px-6 py-2 flex justify-between items-center gap-4 w-full hover:shadow-xl bg-[#111322] border-l-2 border-white cursor-pointer"
            onClick={() => setIsSchoolClicked(!isSchoolClicked)}
          >
            <div className="flex gap-3">
              <School className=" text-white" />
              <h1 className=" text-white">Schools</h1>
            </div>
            <div
              className={`ml-8 ${
                isSchoolClicked ? null : "rotate-90"
              } transition-all ease-linear duration-200`}
            >
              <KeyboardArrowDown className=" text-white" />
            </div>
          </div>
          <Collapse in={isSchoolClicked}>
            <div
              className={`${
                isSchoolClicked
                  ? " opacity-100 visible h-[19rem] lg:h-[19rem] md:h-[18.6rem]"
                  : null
              } transition-all  ease-linear duration-200`}
            >
              <Link to="/mySchool">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
                >
                  <Circle
                    className={`!text-[.7rem] ${
                      highLight === "mySchool"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "mySchool"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                  >
                    My School
                  </h1>
                </div>
              </Link>

              <Link to="/tagging">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group`}
                >
                  <Circle
                    className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                      highLight === "tagging"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "tagging"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                  >
                    Tagging
                  </h1>
                </div>
              </Link>

              <Link to="/schoolDirectory">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
                >
                  <Circle
                    className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                      highLight === "schoolDirectory"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "schoolDirectory"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } transition-all ease-linear duration-200 py-2 bg-[#111322] cursor-pointer`}
                  >
                    School Directory
                  </h1>
                </div>
              </Link>

              <Link to="/salesInvoices">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
                >
                  <Circle
                    className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                      highLight === "salesInvoices"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "salesInvoices"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                  >
                    Sales Invoices
                  </h1>
                </div>
              </Link>

              <Link to="/updateStocks">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
                >
                  <Circle
                    className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                      highLight === "updateStocks"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "updateStocks"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                  >
                    Update Stocks
                  </h1>
                </div>
              </Link>

              <Link to="/opportunities">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
                >
                  <Circle
                    className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                      highLight === "opportunities"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "opportunities"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                  >
                    Opportunities
                  </h1>
                </div>
              </Link>

              <Link to="/manageSchool">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
                >
                  <Circle
                    className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                      highLight === "manageSchool"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "manageSchool"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer w-fit`}
                  >
                    Manage School
                  </h1>
                </div>
              </Link>

              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "report"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "report"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  Report
                </h1>
              </div>
            </div>
          </Collapse>
        </section>
        <section>
          <div
            className="px-6 py-2 flex justify-between items-center gap-[.36rem] w-full hover:shadow-2xl bg-[#111322] border-l-2 border-white cursor-pointer"
            onClick={() => setIsSchoolDetailClicked(!isSchoolDetailClicked)}
          >
            <div className="flex gap-3">
              <AccountBalance className=" text-white" />
              <h1 className="text-white">Schools Details</h1>
            </div>
            <div
              className={`${
                isSchoolDetailClicked ? null : "rotate-90"
              } transition-all ease-linear duration-200`}
            >
              <KeyboardArrowDown className=" text-white" />
            </div>
          </div>

          <Collapse in={isSchoolDetailClicked}>
            {" "}
            <div
              className={`${
                isSchoolDetailClicked ? "h-[20vh] opacity-100 visible" : null
              } transition-all ease-linear duration-200`}
            >
              <Link to="/school/tagging">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
                >
                  <Circle
                    className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                      highLight === "schoolTagging"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "schoolTagging"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                  >
                    Tagging
                  </h1>
                </div>
              </Link>
              <Link to="/school/schools">
                <div
                  className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
                >
                  <Circle
                    className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                      highLight === "schools"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } `}
                  />
                  <h1
                    className={`pl-9 ${
                      highLight === "schools"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                  >
                    Schools
                  </h1>
                </div>
              </Link>

              <div
                className={`flex items-center transition-all ease-linear duration-100 mr-8 ml-6 group `}
              >
                <Circle
                  className={`!text-[.7rem] !transition-all !ease-linear !duration-200 ${
                    highLight === "report"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    highLight === "report"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } transition-all ease-linear duration-200  py-2 bg-[#111322] cursor-pointer`}
                >
                  Report
                </h1>
              </div>
            </div>
          </Collapse>
        </section> */}
        <aside className="flex flex-col px-6 text-gray-200">
          <span className="text-lg">Hi, {user.first_name}</span>
          <span className="text-sm text-gray-300">{user.emp_id}</span>
          <hr className="text-gray-100 mt-4" />
        </aside>
        <Link to="/">
          <aside
            className={`px-6 py-2 hover:bg-gray-500 flex ${
              highLight === "dashboard" ? "bg-gray-500" : ""
            } rounded-md gap-4 cursor-pointer group`}
          >
            <div className="flex gap-4">
              <Dashboard
                className={`${
                  highLight === "dashboard"
                    ? "!text-[#659DBD]"
                    : "!text-gray-400"
                } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
              />
              <span
                className={`${
                  highLight === "dashboard" ? "text-gray-200" : "text-gray-400"
                } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
              >
                DashBoard
              </span>
            </div>
            {/* <hr className="text-gray-300" /> */}
          </aside>
        </Link>

        <Link to="/manageSchool">
          <aside
            className={`px-6 py-2 flex gap-4 cursor-pointer ${
              highLight === "manageSchool" ? "bg-gray-500" : ""
            } group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <School
              className={`${
                highLight === "manageSchool"
                  ? "!text-[#659DBD]"
                  : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "manageSchool" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              Manage School
            </span>
          </aside>
        </Link>
        {/* <aside className="px-6 py-2 flex gap-4 cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear">
          <LocationOn className="!text-gray-400 group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear" />
          <span className="text-gray-400 group-hover:!text-gray-100 transition-all duration-150 ease-linear">
            School Visit
          </span>
        </aside> */}
        <Link to="/order_processing">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "order_pro" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <LocalShipping
              className={`${
                highLight === "order_pro" ? "!text-[#659DBD]" : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "order_pro" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              Order Processing
            </span>
          </aside>
        </Link>
        <Link to="/manage_order">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "manageOrder" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <ShoppingBag
              className={`${
                highLight === "manageOrder"
                  ? "!text-[#659DBD]"
                  : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "manageOrder" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              Manage Order
            </span>
          </aside>
        </Link>


        {/* <Link to="/test">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "test" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <BugReport
              className={`${
                highLight === "test"
                  ? "!text-[#659DBD]"
                  : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "test" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              Test
            </span>
          </aside>
        </Link> */}




        {/* <Link to="/aof">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "aof" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <ListAlt
              className={`${
                highLight === "aof" ? "!text-[#659DBD]" : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "aof" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              AOF
            </span>
          </aside>
        </Link> */}
        <Link to="/kys">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "kys" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <LocationCityOutlined
              className={`${
                highLight === "kys" ? "!text-[#659DBD]" : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "kys" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              KYS
            </span>
          </aside>
        </Link>


        <Link to="/return">
          <aside
            className={`px-6 py-2 flex gap-4 ${
              highLight === "return" ? "bg-gray-500" : ""
            } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
          >
            <AssignmentReturnOutlined
              className={`${
                highLight === "return" ? "!text-[#659DBD]" : "!text-gray-400"
              } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "return" ? "text-gray-200" : "text-gray-400"
              } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
            >
              RETURN
            </span>
          </aside>
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;
