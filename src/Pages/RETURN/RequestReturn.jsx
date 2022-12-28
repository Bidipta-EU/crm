import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import SearchDropDown from "../../Components/SearchDropDown";
import { useFormik } from "formik";
import Button from "../../Components/Material/Button";
import BasicTextFields from "../../Components/Material/TextField";
import instance from "../../Instance";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress, Collapse, TextField } from "@mui/material";
import Snackbars from "../../Components/Material/SnackBar";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import { protectedResources } from "../../util/msConfig";
import { getToken } from "../../util/msAuth";
import { useNavigate } from "react-router-dom";


const RequestReturn = () => {
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("return");
  const [customerData, setCustomerData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [seriesData, setSeriesData] = useState([{ series: "", disable: true }]);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const sidebarRef = useRef();
  const navigate = useNavigate()


  const [value, setValue] = useState({
    item_quan: true,
    quantity: "0",
    total_before_tax: "0",
    total: "0",
  });

  
  const snackbarRef = useRef();
  const [rowData, setRowData] = useState([]);

  const formik = useFormik({
    initialValues: {
      
      fk_bp_id: "",
      item_quan: "",
      items: [],
      quantity: value.quantity,

    },
    validate: () => {
      const errors = {};

      if (!formik.values.fk_bp_id) {
        errors.subject = "Required";
      }

      if (!formik.values.subject) {
        errors.subject = "Required";
      }
      if (!formik.values.series) {
        errors.series = "Required";
      }
      if (!formik.values.item_quan) {
        errors.item_quan = "Required";
      }

      if (!formik.values.quantity) {
        errors.quantity = "Required";
      }
    
      if (Object.keys(errors).length > 0) {
        setSnackbarErrStatus(true);
        setErrMessage("Please Fill All The Fields");
        snackbarRef.current.openSnackbar();
      }

      return errors;
    },
    onSubmit: async (values) => {
     // console.log(values);

     console.log(
      {
         
        fk_bp_id: formik.values.fk_bp_id,
        quantity: value.quantity,
        items: formik.values.items.map((item) => {
          return { fk_item_id: item.id, quantity: item.quantity };
        }),
      }

     )
      setLoading(true);

      formik.values.items = formik.values.items.filter(
        (item) => !(Number(item.quantity) === 0)
      );

      const res = await instance({
        url: "returns/create",
        method: "POST",
        data: {
         
          fk_bp_id: formik.values.fk_bp_id,
          quantity: value.quantity,
          items: formik.values.items.map((item) => {
            return { fk_item_id: item.id, quantity: item.quantity };
          }),
        },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      if (res.data.status === "success") {
        setSnackbarErrStatus(false);
        setErrMessage("Return Created SuccessFully");
        snackbarRef.current.openSnackbar();
        setTimeout(() => {
          navigate('/return')
        }, 1500);
      }
      setLoading(false);
      setOpen(true)
      
      
    },
  });

  const navInfo = {
    title: "Request Return",
    details: ["Home", " / Request Return"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  useLayoutEffect(() => {
    const getSubjectData = async () => {
      if (Cookies.get("ms-auth")) {
        const accessToken = await getToken(
          protectedResources.apiTodoList.scopes.read
        );
        const SubjectRes = await instance({
          url: "subject/getsubjects",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSubjectData(SubjectRes.data.message);
      } else {
        const SubjectRes = await instance({
          url: "subject/getsubjects",
          method: "GET",
          headers: {
            Authorization: `${Cookies.get("accessToken")}`,
          },
        });
        setSubjectData(SubjectRes.data.message);
      }
    };

    getSubjectData();
    getSampleCustomers();
  }, []);

  // console.log(schoolData)



  const getSeriesData = async (id) => {
    setLoading(true);
    const SeriesRes = await instance({
      url: `series/getseries/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(SeriesRes.data);
    setSeriesData(SeriesRes.data.message);

    setLoading(false);
  };

  const getListData = async (seriesID) => {
    setLoading(true);
    const getListData = await instance({
      url: `items/getitem/${seriesID}/${formik.values.subject.id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });

    // console.log(getListData.data.message);
    setRowData(getListData.data.message);
    // if (!value.item_quan) {
    //   console.log("working");
    //   formik.values.items = [];
    // }
    // console.log(formik.values.items.length);
    getListData.data.message.map((item) => {
      formik.values.items.push({
        id: item.id,
        item_id: item.item_code,
        quantity: formik.values.item_quan,
        price: item.price_master.price,
        tax: item.fk_tax.tax,
        discount: item.fk_discount.discount,
      });
    });
    setValue({
      item_quan: false,
      quantity: calValues("quantity"),
      total: calValues("total_after_tax"),
      total_before_tax: calValues("total_before_tax"),
    });
    setLoading(false);
    setOpen(true);
  };

  const conditionalGetList = (id) => {
    if (!value.item_quan) {
      getListData(id);
    }
  };

  const getSampleCustomers = async () => {
    setLoading(true);
    const customer = await instance({
      url: "/sales_data/get_all_bps",
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setCustomerData(customer.data.message);
    setLoading(false);
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "customer_name":
        getSampleCustomers();
        formik.values.fk_bp_id = value.id;
        break;
      case "school_name":
        formik.values.school = value.id;
        break;
      case "subject_name":
        formik.values.subject = value;
        break;
      case "series_name":
        formik.values.series = value;
        conditionalGetList(value.id);
        // getListData(value.id);
        setValue((prev) => ({ ...prev, item_quan: false }));

        break;
      case "Items Quantity":
        formik.values.item_quan = value;
        if (rowData.length === 0) {
          getListData(formik.values.series.id);
        }
        break;
      case "Remarks":
        formik.values.remarks = value;
        break;

      default:
        break;
    }
  };
  // console.log(address);

  const calValues = (type) => {
    if (type === "quantity") {
      let total = 0;
      formik.values.items.map((item) => {
        total = total + Number(item.quantity);
      });
      return total.toString();
    }
    if (type === "total_before_tax") {
      let total = 0;
      let discount = 0;
      formik.values.items.map((item) => {
        discount =
          discount +
          (Number(item.discount) / 100) *
            Number(item.price) *
            Number(item.quantity);
        total = total + Number(item.price) * Number(item.quantity);
      });
      total = total - discount;
      return total.toString();
    }
    if (type === "total_after_tax") {
      let total = 0;
      let discount = 0;
      formik.values.items.map((item) => {
        let percentage =
          (Number(item.tax) / 100) * Number(item.price) * Number(item.quantity);
        discount =
          discount +
          (Number(item.discount) / 100) *
            Number(item.price) *
            Number(item.quantity);
        total = total + Number(item.price) * Number(item.quantity) + percentage;
      });
      // console.log(total - discount);
      // console.log(discount);
      return (total - discount).toString();
    }
  };

  const alterItemQuantity = (index, value) => {
    formik.values.items[index] = {
      id: formik.values.items[index].id,
      item_id: formik.values.items[index].item_id,
      quantity: value,
      price: formik.values.items[index].price,
      tax: formik.values.items[index].tax,
      discount: formik.values.items[index].discount,
    };
    //console.log(formik.values.items);
    setValue({
      item_quan: false,
      quantity: calValues("quantity"),
      total: calValues("total_after_tax"),
      total_before_tax: calValues("total_before_tax"),
    });
  };
  // console.log(value);

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
    <div className="flex">
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
        className={`flex flex-col w-[100vw] transition-all duration-300 ease-linear lg:w-[83vw] lg:ml-[18vw] ${
          window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
        }`}
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
          <div className=" px-2 sm:px-8 py-3 bg-[#141728]">
            <form
              // id="form"
              className="flex flex-col gap-[2rem] sm:px-6 px-4 py-6 bg-slate-600 rounded-md"
            >
              <section
                className={`grid grid-cols-1 grid-rows-10 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-8 lg:grid-rows-2 md:grid-rows-2 sm:grid-rows-2 bg-slate-600 rounded-md`}
              >
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Customer Name</label> */}

                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    data={customerData}
                    Name="customer_name"
                    label={"Customer Name"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
    
            
               
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Select Subject</label> */}

                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    getSeriesData={getSeriesData}
                    data={subjectData}
                    Name={"subject_name"}
                    label={"Select Subject"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Select Series</label> */}

                  <SearchDropDown
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    Name={"series_name"}
                    disable={seriesData[0].disable}
                    data={seriesData}
                    label={"Select Series"}
                    color={"rgb(243, 244, 246)"}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full">
                  <TextField
                    id="standard-basic"
                    onBlur={(e) =>
                      handleOrderProcessingForm(
                        e.target.value,
                        "Items Quantity"
                      )
                    }
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{ style: { color: "white" } }}
                    label="Items Quantity"
                    variant="standard"
                  />
                </div>
              </section>
              <Collapse in={open}>
                <section className="bg-white px-3 py-2 rounded-md w-full h-[15rem] overflow-auto sm:grid sm:grid-cols-2 flex flex-col gap-2 col-span-4">
                  {rowData.map((item, index) => {
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col rounded-md text-xs gap-1 px-4 py-2 bg-slate-300 text-slate-700 font-bold"
                      >
                        <span>Item Name: {item.item_name}</span>
                        <span>Item Code: {item.item_code}</span>
                        <span>Discount: {item.fk_discount.discount}%</span>
                        <span>Price: {item.price_master.price}</span>
                        <span>Tax: {item.fk_tax.tax}%</span>
                        <span>
                          Quantity:{"   "}
                          <input
                            type="text"
                            onChange={(e) =>
                              alterItemQuantity(index, e.target.value)
                            }
                            defaultValue={formik.values.item_quan}
                            placeholder="Enter Quantity"
                            className="px-4 py-2 font-bold rounded-md sm:w-[30%] w-[70%] outline-none"
                          />
                        </span>
                      </div>
                    );
                  })}
                </section>
              </Collapse>
              <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-8 lg:grid-rows-1 md:grid-rows-2 sm:grid-rows-3 bg-slate-600 rounded-md">
                
                <div className=" flex flex-col gap-2 w-full">
                  {/* <label className="text-gray-100">Total Quantity</label> */}

                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Total Quantity"}
                    readOnly={true}
                    defaultValue={value.quantity}
                    value={value.quantity}
                    variant={"standard"}
                    multiline={false}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-full md:col-span-2">
                  {/* <label className="text-gray-100">Remarks</label> */}

                  <BasicTextFields
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    lable={"Remarks"}
                    //   variant={"standard"}
                    multiline={true}
                  />
                </div>
               
              </div>
             
              <div onClick={formik.handleSubmit}>
                <Button text={"Return"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestReturn;
