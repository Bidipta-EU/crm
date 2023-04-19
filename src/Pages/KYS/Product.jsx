import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import BasicButton from "../../Components/Material/Button";
import instance from "../../Instance";
import Cookies from "js-cookie";
import { Backdrop, Button, CircularProgress, Toolbar } from "@mui/material";
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

const Products = (props) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rowdata, setRowdata] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchVal, setSearchVal] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [fkData, setfkData] = useState([]);

  const { id } = useParams();
  console.log(props);

  const sidebarRef = useRef();

  const show = null;

  useLayoutEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    console.log("product id", id);

    const res = await instance({
      url: `/school/kys/product/get/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data.message);
    let data = res.data.message;
    setRowdata(res.data.message);
    setLoading(false);

    //   for (let i = 0; i < data.length; i++) {
    //     let obj = {};
    //     obj.index = i;
    //     let tempArr1 = [];
    //     for (let obj of data[i].school_products_items) {
    //       tempArr1.push(obj.fk_product.item_name);
    //     }
    //     obj.data = tempArr1;
    //     arr.push(obj);
    //   }
    //   setfkData(arr);
    //   console.log(fkData);
    // };
  };
  const navInfo = {
    title: "Products",
    details: ["Home", "/Products"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowdata.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (val) => {
    setSearchVal(val.trim());
  };

  const filterTable = () => {
    setPage(0);
    let tempArr = [];
    for (let ele of rowdata) {
      let subject = ele.fk_subject.subject.toLowerCase();
      let category = ele.category.toLowerCase();
      let productItem =
        ele.school_products_items[0].fk_product.item_name.toLowerCase();

      if (
        subject.indexOf(searchVal.toLowerCase()) > -1 ||
        category.indexOf(searchVal.toLowerCase()) > -1 ||
        productItem.indexOf(searchVal.toLowerCase()) > -1
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
  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Sidebar
          highLight={""}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={""}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />

          <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
            <div className="text-gray-100 w-full md:text-2xl flex justify-between sm:px-12 px-8 items-center text-base font-semibold absolute mt-[2rem]">
              <h1 className="text-gray-100 text-lg">Product</h1>

              <div onClick={() => navigate(`/kys/products/add_product/${id}`)}>
                <BasicButton text={"Add Product"} />
              </div>
            </div>

            <div className="w-full flex flex-col text-gray-100 gap-4 items-center mt-[7rem]">
              <Paper className="mt-5 !w-[90%]">
                {rowdata.length === 0 ? (
                  <div className="flex justify-center bg-[#141728]  text-gray-100">
                    No Product added
                  </div>
                ) : (
                  <TableContainer
                    component={Paper}
                    // className="!w-1/2 lg:!w-[95%]"
                  >
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

                    <Table
                      // sx={{ minWidth: 1050 }}
                      aria-label="customized table"
                    >
                      <TableHead className="bg-slate-500">
                        <TableRow>
                          <TableCell className="!w-[10rem]" align="center">
                            Category
                          </TableCell>
                          <TableCell className="!w-[13rem]" align="center">
                            Grade
                          </TableCell>
                          <TableCell className="!w-[13rem]" align="center">
                            Subject
                          </TableCell>

                          <TableCell className="!w-[13rem]" align="center">
                            Series
                          </TableCell>

                          <TableCell className="!w-[10rem]" align="center">
                            School Product Items
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
                                <TableCell align="center">
                                  {row.category}
                                </TableCell>
                                <TableCell align="center">
                                  {row.fk_grade.name}
                                </TableCell>
                                <TableCell align="center">
                                  {row.fk_subject.subject}
                                </TableCell>
                                <TableCell align="center">
                                  {row.fk_sery.series}
                                </TableCell>

                                <TableCell>
                                  {row.school_products_items.map((item, i) => (
                                    <TableRow>
                                      {" "}
                                      {item ? (
                                        <div>
                                          {i + 1}. {item.fk_product.item_name}
                                        </div>
                                      ) : null}
                                    </TableRow>
                                  ))}
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
                                <TableCell align="center">
                                  {row.category}
                                </TableCell>
                                <TableCell align="center">
                                  {row.fk_grade.name}
                                </TableCell>
                                <TableCell align="center">
                                  {row.fk_subject.subject}
                                </TableCell>

                                <TableCell align="center">
                                  {row.fk_sery.series}
                                </TableCell>

                                <TableCell align="center">
                                  {row.school_products_items.map((item, i) => (
                                    <TableRow>
                                      {" "}
                                      {item ? (
                                        <div>
                                          {i + 1}. {item.fk_product.item_name}
                                        </div>
                                      ) : null}
                                    </TableRow>
                                  ))}
                                </TableCell>
                              </TableRow>
                            ))}
                        <TableRow></TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
