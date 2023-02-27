import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";

import logoLight from "../../assets/img/logo-light-icon.png";
import { useState } from "react";
import {
  Place,
  AccountBalance,
  Circle,
  Dashboard,
  KeyboardArrowDown,
  ListAlt,
  LocalShipping,
  LocationCityOutlined,
  LocationOn,
  School,
  ShoppingBag,
  AssignmentReturnOutlined,
  ReceiptOutlined,
  PrintOutlined
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import instance from "../../Instance";
import TransitionsModal from "./Model";
import { useRef } from "react";
// import DialogSlide from "./Dialog";

const SwipeableTemporaryDrawer = React.forwardRef((props, ref) => {
  const [modelOpen, setModelOpen] = useState(false);

  const [userType, setUserType] = useState();


  const [isSchoolClicked, setIsSchoolClicked] = useState(
    props.show === 2 ? false : true
  );
  const [user, setUser] = useState({});
  let highLight = props.highLight;
  const [isSchoolDetailClicked, setIsSchoolDetailClicked] = useState(
    props.show === 2 ? true : false
  );

  const dialogRef = useRef();
  const openDialog = () => {
    dialogRef.current.openDialog();
  };

  useLayoutEffect(() => {
    const getUser = async () => {
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
    };
    getUser();
  }, []);

  React.useEffect(() => {
    const userlogintype = Cookies.get("type")
    setUserType(userlogintype)
    if (props.show === null) {
      setIsSchoolClicked(false);
      setIsSchoolDetailClicked(false);
    }
  }, []);
  const [state, setState] = React.useState({
    left: false,
  });
  const sidebarRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    openSidebar() {
      //   toggleDrawer("left", true);
      setState({ left: true });
    },
  }));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

     
      <div className="flex items-center gap-3 justify-center py-4">
        <img
          src={logoLight}
          className=" w-[10vw] md:w-[3.7vw] h-auto object-cover"
          alt=""
        />
        <h4 className="text-gray-100">Eupheus Learning</h4>
      </div>
      {/* <section className="py-3">
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
                    props.highLight === "mySchool"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "mySchool"
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
                    props.highLight === "tagging"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "tagging"
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
                    props.highLight === "schoolDirectory"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "schoolDirectory"
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
                    props.highLight === "salesInvoices"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "salesInvoices"
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
                    props.highLight === "updateStocks"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "updateStocks"
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
                    props.highLight === "opportunities"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "opportunities"
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
                    props.highLight === "manageSchool"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "manageSchool"
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
                  props.highLight === "report"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } `}
              />
              <h1
                className={`pl-9 ${
                  props.highLight === "report"
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
      <Divider />
      <section className="py-3">
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
                    props.highLight === "schoolTagging"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "schoolTagging"
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
                    props.highLight === "schools"
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  } `}
                />
                <h1
                  className={`pl-9 ${
                    props.highLight === "schools"
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
                  props.highLight === "report"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                } `}
              />
              <h1
                className={`pl-9 ${
                  props.highLight === "report"
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
      <aside className="flex flex-col px-6 text-gray-200 py-4">
        <span className="text-lg">Hi, {user.first_name}</span>
        <span className="text-sm text-gray-300">{user.emp_id}</span>
        <hr className="text-gray-100 mt-4" />
      </aside>
      {userType === "training" ? 
    <div>
    <Link to="/manageSchoolTraining">
        <aside
          className={`px-6 py-2 my-4 flex gap-4 cursor-pointer ${
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

      <Link to="/invoice_training">
        <aside
          // onClick={openDialog}
          className={`px-6 py-2 flex gap-4 ${
            highLight === "invoice" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <ReceiptOutlined
            className={`${
              highLight === "invoice" ? "!text-[#659DBD]" : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "invoice" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Invoice Tagging
          </span>
        </aside>
      </Link>

      <Link to="/locationTraining">
        <aside
          // onClick={openDialog}
          className={`px-6 py-2 flex gap-4 ${
            highLight === "location" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <Place
            className={`${
              highLight === "location" ? "!text-[#659DBD]" : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "location" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Location
          </span>
        </aside>
      </Link>
    </div> 
    : <div>
         <Link to="/">
        <aside
          className={`px-6 py-2 my-4 hover:bg-gray-500 flex ${
            highLight === "dashboard" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Dashboard
              className={`${
                highLight === "dashboard" ? "!text-[#659DBD]" : "!text-gray-400"
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
          className={`px-6 py-2 my-4 flex gap-4 cursor-pointer ${
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
      {/* <aside className="px-6 py-2 my-4 flex gap-4 cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear">
        <LocationOn className="!text-gray-400 group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear" />
        <span className="text-gray-400 group-hover:!text-gray-100 transition-all duration-150 ease-linear">
          School Visit
        </span>
      </aside> */}
      <Link to="/order_processing">
        <aside
          className={`px-6 py-2 my-4 flex gap-4 ${
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
          className={`px-6 py-2 my-4 flex gap-4 ${
            highLight === "manageOrder" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <ShoppingBag
            className={`${
              highLight === "manageOrder" ? "!text-[#659DBD]" : "!text-gray-400"
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
      {/* <Link to="/aof">
        <aside
          className={`px-6 py-2 my-4 flex gap-4 ${
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
          className={`px-6 py-2 my-4 flex gap-4 ${
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
      <Link to="/projection">
        <aside
          // onClick={openDialog}
          className={`px-6 py-2 flex gap-4 ${
            highLight === "projection" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <LocationCityOutlined
            className={`${
              highLight === "projection" ? "!text-[#659DBD]" : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "projection" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Projection
          </span>
        </aside>
      </Link>

      {/* <Link to="/print_pdf">
        <aside
          // onClick={openDialog}
          className={`px-6 py-2 flex gap-4 ${
            highLight === "printpdf" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <PrintOutlined
            className={`${
              highLight === "printpdf" ? "!text-[#659DBD]" : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "printpdf" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Doc Print
          </span>
        </aside>
      </Link> */}

      {/* <Link to="/return">
        <aside
          // onClick={openDialog}
          className={`px-6 py-5 flex gap-4 ${
            highLight === "" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <AssignmentReturnOutlined
            className={`${
              highLight === "" ? "!text-[#659DBD]" : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            RETURN
          </span>
        </aside>
      </Link> */}

      {/* <Link to="/invoice">
        <aside
          // onClick={openDialog}
          className={`px-6 py-2 flex gap-4 ${
            highLight === "invoice" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <ReceiptOutlined
            className={`${
              highLight === "invoice" ? "!text-[#659DBD]" : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "invoice" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Invoice Tagging
          </span>
        </aside>
      </Link> */}
    </div>}
     

    </Box>
  );

  return (
    <div ref={sidebarRef}>
      <TransitionsModal open={modelOpen} />;
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
});

export default SwipeableTemporaryDrawer;
