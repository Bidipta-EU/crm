import React from "react";
import Sidebar from "../../Components/Sidebar7";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar7";
import Navbar from "../../Components/Navbar";
import { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import instance from "../../Instance";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import Cookies from "js-cookie";
import Snackbars from "../../Components/Material/SnackBar";
// import { Backdrop, CircularProgress } from "@mui/material";
import BasicButton from "../../Components/Material/Button";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { Backdrop, CircularProgress, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const User = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [first_name, setfirstname] = useState("");
  const [middle_name, setmiddlename] = useState("");
  const [last_name, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [emp_id, setemp_id] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const snackbarRef = useRef();

  const [searchRow, setSearchRow] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [rowdata, setRowdata] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (val) => {
    // console.log(val);
    setSearchVal(val.trim());
  };

  const filterTable = () => {
    // console.log(searchVal);
    // console.log(rowdata)
    setPage(0);
    let tempArr = [];
    for (let ele of rowdata) {
      let Name = ele.name.toLowerCase();
      //   let phone = ele.phone;
      //   let schlName = ele.school.toLowerCase();
      //   let email = ele.email.toLowerCase();
      if (Name.indexOf(searchVal.toLowerCase()) > -1) {
        tempArr.push(ele);
      }
    }
    setSearchRow([]);
    if (tempArr.length === 0) {
      //   alert("No data Found");
      setSnackbarErrStatus(true);
      setErrMessage("No data Found");
      snackbarRef.current.openSnackbar();
    } else {
      setSearchRow(tempArr);
    }
  };

  const postData = async () => {
    if (!first_name) {
      setSnackbarErrStatus(true);
      setErrMessage("First Name is Mandatory");
      snackbarRef.current.openSnackbar();
      return;
    }
    if (!phone) {
      setSnackbarErrStatus(true);
      setErrMessage("Phone is Mandatory");
      snackbarRef.current.openSnackbar();
      return;
    }
    if (validPhone()) {
      setSnackbarErrStatus(true);
      setErrMessage("Invalid Phone Number");
      snackbarRef.current.openSnackbar();
      return;
    }
    if (!email) {
      setSnackbarErrStatus(true);
      setErrMessage("Email is Mandatory");
      snackbarRef.current.openSnackbar();
      return;
    }
    if (validEmail()) {
      setSnackbarErrStatus(true);
      setErrMessage("Invalid Email");
      snackbarRef.current.openSnackbar();
      return;
    }
    if (!emp_id) {
      setSnackbarErrStatus(true);
      setErrMessage("Emp_id is Mandatory");
      snackbarRef.current.openSnackbar();
      return;
    }

    let data_to_post = {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      phone: phone,
      email: email,
      emp_id: emp_id,
    };
    // console.log(data_to_post);
    setLoading(true);
    const res = await instance({
      url: `hr/create/user`,
      method: "POST",
      data: data_to_post,
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    // console.log(res);
    if (res.data.status === "error") {
      setSnackbarErrStatus(true);
      setErrMessage(res.data.message);
      snackbarRef.current.openSnackbar();
      setLoading(false);
    } else {
      setSnackbarErrStatus(false);
      setErrMessage(res.data.message);
      snackbarRef.current.openSnackbar();
      setTimeout(() => {
        // console.log("Delayed for 1 second.");
        setfirstname("");
        setmiddlename("");
        setlastname("");
        setphone("");
        setemail("");
        setemp_id("");
        setLoading(false);
      }, 2000);
    }
  };

  const show = null;
  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  const navInfo = {
    title: "HR",
    details: ["User", " / User"],
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

  const validMobileRgx = /^(\+91)?0?[6-9]\d{9}$/;
  const validPhone = () => {
    // console.log(phone);
    return !validMobileRgx.test(phone);
  };

  const emailRegex =
    /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;
  const validEmail = () => {
    return !emailRegex.test(email);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex w-[100%] min-h-[100vh]">
        <div>
          <Sidebar
            highLight={"user"}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
          />
        </div>
        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"user"}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <Snackbars
            ref={snackbarRef}
            snackbarErrStatus={snackbarErrStatus}
            errMessage={errMessage}
          />
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />
          <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
            <div className=" sm:px-8 bg-[#141728] flex justify-end py-3 mr-10">
              <Link to="/hr/createuser" className="px-2">
                <BasicButton text={"Create New User"} />
              </Link>
            </div>
            <div className="flex justify-around">
              <div className="w-[85%]">
                <Paper className="mt-5">
                  <TableContainer component={Paper}>
                    <Toolbar className="bg-slate-400">
                      <TextField
                        id="search-bar"
                        className="text"
                        onInput={(e) => {
                          handleSearch(e.target.value);
                        }}
                        label="Enter Search Value"
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                      />
                      <div className="bg-slate-300">
                        <IconButton
                          type="submit"
                          aria-label="search"
                          onClick={filterTable}
                        >
                          <SearchIcon style={{ fill: "blue" }} />
                        </IconButton>
                      </div>

                      <TablePagination
                        rowsPerPageOptions={[
                          10,
                          50,
                          100,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={3}
                        count={
                          searchRow.length === 0
                            ? rowdata.length
                            : searchRow.length
                        }
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                          select: {
                            "aria-label": "rows per page",
                          },
                          actions: {
                            showFirstButton: true,
                            showLastButton: true,
                          },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Toolbar>

                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                      <TableHead className="bg-slate-500">
                        <TableRow>
                          <TableCell className="!w-[13rem]" align="center">
                            Employee Id
                          </TableCell>
                          <TableCell className="!w-[13rem]" align="center">
                            Employee Name
                          </TableCell>
                          <TableCell className="!w-[13rem]" align="center">
                            Phone
                          </TableCell>
                          <TableCell className="!w-[13rem]" align="center">
                            Email
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="bg-slate-200">
                        {searchRow.length === 0
                          ? (rowsPerPage > 0
                              ? rowdata.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                              : rowdata
                            ).map((row) => (
                              <TableRow
                                key={row.series}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">{"row.sl"}</TableCell>
                                <TableCell align="center">
                                  {"row.name"}
                                </TableCell>
                                <TableCell align="center">
                                  {"row.test"}
                                </TableCell>
                                <TableCell align="center">
                                  {"row.test1"}
                                </TableCell>
                              </TableRow>
                            ))
                          : (rowsPerPage > 0
                              ? searchRow.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                              : searchRow
                            ).map((row) => (
                              <TableRow
                                key={row.series}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">{"row.sl"}</TableCell>
                                <TableCell align="center">
                                  {"row.name"}
                                </TableCell>
                                <TableCell align="center">
                                  {"row.test"}
                                </TableCell>
                                <TableCell align="center">
                                  {"row.test1"}
                                </TableCell>
                              </TableRow>
                            ))}
                        <TableRow></TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
