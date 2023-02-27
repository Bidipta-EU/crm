import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";

const ManageSchoolTraining = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("manageSchool");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({ state: "", type: "" });
  const [stateId, setStateId] = useState("");
  const [type, setType] = useState("");
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  // const [type, setType] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [schoolRow, setSchoolRow] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - schoolRow.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navInfo = {
    title: "Manage School",
    details: ["Home", " / Manage School"],
  };

  const types = [
    { types: "Classklap" },
    { types: "Eupheus Learning" },
    // { types: "All" },
  ];

  const Tablecolumns = [
    { field: "SchoolName", headerName: "School Name", width: 300 },
    {
      field: "State",
      headerName: "State",
      width: 120,
    },
    {
      field: "City",
      headerName: "City",
      width: 120,
    },
    {
      field: "School Code",
      headerName: "SchoolCode",
      width: 400,
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

  const getSchool = async (stateId, cityId) => {
    setLoading(true);
    const res = await instance({
      url: `school/${stateId}/${cityId}`,
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
    setLoading(false);
  };

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
    setLoading(false);
  };

  const handleOrderProcessingForm = async (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "select_state":
        // console.log(value);
        setStateId(value.id);
        // getCity(value.fk_state_id);
        // getSchoolByState(value.fk_state_id);
        // setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;
      case "select_state_training":
        // console.log(value);
        setStateId(value.id);
        // getCity(value.fk_state_id);
        // getSchoolByState(value.fk_state_id);
        // setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;
      case "select_type":
        // console.log(value);
        setType(value.types);
        // setStateAndCity({ ...stateAndCity, city: value.id });
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

  useLayoutEffect(() => {
    const getStates = async () => {
      const res = await instance({
        url: "location/state/stateswithcode/get",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res.data.message);
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
    getStates();

    // getSchoolData();
  }, []);

  const searchSchool = async () => {
    setSchoolRow([]);
    setSearchRow([]);
    if (type === "Classklap") {
      console.log(stateId);
      const res = await instance({
        url: `school/ckschools/get/${stateId}`,
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res.data.message);
      if (res.data.message.length === 0) {
        alert("No Data Available");
      }
      setSchoolRow(res.data.message);
      // console.log(stateId)
      // console.log(type)
    } else if (type === "Eupheus Learning") {
      const res = await instance({
        url: `school/eupschools/get/${stateId}`,
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      console.log(res.data.message);
      if (res.data.message.length === 0) {
        alert("No Data Available");
      }
      setSchoolRow(res.data.message);
      // console.log(stateId)
      // console.log(type)
    } else if (type === "All") {
      const res = await instance({
        url: `school/ckeupschools/get/${stateId}`,
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res.data.message);
      if (res.data.message.length === 0) {
        alert("No Data Available");
      }
      setSchoolRow(res.data.message);
      // console.log(stateId)
      // console.log(type)
    }
  };

  const updateSchoolCode = async (schoolId, statId) => {
    console.log(schoolId, statId);
    const res = await instance({
      url: `school/update/ckschool/${schoolId}/${statId}`,
      method: "PUT",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data.status);
    if (res.data.status) {
    }
    searchSchool();
  };

  const updateSchool = (schoolId) => {
    console.log(schoolId);
  };

  const handleSearch = (val) => {
    // console.log(val)
    setSearchVal(val.trim());
  };

  const filterTable = () => {
    // console.log(searchVal);
    // console.log(schoolRow)
    setPage(0);
    let tempArr = [];
    for (let ele of schoolRow) {
      // console.log(ele.cardname)
      let schoolName = ele.school_name.toLowerCase();
      if (schoolName.indexOf(searchVal.toLowerCase()) > -1) {
        tempArr.push(ele);
      }
    }
    console.log(tempArr);
    setSearchRow([]);
    if (tempArr.length === 0) {
      // console.log(searchRow)
      setSearchRow([
        {
          id: null,
          ck_code: null,
          school_name: null,
          school_addresses: [
            {
              id: null,
              fk_state: {
                id: null,
                state: null,
              },
              fk_city: {
                id: null,
                city: null,
              },
            },
          ],
        },
      ]);
      // console.log("first")
      // console.log(searchRow)
    } else {
      // console.log("second")
      // console.log(tempArr)
      setSearchRow(tempArr);
      // console.log(searchRow)
    }
  };

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
            <div className="grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 mb-8 py-3 mt-6 gap-6 rounded-md bg-slate-600">
              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">Type</label>

                <SearchDropDown
                  label={"Select Type"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={types}
                  Name="select_type"
                />

                {/* <Autocomplete
                  disablePortal
                  // id="combo-box-demo"
                  options={types}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Movie" />
                  )}
                /> */}
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">State</label>

                <SearchDropDown
                  label={"Select State"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={states}
                  Name="select_state_training"
                />
              </div>
              {/* <div className=" flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">City</label>

                <SearchDropDown
                  label={"Select City"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  disable={city.disable}
                  data={city}
                  Name="select_city"
                />
              </div> */}
              {/* <button className="w-full md:w-[20vw] col-span-2 md:ml-10 focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10 bg-slate-500 transition-all duration-200 ease-linear active:bg-slate-700 active:scale-95 rounded-md">
                Search School
              </button> */}
              <div className="sm:w-auto w-[50vw]" onClick={searchSchool}>
                <BasicButton text={"Search School"} />
              </div>
            </div>
            <div className="w-full flex gap-3 justify-end">
              <Link to="/addschooltraining">
                <BasicButton text={"Create New School"} />
              </Link>
              {/* <Link to="/tagging">
                <BasicButton text={"Tag Existing School"} />
              </Link> */}
            </div>

            <div className=" sm:px-8 px-2 py-3 bg-[#141728] mt-4">
              <Paper>
                <TableContainer component={Paper}>
                  <Toolbar className="bg-slate-400">
                    {/* <form> */}
                    <TextField
                      id="search-bar"
                      className="text"
                      onInput={(e) => {
                        handleSearch(e.target.value);
                      }}
                      label="Enter School Name"
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
                          ? schoolRow.length
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
                    {/* </form> */}
                  </Toolbar>

                  <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead className="bg-slate-500">
                      <TableRow>
                        <TableCell className="!w-[13rem]" align="center">
                          School Name
                        </TableCell>
                        <TableCell className="!w-[13rem]" align="center">
                          State
                        </TableCell>
                        <TableCell className="!w-[13rem]" align="center">
                          City
                        </TableCell>
                        <TableCell className="!w-[10rem]" align="center">
                          School Code
                        </TableCell>
                        <TableCell
                          className="!w-[8rem]"
                          align="center"
                        ></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="bg-slate-200">
                      {searchRow.length === 0
                        ? (rowsPerPage > 0
                            ? schoolRow.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : schoolRow
                          ).map((row) => (
                            <TableRow
                              key={row.school_name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {row.school_name}
                              </TableCell>
                              <TableCell align="center">
                                {row.school_addresses[0].fk_state.state}
                              </TableCell>
                              <TableCell align="center">
                                {row.school_addresses[0].fk_city.city}
                              </TableCell>
                              {row.ck_code ? (
                                <TableCell align="center">
                                  {row.ck_code}
                                </TableCell>
                              ) : (
                                <TableCell align="center">
                                  N/A
                                  {/* <div
                                    className="sm:w-auto w-[50vw]"
                                    onClick={() => {
                                      updateSchoolCode(row.id, stateId);
                                    }}
                                  >
                                    <BasicButton text={"Get Code"} />
                                  </div> */}
                                </TableCell>
                              )}
                              <TableCell align="center">
                                {type === "Classklap" ? (
                                  <div className="w-full flex gap-3 justify-end">
                                    <Link
                                      to={`/update_school_training/${row.id}/${row.ck_code}`}
                                    >
                                      <BasicButton text={"Edit"} />
                                    </Link>
                                  </div>
                                ) : (
                                  <div className="w-full flex gap-3 justify-end">
                                    <Link
                                      to={`/update_school_training_eu/${row.id}/${stateId}`}
                                    >
                                      <BasicButton text={"Edit"} />
                                    </Link>
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
                              key={row.school_name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {row.school_name}
                              </TableCell>
                              <TableCell align="center">
                                {row.school_addresses[0].fk_state.state}
                              </TableCell>
                              <TableCell align="center">
                                {row.school_addresses[0].fk_city.city}
                              </TableCell>
                              {row.ck_code ? (
                                <TableCell align="center">
                                  {row.ck_code}
                                  {/* <div
                                      className="sm:w-auto w-[50vw]"
                                        onClick={""}
                                        >
                                        <BasicButton text={"Get Code"} />
                                        </div> */}
                                </TableCell>
                              ) : (
                                <TableCell align="center">
                                  {row.id ? (
                                    <div
                                      className="sm:w-auto w-[50vw]"
                                      onClick={() => {
                                        updateSchoolCode(row.id, stateId);
                                      }}
                                    >
                                      <BasicButton text={"Get Code"} />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                              )}
                              <TableCell align="center">
                                {type === "Classklap" ? (
                                  <div className="w-full flex gap-3 justify-end">
                                    <Link
                                      to={`/update_school_training/${row.id}/${row.ck_code}`}
                                    >
                                      <BasicButton text={"Edit"} />
                                    </Link>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchoolTraining;
