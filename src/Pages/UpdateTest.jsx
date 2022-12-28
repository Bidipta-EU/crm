import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import BasicButton from "../Components/Material/Button";
import CustomizedSteppers from "../Components/Material/Stepper";
// import SearchDropDown from "../Components/SearchDropDown";
// import BasicTextFields from "../Components/Material/TextField";
import {
  Autocomplete,
  Backdrop,
  CircularProgress,
  TextField,
} from "@mui/material";
import instance from "../Instance";
// import ControlledSearchDropDown from "../Components/Material/ControlledSearchDropDown";
import Snackbars from "../Components/Material/SnackBar";

const UpdateSchool = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState([]);
  const [category, setCategory] = useState([]);
  //   const [values, setValues] = useState({ stateId: "" });
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [schoolData, setSchoolData] = useState({
    school_name: "",
    afflication_code: "",
    fk_board: { id: "", board_name: "" },
    fk_category: { id: "", schoolCategory: "" },
    school_contacts: [
      { designation: "", email: "", id: "", name: "", phone: "", website: "" },
    ],
    school_addresses: [
      {
        address: "",
        fk_city: { city: "", id: "" },
        fk_state: { id: "", state: "" },
        pin: "",
        id: "",
      },
    ],
  });
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  const { id } = useParams();
  const sidebarRef = useRef();
  const snackbarRef = useRef();
  const show = null;

  const formik = useFormik({
    initialValues: {
      school_name: schoolData.school_name,
      aff_code: schoolData.afflication_code,
      board: schoolData.fk_board.id,
      category: schoolData.fk_category.id,
      name: schoolData.school_contacts[0].name,
      email: schoolData.school_contacts[0].email,
      phone: schoolData.school_contacts[0].phone,
      web: schoolData.school_contacts[0].website,
      designation: schoolData.school_contacts[0].designation,
      state: schoolData.school_addresses[0].fk_state.id,
      city: schoolData.school_addresses[0].fk_city.id,
      address: schoolData.school_addresses[0].address,
      pin_code: schoolData.school_addresses[0].pin,
    },

    // validate: () => {
    //   const errors = {};
    //   if (!formik.values.school_name) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.aff_code) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.board) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.category) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.name) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.email) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.phone) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.web) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.designation) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.state) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.city) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.address) {
    //     errors.school_name = "Required";
    //   }
    //   if (!formik.values.pin_code) {
    //     errors.school_name = "Required";
    //   }
    //   return errors;
    // },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await instance({
        url: `school/update/${id}`,
        method: "PUT",
        data: {
          aff_code: formik.values.aff_code,
          board: formik.values.board,
          category: formik.values.category,
          status: false,
          pName: formik.values.name,
          pEmail: formik.values.email,
          pPhone: formik.values.phone,
          web: formik.values.web,
          designation: formik.values.designation,
          state: formik.values.state,
          city: formik.values.city,
          pin: formik.values.pin_code,
          address: formik.values.address,
        },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      console.log(res.data);
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

  useEffect(() => {
    formik.values.school_name = schoolData.school_name;
    formik.values.aff_code = schoolData.afflication_code;
    formik.values.board = schoolData.fk_board.id;
    formik.values.category = schoolData.fk_category.id;
    formik.values.name = schoolData.school_contacts[0].name;
    formik.values.email = schoolData.school_contacts[0].email;
    formik.values.phone = schoolData.school_contacts[0].phone;
    formik.values.web = schoolData.school_contacts[0].website;
    formik.values.designation = schoolData.school_contacts[0].designation;
    formik.values.state = schoolData.school_addresses[0].fk_state.id;
    formik.values.city = schoolData.school_addresses[0].fk_city.id;
    formik.values.address = schoolData.school_addresses[0].address;
    formik.values.pin = schoolData.school_addresses[0].pin;
  }, [schoolData]);

  const calActiceStep = () => {
    if (steps.step1) {
      return 0;
    }
    if (steps.step2) {
      return 1;
    }
    if (steps.step3) {
      return 2;
    }
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      // step 1
      case "board_name":
        const board = boards.find((item) => item.board_name === value);
        formik.values.board = board.id;
        setSchoolData({
          ...schoolData,
          fk_board: { id: board.id, board_name: board.board_name },
        });
        break;
      case "category":
        const category = category.find((item) => item.schoolCategory === value);
        formik.values.category = category.id;
        setSchoolData({
          ...schoolData,
          fk_category: {
            id: category.id,
            schoolCategory: category.schoolCategory,
          },
        });
        break;
      case "Enter School Name *":
        setSchoolData({ ...schoolData, school_name: value });
        formik.values.school_name = value;
        break;
      case "Enter Affiliate Code *":
        setSchoolData({ ...schoolData, afflication_code: value });
        formik.values.aff_code = value;
        break;
      // step 2
      case "Enter Name *":
        setSchoolData({
          ...schoolData,
          school_contacts: [
            {
              name: value,
              designation: schoolData.school_contacts[0].designation,
              email: schoolData.school_contacts[0].email,
              phone: schoolData.school_contacts[0].phone,
              website: schoolData.school_contacts[0].website,
              id: schoolData.school_contacts[0].id,
            },
          ],
        });
        formik.values.name = value;
        break;
      case "Enter Email *":
        setSchoolData({
          ...schoolData,
          school_contacts: [
            {
              name: schoolData.school_contacts[0].name,
              designation: schoolData.school_contacts[0].designation,
              email: value,
              phone: schoolData.school_contacts[0].phone,
              website: schoolData.school_contacts[0].website,
              id: schoolData.school_contacts[0].id,
            },
          ],
        });
        formik.values.email = value;
        break;
      case "Enter Phone *":
        setSchoolData({
          ...schoolData,
          school_contacts: [
            {
              name: schoolData.school_contacts[0].name,
              designation: schoolData.school_contacts[0].designation,
              email: schoolData.school_contacts[0].email,
              phone: value,
              website: schoolData.school_contacts[0].website,
              id: schoolData.school_contacts[0].id,
            },
          ],
        });
        formik.values.phone = value;
        break;
      case "Enter Website *":
        setSchoolData({
          ...schoolData,
          school_contacts: [
            {
              name: schoolData.school_contacts[0].name,
              designation: schoolData.school_contacts[0].designation,
              email: schoolData.school_contacts[0].email,
              phone: schoolData.school_contacts[0].phone,
              website: value,
              id: schoolData.school_contacts[0].id,
            },
          ],
        });
        formik.values.web = value;
        break;
      case "Enter Designation *":
        setSchoolData({
          ...schoolData,
          school_contacts: [
            {
              name: schoolData.school_contacts[0].name,
              designation: value,
              email: schoolData.school_contacts[0].email,
              phone: schoolData.school_contacts[0].phone,
              website: schoolData.school_contacts[0].website,
              id: schoolData.school_contacts[0].id,
            },
          ],
        });
        formik.values.designation = value;
        break;
      // step 3
      case "select_state":
        const s = state.find((item) => item.fk_state.state === value);
        // console.log(s);
        formik.values.state = s.fk_state.id;
        setSchoolData({
          ...schoolData,
          school_addresses: [
            {
              address: schoolData.school_addresses[0].address,
              fk_state: s.fk_state,
              fk_city: schoolData.school_addresses[0].fk_city,
              id: schoolData.school_addresses[0].id,
              pin: schoolData.school_addresses[0].pin,
            },
          ],
        });
        break;
      case "select_city":
        const c = city.find((item) => item.city === value);
        // console.log(c);
        formik.values.city = c.id;
        setSchoolData({
          ...schoolData,
          school_addresses: [
            {
              address: schoolData.school_addresses[0].address,
              fk_state: schoolData.school_addresses[0].fk_state,
              fk_city: c,
              id: schoolData.school_addresses[0].id,
              pin: schoolData.school_addresses[0].pin,
            },
          ],
        });
        break;
      case "Enter Address *":
        setSchoolData({
          ...schoolData,
          school_addresses: [
            {
              id: schoolData.school_addresses[0].id,
              address: value,
              pin: schoolData.school_addresses[0].pin,
              fk_city: schoolData.school_addresses[0].fk_city,
              fk_state: schoolData.school_addresses[0].fk_state,
            },
          ],
        });
        formik.values.address = value;
        break;
      case "Enter Pincode *":
        setSchoolData({
          ...schoolData,
          school_addresses: [
            {
              id: schoolData.school_addresses[0].id,
              address: schoolData.school_addresses[0].address,
              pin: value,
              fk_city: schoolData.school_addresses[0].fk_city,
              fk_state: schoolData.school_addresses[0].fk_state,
            },
          ],
        });
        formik.values.pin_code = value;
        break;
      default:
        break;
    }
    console.log(formik.values);
  };

  //   const handleChange = (e) => {
  //     console.log(e.target.value);
  //   };

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
      const city = await instance({
        url: `location/city/${schoolData.school_addresses[0].fk_state.id}`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setCity(city.data.message);
    };
    const getSchoolData = async () => {
      const schoolDetails = await instance({
        url: `school/schoolcheck/school/${id}`,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      //   console.log(schoolDetails.data.message[0]);

      setSchoolData({
        ...schoolData,
        school_name: schoolDetails.data.message[0].school_name,
        afflication_code: schoolDetails.data.message[0].afflication_code,
        fk_board: {
          board_name: schoolDetails.data.message[0].fk_board.board_name,
          id: schoolDetails.data.message[0].fk_board.id,
        },
        fk_category: {
          schoolCategory:
            schoolDetails.data.message[0].fk_category.schoolCategory,
          id: schoolDetails.data.message[0].fk_category.id,
        },
        school_contacts: [
          {
            name:
              schoolDetails.data.message[0].school_contacts.length > 0
                ? schoolDetails.data.message[0].school_contacts[0].name
                : "",
            email:
              schoolDetails.data.message[0].school_contacts.length > 0
                ? schoolDetails.data.message[0].school_contacts[0].email
                : "",
            phone:
              schoolDetails.data.message[0].school_contacts.length > 0
                ? schoolDetails.data.message[0].school_contacts[0].phone
                : "",
            website:
              schoolDetails.data.message[0].school_contacts.length > 0
                ? schoolDetails.data.message[0].school_contacts[0].website
                : "",
            designation:
              schoolDetails.data.message[0].school_contacts.length > 0
                ? schoolDetails.data.message[0].school_contacts[0].designation
                : "",
            id:
              schoolDetails.data.message[0].school_contacts.length > 0
                ? schoolDetails.data.message[0].school_contacts[0].id
                : "",
          },
        ],
        school_addresses: [
          {
            address:
              schoolDetails.data.message[0].school_addresses.length > 0
                ? schoolDetails.data.message[0].school_addresses[0].address
                : "",
            pin:
              schoolDetails.data.message[0].school_addresses.length > 0
                ? schoolDetails.data.message[0].school_addresses[0].pin
                : "",
            fk_city: {
              city:
                schoolDetails.data.message[0].school_addresses.length > 0
                  ? schoolDetails.data.message[0].school_addresses[0].fk_city
                      .city
                  : "",
              id:
                schoolDetails.data.message[0].school_addresses.length > 0
                  ? schoolDetails.data.message[0].school_addresses[0].fk_city.id
                  : "",
            },
            fk_state: {
              id:
                schoolDetails.data.message[0].school_addresses.length > 0
                  ? schoolDetails.data.message[0].school_addresses[0].fk_state
                      .id
                  : "",
              state:
                schoolDetails.data.message[0].school_addresses.length > 0
                  ? schoolDetails.data.message[0].school_addresses[0].fk_state
                      .state
                  : "",
            },
          },
        ],
      });
    };
    getBoards();
    getCategory();
    getState();
    getSchoolData();
  }, []);
  const navInfo = {
    title: "Update School",
    details: ["Home", "/Update School"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  //   const getCityByState = async (id) => {
  //     const city = await instance({
  //       url: `location/city/${id}`,
  //       method: "GET",
  //       headers: {
  //         Authorization: Cookies.get("accessToken"),
  //       },
  //     });
  //     setCity(city.data.message);
  //   };

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

  //   console.log(schoolData);
  //   console.log(formik.values);
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
              {/* <CustomizedSteppers
                activeStep={calActiceStep()}
                steps={["Basic Details", "Contact Details", "Address Details"]}
              /> */}
              
              {/* step 1 */}
              {/* {steps.step1 ? ( */}
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <TextField
                      id="standard-basic"
                      onChange={(e) =>
                        handleOrderProcessingForm(
                          e.target.value,
                          "Enter School Name *"
                        )
                      }
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      value={schoolData.school_name}
                      label="Enter School Name *"
                      variant="standard"
                    />

                    <TextField
                      id="standard-basic"
                      onChange={(e) =>
                        handleOrderProcessingForm(
                          e.target.value,
                          "Enter Affiliate Code *"
                        )
                      }
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      value={schoolData.afflication_code}
                      label="Enter Affiliate Code *"
                      variant="standard"
                    />

                    <Autocomplete
                      value={schoolData.fk_board.board_name}
                      options={boards.map((board) => {
                        return board.board_name;
                      })}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "board_name");
                      }}
                      sx={{ width: 200 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Board *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    />
                    <Autocomplete
                      value={schoolData.fk_category.schoolCategory}
                      options={category.map((item) => {
                        return item.schoolCategory;
                      })}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "category");
                      }}
                      sx={{ width: 200 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Category *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    />
                  </div>
                  <div
                    className="mt-3"
                    onClick={() => {
                      console.log(formik.values);

                      setSteps({ step1: false, step2: true, step3: false });
                      window.scroll({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                   <div className="mt-3" onClick={formik.handleSubmit}>
                    <BasicButton text={"Submit"} />
                  </div>
                    {/* <BasicButton text={"Submit"} /> */}
                  </div>
                </div>
              {/* ) : null} */}

              {/* step 2 */}
              {/* {steps.step2 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-5 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <TextField
                      id="standard-basic"
                      onChange={(e) =>
                        handleOrderProcessingForm(
                          e.target.value,
                          "Enter Name *"
                        )
                      }
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      value={schoolData.school_contacts[0].name}
                      label="Enter Name *"
                      variant="standard"
                    />

                    <TextField
                      id="standard-basic"
                      onChange={(e) =>
                        handleOrderProcessingForm(
                          e.target.value,
                          "Enter Email *"
                        )
                      }
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      value={schoolData.school_contacts[0].email}
                      label="Enter Email *"
                      variant="standard"
                    />

                    <TextField
                      id="standard-basic"
                      type={"number"}
                      onChange={(e) =>
                        handleOrderProcessingForm(
                          e.target.value,
                          "Enter Phone *"
                        )
                      }
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      value={schoolData.school_contacts[0].phone}
                      label="Enter Phone *"
                      variant="standard"
                    />

                    <TextField
                      id="standard-basic"
                      onChange={(e) =>
                        handleOrderProcessingForm(
                          e.target.value,
                          "Enter Website *"
                        )
                      }
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      value={schoolData.school_contacts[0].website}
                      label="Enter Website *"
                      variant="standard"
                    />

                    <TextField
                      id="standard-basic"
                      onChange={(e) =>
                        handleOrderProcessingForm(
                          e.target.value,
                          "Enter Designation *"
                        )
                      }
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      value={schoolData.school_contacts[0].designation}
                      label="Enter Designation *"
                      variant="standard"
                    />
                  </div>

                  <div
                    onClick={() => {
                      setSteps({ step1: false, step2: false, step3: true });
                      window.scroll({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="mt-3"
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null} */}
              {/* step 3 */}
              {/* {steps.step3 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <Autocomplete
                      value={schoolData.school_addresses[0].fk_state.state}
                      options={state.map((item) => {
                        return item.fk_state.state;
                      })}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "select_state");
                      }}
                      sx={{ width: 200 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select State *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    />
                    <Autocomplete
                      value={schoolData.school_addresses[0].fk_city.city}
                      options={city.map((item) => {
                        return item.city;
                      })}
                      onChange={(event, newValue) => {
                        handleOrderProcessingForm(newValue, "select_city");
                      }}
                      sx={{ width: 200 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select City *"
                          variant="standard"
                          InputLabelProps={{
                            style: { color: "rgb(243, 244, 246)" },
                          }}
                        />
                      )}
                    />
                    <TextField
                      id="standard-basic"
                      onChange={(e) =>
                        handleOrderProcessingForm(
                          e.target.value,
                          "Enter Address *"
                        )
                      }
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      value={schoolData.school_addresses[0].address}
                      label="Enter Address *"
                      variant="standard"
                    />
                    <TextField
                      id="standard-basic"
                      onChange={(e) =>
                        handleOrderProcessingForm(
                          e.target.value,
                          "Enter Pincode *"
                        )
                      }
                      inputProps={{ style: { color: "white" } }}
                      InputLabelProps={{ style: { color: "white" } }}
                      value={schoolData.school_addresses[0].pin}
                      label="Enter Pincode *"
                      variant="standard"
                    />
                  </div>

                  <div className="mt-3" onClick={formik.handleSubmit}>
                    <BasicButton text={"Update School"} />
                  </div>
                </div>
              ) : null} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSchool;
