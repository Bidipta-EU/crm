import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import BasicButton from "../../Components/Material/Button";
// import SearchDropDown from "../../Components/SearchDropDown";
import instance from "../../Instance";
import Cookies from "js-cookie";
import {
  Autocomplete,
  Backdrop,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import RowRadioButtonsGroup from "../../Components/Material/RowRadioButtonGroup";
import BasicTextFields from "../../Components/Material/TextField";
import { useFormik } from "formik";
import Snackbars from "../../Components/Material/SnackBar";
import SearchDropDown from "../../Components/SearchDropDown";

const AddStrength = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [group, setGroups] = useState([]);
  const [individual, setIndividual] = useState([]);
  const [showP, setShowP] = useState({ group: true, individual: false });
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);

  const sidebarRef = useRef();
  const { id } = useParams();
  const show = null;

  const snackbarRef = useRef();

  const formik = useFormik({
    initialValues: {
      data: [],
      strength: "",
    },
    validate: () => {
      const errors = {};

      return errors;
    },
    onSubmit: async (values) => {
      if (values.data.length === 0 || !values.strength) {
        setSnackbarErrStatus(true);
        setErrMessage(
          values.data.length === 0 ? "Please Select Class" : "Enter Strength"
        );
        snackbarRef.current.openSnackbar();
      } else {
        setLoading(true);
        const res = await instance({
          url: `school/kys/strength/create/${id}`,
          method: "POST",
          data: {
            data: [
              {
                fk_class_id: values.data[0].fk_class_id,
                strength: values.strength,
              },
            ],
          },
          headers: {
            Authorization: `${Cookies.get("accessToken")}`,
          },
        });

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
              window.location.replace(`/kys/strength/${id}`);
            }, 100);
          }, 1500);
        } else {
          setSnackbarErrStatus(true);
          setErrMessage(res.data.message);
          snackbarRef.current.openSnackbar();
        }
        setLoading(false);
      }
      //   console.log(res.data);
    },
  });

  //     initialValues: {
  //       gradeId: "",
  //       subjectId: "",
  //       seriesId: "",
  //       remarks: "",
  //       category: "curriculum",
  //       products: [],
  //     },
  //     validate: () => {
  //       const errors = {};

  //       return errors;
  //     },
  //     onSubmit: async (values) => {
  //       if (Curriculumformik.values.products.length === 0) {
  //         setSnackbarErrStatus(true);
  //         setErrMessage("Please Add Products");
  //         snackbarRef.current.openSnackbar();
  //       } else {
  //         setLoading(true);
  //         const res = await instance({
  //           url: `school/kys/products/create/${id}`,
  //           method: "POST",
  //           data: {
  //             fk_grade_id: values.gradeId,
  //             fk_subject_id: values.subjectId,
  //             fk_series_id: values.seriesId,
  //             remarks: values.remarks,
  //             category: values.category,
  //             products: values.products,
  //           },
  //           headers: {
  //             Authorization: `${Cookies.get("accessToken")}`,
  //           },
  //         });
  //         console.log(res.data);
  //         if (res.data.status === "success") {
  //           setSnackbarErrStatus(false);
  //           setErrMessage(res.data.message);
  //           snackbarRef.current.openSnackbar();
  //           setTimeout(() => {
  //             window.scroll({
  //               top: 0,
  //               // behavior: "smooth",
  //             });
  //             setTimeout(() => {
  //               window.location.reload();
  //             }, 100);
  //           }, 1500);
  //         } else {
  //           setSnackbarErrStatus(true);
  //           setErrMessage(res.data.message);
  //           snackbarRef.current.openSnackbar();
  //         }
  //         setLoading(false);
  //       }
  //     },
  //   });

  const handleRadioButtons = (type, value) => {
    formik.values.data = [];
    formik.values.strength = "";
    if (value === "Group") {
      setShowP({ group: true, individual: false });
    } else {
      setShowP({ group: false, individual: true });
    }
  };

  const navInfo = {
    title: "Add Strength",
    details: ["Home", "/Add Strength"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  //   const handleSubmit = () => {
  //     if (showP.digital) {
  //       Digitalformik.handleSubmit();
  //     } else {
  //       Curriculumformik.handleSubmit();
  //     }
  //   };

  useLayoutEffect(() => {
    const getGroups = async () => {
      const groups = await instance({
        url: "school/kys/classes/group",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setGroups(groups.data.message);
    };
    const getIndividual = async () => {
      const individual = await instance({
        url: "school/kys/classes/individuals",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setIndividual(individual.data.message);
    };

    getGroups();
    getIndividual();
  }, []);

  const handleOrderProcessingForm = (value, type) => {
    // console.log(value, type);
    switch (type) {
      case "group":
        formik.values.data = [];

        formik.values.data.push({ fk_class_id: value.id });
        break;
      case "individual":
        formik.values.data = [];

        const item = individual.find((item) => item.name === value);
        formik.values.data.push({ fk_class_id: item.id });
        break;
      case "Strength":
        formik.values.strength = value;
        break;

      default:
        break;
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
              <h1 className="text-gray-100 text-lg">Add Strength</h1>
            </div>

            <div className="w-full flex flex-col text-gray-100 gap-4  items-center mt-[7rem]">
              <div className="flex flex-col gap-4 items-start sm:w-[75%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                <h1 className="text-gray-100 md:text-xl text-base font-semibold">
                  Select The Strength Type
                </h1>
                <div className="w-full flex justify-center gap-4">
                  <RowRadioButtonsGroup
                    name={"addProduct"}
                    value={[
                      { label: "Group", value: "Group" },
                      { label: "Individual", value: "Individual" },
                    ]}
                    handleRadioButtons={handleRadioButtons}
                    defaultValue={"Group"}
                  />
                </div>

                {showP.group ? (
                  <div className="w-full flex justify-center">
                    <div className="w-full grid sm:grid-cols-2 sm:grid-rows-1 grid-cols-1 grid-rows-2 gap-6">
                      <SearchDropDown
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        data={group}
                        Name={"group"}
                        label={"Select Group"}
                        color={"rgb(243, 244, 246)"}
                      />
                      <BasicTextFields
                        lable={"Strength"}
                        // multiline={true}
                        type={"number"}
                        variant={"standard"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex justify-center">
                    <div className="w-full grid sm:grid-cols-2 sm:grid-rows-1 grid-cols-1 grid-rows-2 gap-6">
                      <Autocomplete
                        options={individual.map((item) => {
                          return item.name;
                        })}
                        onChange={(event, newValue) => {
                          handleOrderProcessingForm(newValue, "individual");
                        }}
                        sx={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Individual"
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
                          handleOrderProcessingForm(e.target.value, "Strength")
                        }
                        inputProps={{ style: { color: "white" } }}
                        InputLabelProps={{ style: { color: "white" } }}
                        label="Strength"
                        type={"number"}
                        variant="standard"
                      />
                    </div>
                  </div>
                )}

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

export default AddStrength;
