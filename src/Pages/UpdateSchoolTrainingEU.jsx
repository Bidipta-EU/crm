import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import BasicButton from "../Components/Material/Button";
import CustomizedSteppers from "../Components/Material/Stepper";
import SearchDropDown from "../Components/SearchDropDown";
import BasicTextFields from "../Components/Material/TextField";
import { Backdrop, CircularProgress } from "@mui/material";
import instance from "../Instance";
import ControlledSearchDropDown from "../Components/Material/ControlledSearchDropDown";
import Snackbars from "../Components/Material/SnackBar";

const UpdateSchoolTrainingEU = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState(null);
  const [category, setCategory] = useState(null);
  const [values, setValues] = useState({ stateId: "" });
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [steps, setSteps] = useState({
    // step1: true,
    step2: true,
    step3: false,
    step4: false,
  });
  const sidebarRef = useRef();
  const snackbarRef = useRef();

  const show = null;

  let { scid } = useParams();
  let { stid } = useParams();

  const formik = useFormik({
    initialValues: {
      school_name: "",
      school_signatory_name: "",
      school_signatory_designation: "",
      school_signatory_mobile: "",
      school_signatory_email: "",
      school_service_name: "",
      school_service_designation: "",
      school_service_mobile: "",
      school_service_email: "",
      school_address: "",
      school_city: "",
      school_state: "",
      school_pin: "",
      city: "",
      address: "",
      pin_code: "",
    },

    validate: () => {
      const errors = {};
      if (!formik.values.school_name) {
        errors.school_name = "Required";
      }
      // if (!formik.values.school_signatory_name) {
      //   errors.school_name = 'Required'
      // }
      if (!formik.values.board) {
        errors.school_name = "Required";
      }
      if (!formik.values.category) {
        errors.school_name = "Required";
      }
      // if (!formik.values.name) {
      //   errors.school_name = 'Required'
      // }
      // if (!formik.values.email) {
      //   errors.school_name = 'Required'
      // }
      // if (!formik.values.phone) {
      //   errors.school_name = 'Required'
      // }
      // if (!formik.values.web) {
      //   errors.school_name = 'Required'
      // }
      // if (!formik.values.designation) {
      //   errors.school_name = 'Required'
      // }
      if (!formik.values.state) {
        errors.school_name = "Required";
      }
      if (!formik.values.city) {
        errors.school_name = "Required";
      }
      if (!formik.values.address) {
        errors.school_name = "Required";
      }
      if (!formik.values.pin_code) {
        errors.school_name = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      // console.log(values)
      setLoading(true);
      const res = await instance({
        url: "school/create",
        method: "POST",
        data: {
          school_name: formik.values.school_name,
          school_signatory_name: formik.values.school_signatory_name,
          school_signatory_designation:
            formik.values.school_signatory_designation,
          school_signatory_mobile: formik.values.school_signatory_mobile,
          school_signatory_email: formik.values.school_signatory_email,
          school_service_name: formik.values.school_service_name,
          school_service_designation: formik.values.school_service_designation,
          school_service_mobile: formik.values.school_service_mobile,
          school_service_email: formik.values.school_service_email,
          school_address: formik.values.school_address,
          school_city: formik.values.school_city,
          school_state: formik.values.school_state,
          school_pin: formik.values.school_pin,
          state: formik.values.state,
          city: formik.values.city,
          address: formik.values.address,
        },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      // console.log(res.data)
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
            window.location.reload();
          }, 100);
        }, 1500);
      }

      setLoading(false);
    },
  });

  const calActiceStep = () => {
    if (steps.step2) {
      return 0;
    }
    if (steps.step3) {
      // console.log(formik.values.school_name)
      return 1;
    }
    if (steps.step4) {
      // console.log(formik.values.school_signatory_name)
      // console.log(formik.values.school_signatory_designation)
      // console.log(formik.values.school_signatory_mobile)
      // console.log(formik.values.school_signatory_email)
      return 2;
    }
    // if (steps.step4) {
    // console.log(formik.values.school_service_name)
    // console.log(formik.values.school_service_designation)
    // console.log(formik.values.school_service_mobile)
    // console.log(formik.values.school_service_email)
    // return 3;
    // }
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      // step 1
      case "board_name_addschool":
        formik.values.board = value.id;
        break;
      case "category_addschool":
        formik.values.category = value.id;
        break;
      case "Enter School Name *":
        formik.values.school_name = value;
        break;
      case "School Signatory Full Name":
        formik.values.school_signatory_name = value;
        break;
      // step 2
      case "School Signatory Designation":
        formik.values.school_signatory_designation = value;
        break;
      case "School Signatory Mobile Number":
        formik.values.school_signatory_mobile = value;
        break;
      case "School Signatory Email ID":
        formik.values.school_signatory_email = value;
        break;
      case "School Service Person Full Name":
        formik.values.school_service_name = value;
        break;
      // step 2
      case "School Service Person Designation":
        formik.values.school_service_designation = value;
        break;
      case "School Service Person Mobile Number":
        formik.values.school_service_mobile = value;
        break;
      case "School Service Person Email ID":
        formik.values.school_service_email = value;
        break;
      case "School Address":
        // console.log(value)
        formik.values.school_address = value;
        break;
      case "School City":
        // console.log(value)
        formik.values.school_city = value;
        break;
      case "School State":
        // console.log(value)
        formik.values.school_state = value;
        break;
      case "School Pin Code":
        // console.log(value)
        formik.values.school_pin = value;
        break;
      // step 3
      case "select_state":
        // console.log(value);
        formik.values.state = value.fk_state_id;
        setValues({ stateId: value.fk_state_id });
        getCityByState(value.fk_state_id);
        break;
      case "select_city":
        formik.values.city = value.id;
        break;
      case "Enter Address *":
        formik.values.address = value;
        break;
      case "Enter Pin Code *":
        formik.values.pin_code = value;
        break;
      default:
        break;
    }
    // console.log(formik.values)
  };

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const getBoards = async () => {
      const boards = await instance({
        url: "school/board/get/findAll",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setBoards(boards.data.message);
    };
    const getCategory = async () => {
      const category = await instance({
        url: "school/category/get/findAll",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setCategory(category.data.message);
    };
    const getState = async () => {
      const state = await instance({
        url: "location/state/get/states",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setState(state.data.message);
    };
    getBoards();
    getCategory();
    getState();
  }, []);

  const navInfo = {
    title: "Add New School",
    details: ["Home", "/New School"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  const getCityByState = async (id) => {
    setLoading(true);
    const city = await instance({
      url: `location/city/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setCity(city.data.message);
    setLoading(false);
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

  const addNewSchool = async () => {
    let dataToUpdate = {
        
      schoolContanct: [
        {
          category: "signatory",
        },
        {
          category: "service",
        },
      ],
    };

    if (formik.values.school_signatory_name.length !== 0) {
      dataToUpdate.schoolContanct[0].pName =
        formik.values.school_signatory_name;
    }
    if (formik.values.school_signatory_designation.length !== 0) {
      dataToUpdate.schoolContanct[0].designation =
        formik.values.school_signatory_designation;
    }
    if (formik.values.school_signatory_email.length !== 0) {
      dataToUpdate.schoolContanct[0].pEmail =
        formik.values.school_signatory_email;
    }
    if (formik.values.school_signatory_mobile.length !== 0) {
      dataToUpdate.schoolContanct[0].pPhone =
        formik.values.school_signatory_mobile;
    }
    if (formik.values.school_service_name.length !== 0) {
      dataToUpdate.schoolContanct[1].pName = formik.values.school_service_name;
    }
    if (formik.values.school_service_designation.length !== 0) {
      dataToUpdate.schoolContanct[1].designation =
        formik.values.school_service_designation;
    }
    if (formik.values.school_service_mobile.length !== 0) {
      dataToUpdate.schoolContanct[1].pPhone =
        formik.values.school_service_mobile;
    }
    if (formik.values.school_service_email.length !== 0) {
      dataToUpdate.schoolContanct[1].pEmail =
        formik.values.school_service_email;
    }
    if (formik.values.school_address.length !== 0) {
      dataToUpdate.address = formik.values.school_address;
    }
    if (formik.values.school_pin.length !== 0) {
      dataToUpdate.pin = formik.values.school_pin;
    }
    // console.log(dataToUpdate);
    console.log(stid)
    console.log(scid)
    const res = await instance({
      url: `school/update/ckschool/${scid}/${stid}`,
      method: "PUT",
      data: dataToUpdate,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(res.data.status);
    if (res.data.status === "success") {
      console.log(res);
      setSnackbarErrStatus(false)
      setErrMessage("School Updated Successfully");
      snackbarRef.current.openSnackbar();
      setTimeout(() => {
        navigate("/manageSchoolTraining");
      }, 1000);
    }
  };

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
            <h1 className="text-gray-100 md:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Update School
            </h1>
            <div className="w-full flex flex-col gap-4 items-center mt-[7rem]">
              <CustomizedSteppers
                activeStep={calActiceStep()}
                steps={[
                  "",
                  "",
                  "",
                ]}
              />
              {/* step 2 */}
              {steps.step2 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h3 className="text-white">Signatory Contact Details</h3>
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-5 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    {/* <h3>School Signatory</h3> */}
                    <BasicTextFields
                      lable={"School Signatory Full Name"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"School Signatory Designation"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"School Signatory Mobile Number"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />

                    <BasicTextFields
                      lable={"School Signatory Email ID"}
                      variant={"standard"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      multiline={false}
                    />
                    {/* <BasicTextFields
                      lable={"Enter Designation"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    /> */}
                  </div>

                  <div
                    onClick={() => {
                      if (
                        // formik.values.name &&
                        // formik.values.email &&
                        // formik.values.phone &&
                        // formik.values.web &&
                        // formik.values.designation
                        true
                      ) {
                        setSteps({ step2: false, step3: true, step4: false });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      } else {
                        setSnackbarErrStatus(true);
                        setErrMessage("Please Fill All The Fields");
                        snackbarRef.current.openSnackbar();
                      }
                    }}
                    className="mt-3"
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}

              {steps.step3 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h3 className="text-white">Service Person Contact Details</h3>
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-5 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    {/* <h3>School Signatory</h3> */}
                    <BasicTextFields
                      lable={"School Service Person Full Name"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"School Service Person Designation"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"School Service Person Mobile Number"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />

                    <BasicTextFields
                      lable={"School Service Person Email ID"}
                      variant={"standard"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      multiline={false}
                    />
                    {/* <BasicTextFields
                      lable={"Enter Designation"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    /> */}
                  </div>

                  <div
                    onClick={() => {
                      if (
                        // formik.values.name &&
                        // formik.values.email &&
                        // formik.values.phone &&
                        // formik.values.web &&
                        // formik.values.designation
                        true
                      ) {
                        setSteps({ step2: false, step3: false, step4: true });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      } else {
                        setSnackbarErrStatus(true);
                        setErrMessage("Please Fill All The Fields");
                        snackbarRef.current.openSnackbar();
                      }
                    }}
                    className="mt-3"
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}

              {/* step 4 */}
              {steps.step4 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h3 className="text-white">Address Details</h3>
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    {/* <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"School Full Name *"}
                      data={state}
                      Name={"select_state"}
                      color={"rgb(243, 244, 246)"}
                    /> */}
                    {/* <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"School Street "}
                      Name={"select_city"}
                      data={city}
                      disable={!values.stateId}
                      color={"rgb(243, 244, 246)"}
                    /> */}
                    {/* <BasicTextFields
                      lable={"School Full Name *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    /> */}

                    <BasicTextFields
                      lable={"School Address"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    {/* <BasicTextFields
                      lable={"School City"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    /> */}
                    {/* <BasicTextFields
                      lable={"School State"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    /> */}
                    <BasicTextFields
                      lable={"School Pin Code"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      type={"number"}
                      multiline={false}
                    />
                    {/* <BasicTextFields
                      lable={"School Code"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      type={"number"}
                      multiline={false}
                    /> */}
                  </div>

                  <div
                    className="mt-3"
                    onClick={
                      addNewSchool
                      //   () => {
                      //   if (
                      //     formik.values.state &&
                      //     formik.values.city &&
                      //     formik.values.address &&
                      //     formik.values.pin_code
                      //   ) {
                      //     formik.handleSubmit();
                      //   } else {
                      //     setSnackbarErrStatus(true);
                      //     setErrMessage("Please Fill All The Fields");
                      //     snackbarRef.current.openSnackbar();
                      //   }
                      // }
                    }
                  >
                    <BasicButton text={"Update School"} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSchoolTrainingEU;
