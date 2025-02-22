import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
// import { Add } from '@mui/icons-material'
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from '../DummyData'
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress, Toolbar } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import DialogSlide2 from "../Components/Material/Dialog15";
import Snackbars from "../Components/Material/SnackBar";

const AOF = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("aof");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [rowdata, setRowdata] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hideVerfyBtn, setHideVerifyBtn] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [aofId, setAofId] = useState("");

  const [errMessage, setErrMessage] = useState("");
  // const [keepBtnDactive, setKeepBtnDactive] = useState(false)
  const navigate = useNavigate();
  const snackbarRef = useRef();

  const navInfo = {
    title: "AOF",
    details: ["Home", " / AOF"],
  };
  const [searchRow, setSearchRow] = useState([]);

  const Tablecolumns = [
    { field: "name", headerName: "Name", width: 180 },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "school",
      headerName: "School",
      width: 220,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
  ];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowdata.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    getAOFdetails();
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

  const handleAofView = (invceId) => {
    console.log(invceId);
    setLoading(true);
    setAofId(invceId);
    setTimeout(() => {
      // console.log("Delayed for 1 second.");
      openDialogue2();
      setLoading(false);
    }, 1000);
    // openDialogue2();
  };

  const handleVerify = (aofId) => {
    // if(keepBtnDactive){
    //   setSnackbarErrStatus(true);
    //     setErrMessage("Pease wait few second");
    //     snackbarRef.current.openSnackbar();
    //     return
    // }
    // console.log(abc)
    setLoading(true);
    setAofId(aofId);
    setTimeout(() => {
      // console.log("Delayed for 1 second.");
      openDialogue2();
      setLoading(false);
    }, 1000);
  };

  const handleAofPDF = (invId) => {
    // console.log(invId)
    window.open(`view_aof_pdf2/${invId}`, "_blank", "noreferrer");
  };

  const openDialogue2 = () => {
    dialogRef2.current.openDialog();
  };

  const dialogRef2 = useRef();

  const getAOFdetails = async () => {
    setLoading(true);
    const res = await instance({
      url: `/sales_data/aof/get`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(res.data.message);
    setRowdata(res.data.message);
    setLoading(false);
  };

  const handleSearch = (val) => {
    setSearchVal(val.trim());
  };

  // const returnVerifyBtn = (id) => {
  //   const [view, setView] = useState(true)
  //   return (
  //             <div
  //                               className="sm:w-auto w-[50vw]"
  //                               onClick={() => {
  //                                 // handleAofPDF(row.id);
  //                                 handleVerify(id);
  //                               }}
  //                             >
  //                               <BasicButton text={"VERIFY"} />
  //                             </div>
  //   )
  // }

  const getSchoolByState = async (id) => {
    setLoading(true);

    const res = await instance({
      url: `school/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    const rows = res.data.message.map((item, index) => {
      return {
        id: item.id,
        SchoolName: item.school_name,
        State: item.school_addresses[0].fk_state.state,
        Address: item.school_addresses[0].address,
      };
    });
    // setSchoolRow(rows);
    // setLoading(false);
  };

  const handleOrderProcessingForm = async (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "select_state":
        console.log(value);
        getCity(value.fk_state_id);
        getSchoolByState(value.fk_state_id);
        setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;
      case "select_city":
        setStateAndCity({ ...stateAndCity, city: value.id });
        break;
      default:
        break;
    }
  };

  const getCity = async (Id) => {
    setLoading(true);
    const res = await instance({
      url: `location/city/${Id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setCity(res.data.message);
    setLoading(false);
  };

  const filterTable = () => {
    // console.log(searchVal);
    // console.log(rowdata)
    setPage(0);
    let tempArr = [];
    for (let ele of rowdata) {
      let docName = ele.name.toLowerCase();
      let phone = ele.phone;
      let schlName = ele.school.toLowerCase();
      let email = ele.email.toLowerCase();
      if (
        docName.indexOf(searchVal.toLowerCase()) > -1 ||
        phone.indexOf(searchVal.toLowerCase()) > -1 ||
        schlName.indexOf(searchVal.toLowerCase()) > -1 ||
        email.indexOf(searchVal.toLowerCase()) > -1
      ) {
        tempArr.push(ele);
      }
    }
    setSearchRow([]);
    if (tempArr.length === 0) {
      alert("No data Found");
    } else {
      setSearchRow(tempArr);
    }
  };

  const handleAofPDFEdit = (id) => {
    // alert(id)
    navigate(`/aof_edit/${id}`);
  };

  useLayoutEffect(() => {
    const getStates = async () => {
      const res = await instance({
        url: "location/state/get/states",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      console.log(res.data.message);

      setStates(res.data.message);
    };

    const getSchoolData = async () => {
      const res = await instance({
        url: "school/b4c27059-8c42-4d35-8fe7-8dedffbfe641/294de4f3-0977-4482-b0de-2cfeaa827ba4",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res.data.message);
      const rows = res.data.message.map((item, index) => {
        return {
          id: item.id,
          SchoolName: item.school_name,
          State: item.school_addresses[0].fk_state.state,
          Address: item.school_addresses[0].address,
        };
      });
      // setSchoolRow(rows);
    };
    // getStates();

    // getSchoolData();
  }, []);

  const t = useRef(null);
  t.current = hideVerfyBtn;

  const handleData = (value, id, type) => {
    switch (type) {
      case "error":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      // case "error":
      case "success":
        setSnackbarErrStatus(false);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        // let tempArr= [...hideVerfyBtn]
        // hideVerfyBtn.push(id)
        // console.log(hideVerfyBtn)
        setHideVerifyBtn([...hideVerfyBtn, id]);
        // // console.log(hideVerfyBtn)
        setTimeout(() => {
          // console.log(t.current);
          const newArr = t.current.filter((item) => item != id);
          setHideVerifyBtn(newArr);
        }, 60000);
        break;
    }
  };
  console.log(hideVerfyBtn);

  return (
    <div className="flex bg-[#111322]">
      <DialogSlide2 ref={dialogRef2} aofId={aofId} handleData={handleData} />
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
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            {/* <div className="grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 mb-8 py-3 mt-6 gap-6 rounded-md bg-slate-600">
            <Link to="/addschool">
                <BasicButton text={"Create New School"} />
              </Link>
            </div> */}
            <div className="w-full flex gap-3 justify-end mt-4">
              <Link to="/aof_create">
                <BasicButton text={"Create AOF"} />
              </Link>
            </div>

            {/* <DataTable
              rows={aofRow}
              checkbox={false}
              Tablecolumns={Tablecolumns}
              tableName="AOFtable"
            /> */}

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
                      searchRow.length === 0 ? rowdata.length : searchRow.length
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
                        Name
                      </TableCell>
                      <TableCell className="!w-[13rem]" align="center">
                        Phone
                      </TableCell>
                      <TableCell className="!w-[13rem]" align="center">
                        Email
                      </TableCell>
                      <TableCell className="!w-[10rem]" align="center">
                        School
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        Status
                      </TableCell>
                      <TableCell className="!w-[8rem]" align="center">
                        View
                      </TableCell>
                      {/* <TableCell className="!w-[8rem]" align="center">
                        Edit
                      </TableCell> */}
                      <TableCell className="!w-[8rem]" align="center">
                        Verify
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
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.school}</TableCell>

                            <TableCell align="center">{row.status}</TableCell>

                            <TableCell align="center">
                              {/* <DialogSlide2 ref={dialogRef2}/> */}
                              <div
                                className="sm:w-auto w-[50vw]"
                                onClick={() => {
                                  // handleAofView(row.id);
                                  handleAofPDF(row.id);
                                }}
                              >
                                <BasicButton text={"View"} />
                              </div>
                            </TableCell>
                            {/* <TableCell align="center"> */}
                            {/* <DialogSlide2 ref={dialogRef2}/> */}
                            {/* <div
                                  className="sm:w-auto w-[50vw]"
                                  onClick={() => {
                                    handleAofView(row.id);
                                    handleAofPDFEdit(row.id);
                                  }}
                                >
                                  <BasicButton text={"Edit"} />
                                </div>
                            </TableCell> */}
                            <TableCell align="center">
                              {/* <DialogSlide2 ref={dialogRef2}/> */}
                              {hideVerfyBtn.includes(row.id) ? null : (
                                <div
                                  className="sm:w-auto w-[50vw]"
                                  onClick={() => {
                                    // handleAofPDF(row.id);
                                    handleVerify(row.id);
                                  }}
                                >
                                  <BasicButton text={"VERIFY"} />
                                </div>
                              )}
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
                            {/* <TableCell align="center" component="th" scope="row">
                          {row.id}
                        </TableCell> */}
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">{row.school}</TableCell>

                            <TableCell align="center">{row.status}</TableCell>

                            <TableCell align="center">
                              {/* <DialogSlide2 ref={dialogRef2}/> */}
                              <div
                                className="sm:w-auto w-[50vw]"
                                onClick={() => {
                                  // handleAofView(row.id);
                                  handleAofPDF(row.id);
                                }}
                              >
                                <BasicButton text={"View"} />
                              </div>
                            </TableCell>

                            <TableCell align="center">
                              {/* <DialogSlide2 ref={dialogRef2}/> */}
                              {hideVerfyBtn.includes(row.id) ? (
                                ""
                              ) : (
                                <div
                                  className="sm:w-auto w-[50vw]"
                                  onClick={() => {
                                    // handleAofPDF(row.id);
                                    handleVerify(row.id);
                                  }}
                                >
                                  <BasicButton text={"VERIFY"} />
                                </div>
                              )}
                              {/* {<ReturnVerifyBtn id={row.id} handleVerify={handleVerify}/>} */}
                            </TableCell>

                            {/* <TableCell align="center"> */}
                            {/* {row.id ? (
                                  <div
                                    className="sm:w-auto w-[50vw]"
                                    onClick={() => {
                                      handleInvoiceView(row.id);
                                    }}
                                  >
                                    <BasicButton text={"View"} />
                                  </div>
                                ) : (
                                  ""
                                )} */}
                            {/* </TableCell> */}
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
  );
};

const ReturnVerifyBtn = ({ id, handleVerify }) => {
  const [view, setView] = useState(true);
  return (
    <div
      className="sm:w-auto w-[50vw]"
      onClick={() => {
        // handleAofPDF(row.id);
        handleVerify(id);
      }}
    >
      <BasicButton text={"VERIFY"} />
    </div>
  );
};

export default AOF;
