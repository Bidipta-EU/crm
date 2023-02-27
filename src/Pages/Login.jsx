import React, { useRef, useState } from "react";
import loginBg from "../assets/img/register_bg_2.png";
import Logo from "../assets/img/logo.png";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import instance from "../Instance";

// loading button
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Snackbars from "../Components/Material/SnackBar";

import { loginRequest, msalConfig } from "../util/msConfig";
import { msalInstance } from "../index";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const snackbarRef = useRef();
  let accountId = "";

  function handleResponse(resp) {
    if (resp !== null) {
      accountId = resp.account.homeAccountId;
      console.log(accountId);
      Cookies.set("ms-auth", accountId);
      if (accountId) {
        dispatch(authActions.msLogin());
      }
      // showWelcomeMessage(resp.account);
      // seeProfileRedirect();
    } else {
      // need to call getAccount here?
      const currentAccounts = msalInstance.getAllAccounts();
      if (!currentAccounts || currentAccounts.length < 1) {
      } else if (currentAccounts.length > 1) {
        // Add choose account code here
      } else if (currentAccounts.length === 1) {
        accountId = currentAccounts[0].homeAccountId;
      }
    }
  }

  const authLogin = async (req, res) => {
    msalInstance
      .loginPopup({ loginRequest })
      .then(handleResponse)
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await instance({
      url: "auth/signin",
      method: "post",
      data: {
        empCode: email,
        password: password,
      },
    });

    console.log(res.data);
    if (res.data.id && res.data.accessToken) {
      Cookies.set(
        "user",
        `id: ${res.data.id}, accessToken: ${res.data.accessToken}`
      );
      Cookies.set("id", `${res.data.id}`);
      Cookies.set("accessToken", `${res.data.accessToken}`);
      Cookies.set("type", `${res.data.type}`);
      Cookies.set("company", `${res.data.company}`)
      if (res.data.admin) {
        Cookies.set("admin", true);
        dispatch(authActions.adminLogin());
      }
      
      dispatch(authActions.login());

      if(res.data.type === "training" && res.data.company === "Euphues"){
        navigate("/manageSchoolTraining");
        console.log("testing1")
      }
      // else if(res.data.type === "training" && res.data.company === "Classklap"){
      //   navigate("/ck_dashboard");
      //   console.log("testing2")
      // }
      // else if(res.data.company === "Euphues"){
        // navigate("/ck_dashboard");
        // console.log("testing2")
      // }
      else{
        navigate("/");
        console.log("testing3")
      }
      
    }
    if (res.data.message) {
      setErrMessage(res.data.message);
      snackbarRef.current.openSnackbar();
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="w-[100vw] h-[100vh] pt-[5rem] bg-[rgba(30,41,59)] bg-cover"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="container mx-auto px-4">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <img src={Logo} className=" object-cover" alt="" />
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <Snackbars
                    snackbarErrStatus={true}
                    ref={snackbarRef}
                    errMessage={errMessage}
                  />
                  <form onSubmit={handleLogin}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Emp. Code
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Emp. Code"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {/* <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="border-0 rounded-lg text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />

                        <span className="ml-2 text-sm font-semibold text-gray-600">
                          Remember me
                        </span>
                        <span className="ml-16 text-sm font-semibold text-gray-600 cursor-pointer">
                          Forgot Password?
                        </span>
                      </label>
                    </div> */}
                    <Stack direction="row" spacing={2}>
                      <LoadingButton
                        loading={loading}
                        onClick={handleLogin}
                        type="submit"
                        style={{
                          backgroundColor: "rgb(31 41 55)",
                          width: "100%",
                          height: "2.5rem",
                          color: "white",
                          fontWeight: "600",
                          marginTop: "1.5rem",
                        }}
                        variant="outlined"
                      >
                        {loading ? "" : "SIGN IN"}
                      </LoadingButton>
                      {/* <LoadingButton
                        onClick={authLogin}
                        type="button"
                        style={{
                          backgroundColor: "rgb(31 41 55)",
                          width: "100%",
                          height: "2.5rem",
                          color: "white",
                          fontWeight: "600",
                          marginTop: "1.5rem",
                        }}
                        variant="outlined"
                      >
                        {"Atuh"}
                      </LoadingButton> */}
                    </Stack>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
