import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import BasicButton from "../../Components/Material/Button";
import instance from "../../Instance";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import BasicTextFields from "../../Components/Material/TextField";
import { useFormik } from "formik";
import Snackbars from "../../Components/Material/SnackBar";
import SearchDropDown from "../../Components/SearchDropDown";
import DatePicker from "../../Components/Material/Date";

const AddWorkShop = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [grades, setGrades] = useState([]);
  const [subject, setSubject] = useState([]);
  const [series, setSeries] = useState([]);
  const sidebarRef = useRef();
  const { id } = useParams();
  const show = null;

  const snackbarRef = useRef();

  const handleDate = (date) => {
    let modifiedDate = `${date.split(" ")[1]} ${date.split(" ")[2]} ${
      date.split(" ")[3]
    }`;

    return modifiedDate;
  };

  const formik = useFormik({
    initialValues: {
      workshop: "",
      ly: "",
      cy: "",
      grade_id: "",
      subject_id: "",
      series_id: "",
      budget: "",
      resource: "",
      date: handleDate(new Date().toString()),
      remarks: "",
    },
    validate: () => {
      const errors = {};
      if (!formik.values.workshop) {
        errors.workshop = "Please Enter Workshop Name";
      }
      if (!formik.values.resource) {
        errors.resource = "Please Enter Resource Name";
      }
      if (!formik.values.grade_id) {
        errors.grade = "Please Select Grade";
      }
      if (!formik.values.series_id) {
        errors.series_id = "Please Select Series";
      }
      if (!formik.values.subject_id) {
        errors.subject_id = "Please Select Subject";
      }
      if (!formik.values.ly) {
        errors.ly = "Please Enter Expected LY";
      }
      if (!formik.values.cy) {
        errors.cy = "Please Enter Expected CY";
      }
      if (!formik.values.budget) {
        errors.budget = "Please Enter Budget";
      }
      // if (!formik.values.date) {
      //   errors.date = "Please Select Date";
      // }
      if (!formik.values.remarks) {
        errors.remarks = "Please Enter Remarks";
      }

      if (Object.values(errors).length > 0) {
        setSnackbarErrStatus(true);
        setErrMessage(Object.values(errors)[0]);
        snackbarRef.current.openSnackbar();
      }

      return errors;
    },
    onSubmit: async (values) => {
      // console.log(values);
      setLoading(true);
      const res = await instance({
        url: `school/workshop/create/${id}`,
        method: "POST",
        data: {
          workshop_name: formik.values.workshop,
          ly: formik.values.ly,
          cy: formik.values.cy,
          remarks: formik.values.remarks,
          fk_grade_id: formik.values.grade_id,
          fk_series_id: formik.values.series_id,
          budget: formik.values.budget,
          resource_name: formik.values.resource,
          date: formik.values.date,
        },
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res.data);
      if (res.data.status === "success") {
        setSnackbarErrStatus(false);
        setErrMessage(res.data.message);
        snackbarRef.current.openSnackbar();
        setTimeout(() => {
          window.scroll({
            top: 0,
            // behavior: "smooth",
          });
          setTimeout(() => {
            window.location.replace(`/kys/workshop/${id}`);
          }, 100);
        }, 1500);
      } else {
        setSnackbarErrStatus(true);
        setErrMessage(res.data.message);
        snackbarRef.current.openSnackbar();
      }
      setLoading(false);
    },
  });

  const navInfo = {
    title: "Workshop",
    details: ["Home", "/Workshop"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  useLayoutEffect(() => {
    const getGrades = async () => {
      const res = await instance({
        url: `grades/getAll`,
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setGrades(res.data.message);
    };
    const getSubjects = async () => {
      const res = await instance({
        url: `subject/getsubjects`,
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      // console.log(res.data.message);
      setSubject(res.data.message);
    };
    getGrades();
    getSubjects();
  }, []);

  const handleOrderProcessingForm = (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "Workshop Name":
        formik.values.workshop = value;
        break;
      case "Resource Name":
        formik.values.resource = value;
        break;
      case "grades":
        formik.values.grade_id = value.id;
        break;
      case "subject_name":
        formik.values.subject_id = value.id;
        break;
      case "series_name":
        formik.values.series_id = value.id;
        break;
      case "Expected LY":
        formik.values.ly = value;
        break;
      case "Expected CY":
        formik.values.cy = value;
        break;
      case "Budget":
        formik.values.budget = value;
        break;
      case "Date":
        formik.values.date = handleDate(value.toString());
        break;
      case "Remarks":
        formik.values.remarks = value;
        break;
      default:
        break;
    }
  };

  const getSeriesData = async (id) => {
    setLoading(true);
    const res = await instance({
      url: `series/getseries/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setLoading(false);

    setSeries(res.data.message);
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
          <Snackbars
            ref={snackbarRef}
            snackbarErrStatus={snackbarErrStatus}
            errMessage={errMessage}
          />
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />

          <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
            <div className="text-gray-100 w-full md:text-2xl flex justify-between sm:px-12 px-8 items-center text-base font-semibold absolute mt-[2rem]">
              <h1>Workshop</h1>
            </div>

            <div className="w-full flex flex-col text-gray-100 gap-4  items-center mt-[7rem]">
              <div className="flex flex-col gap-4 items-start sm:w-[75%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h1 className="text-gray-100 md:text-xl text-base font-semibold">
                  Fill In The Details
                </h1>

                <div className="flex w-full flex-col gap-4 items-center justify-center">
                  <div className="grid w-full sm:gap-8 gap-6 sm:grid-rows-5 sm:grid-cols-2 grid-cols-1 grid-rows-9">
                    <BasicTextFields
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      lable={"Workshop Name"}
                    />
                    <BasicTextFields
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      lable={"Resource Name"}
                    />
                    <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      data={grades}
                      Name={"grades"}
                      label={"Select Grade"}
                      color={"rgb(243, 244, 246)"}
                    />
                    <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      data={subject}
                      Name={"subject_name"}
                      getSeriesData={getSeriesData}
                      label={"Select Subject"}
                      color={"rgb(243, 244, 246)"}
                    />
                    <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      data={series}
                      Name={"series_name"}
                      disable={formik.values.subject_id ? false : true}
                      label={"Select Series"}
                      color={"rgb(243, 244, 246)"}
                    />
                    <BasicTextFields
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      type={"number"}
                      lable={"Expected LY"}
                    />
                    <BasicTextFields
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      type={"number"}
                      lable={"Expected CY"}
                    />
                    <BasicTextFields
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      type={"number"}
                      lable={"Budget"}
                    />

                    <DatePicker
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"Date"}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <BasicTextFields
                    lable={"Remarks"}
                    multiline={true}
                    handleOrderProcessingForm={handleOrderProcessingForm}
                  />
                </div>
                <div onClick={formik.handleSubmit}>
                  <BasicButton text={"Submit"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWorkShop;
