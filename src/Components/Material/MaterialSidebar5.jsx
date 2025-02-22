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
  PrintOutlined,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import instance from "../../Instance";
import TransitionsModal from "./Model";
import { useRef } from "react";
// import DialogSlide from "./Dialog";

const SwipeableTemporaryDrawer5 = React.forwardRef((props, ref) => {
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
    const userlogintype = Cookies.get("type");
    setUserType(userlogintype);
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

      <aside className="flex flex-col px-6 text-gray-200 py-4">
        <span className="text-lg">Hi, {user.first_name}</span>
        <span className="text-sm text-gray-300">{user.emp_id}</span>
        <hr className="text-gray-100 mt-4" />
      </aside>

      <Link to="/finance/aof">
        <aside
          className={`px-6 py-2 my-4 hover:bg-gray-500 flex ${
            highLight === "aof" ? "bg-gray-500" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Dashboard
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
          </div>
        </aside>
      </Link>
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

export default SwipeableTemporaryDrawer5;
