import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import DataTable from "../../Components/DataTable";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import instance from "../../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../../Components/Material/Button";
import { Backdrop, CircularProgress } from "@mui/material";

const Return = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight] = useState("return");
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef();
  const [schoolRow, setSchoolRow] = useState([]);
  const navInfo = {
    title: "Return Order",
    details: ["Home", " / Return Order"],
  };

  const Tablecolumns = [
    { field: "Customer", headerName: "Customer name", width: 450 },
    {
      field: "Quantity",
      headerName: "Quantity",
      width: 200,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 300,
    },
  ];


  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    window.scroll(0, 0);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);


  useLayoutEffect(() => {

    const getReturnData = async () => {
      setLoading(true)
      const res = await instance({
        url: "returns/getreturns",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
       console.log(res.data.message)
       
      const rows = res.data.message.map((item, index) => {
        return {
          id: item.id,
          Customer: item.fk_bp.bp_name,
          Quantity: item.quantity,
          // Item_name: item.returns_items[0].fk_item.item_name
        };
      });
      
      setSchoolRow(rows);
      setLoading(false)
      
    };

    getReturnData();
  }, []);

  return (
    <div className="flex bg-[#111322]">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />

      <div>
        <SwipeableTemporaryDrawer
          ref={sidebarRef}
          sidebarCollapsed={sidebarCollapsed}
          highLight={highLight}
          // show={show}
        />
      </div>

      <div
        className={`flex flex-col w-[100vw] lg:w-[83vw] lg:ml-[18vw] ${
          window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[60vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            <div className="grid grid-cols-2 grid-rows-0  md:flex md:justify-between sm:justify-between md:items-center sm:items-center px-6 mb-8 py-3 gap-6 rounded-md bg-slate-600">

              <h1 className="text-gray-100">RETURN</h1>
             
              <Link to="/return_request">
                <BasicButton text={"Request Return"} />
              </Link>
             
            </div>

            <DataTable
              rows={schoolRow}
              checkbox={false}
              Tablecolumns={Tablecolumns}
              tableName="ReturnOrder"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Return;
