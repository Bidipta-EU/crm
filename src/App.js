import { useSelector } from "react-redux";

// Pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
// import MySchool from "./Pages/MySchool";
import Tagging from "./Pages/Tagging";
// import SchoolDirectory from "./Pages/SchoolDirectory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SalesInvoices from "./Pages/SalesInvoice";
// import UpdateStocks from "./Pages/UpdateStocks";
// import Opportunities from "./Pages/Opportunities";
import ManageSchool from "./Pages/ManageSchool";
// import AdminLogin from "./Pages/AdminLogin";
// import AdminHome from "./Pages/AdminHome";
// import AdminSignUp from "./Pages/AdminSignUp";
// import AdminAllUser from "./Pages/AdminAllUser";
// import AdminState from "./Pages/AdminState";
// import AdminCity from "./Pages/AdminCity";
// import AdminCountry from "./Pages/AdminCountry";
import SchoolTagging from "./Pages/SchoolTagging";
import Schools from "./Pages/Schools";
import TagSchool from "./Pages/TagSchool";
import AddSchool from "./Pages/AddSchool";
import SchoolPunchIn from "./Pages/SchoolPunchIn";
import OrderProcessing from "./Pages/OrderProcessing";
// import MyDocument from "./Components/PdfDocument";
import ManageOrder from "./Pages/ManageOrder";
// import AOF from "./Pages/AOF";
import KYS from "./Pages/KYS";
import ReleaseNote from "./Pages/ReleaseNote";
import V_1_0_0 from "./Pages/ReleaseNotes/V.1.0.0";
import UpdateSchool from "./Pages/UpdateSchool";
import Products from "./Pages/KYS/Product";
import AddProduct from "./Pages/KYS/AddProduct";
import Strength from "./Pages/KYS/Strength";
import AddStrength from "./Pages/KYS/AddStrength";
import UpdateFees from "./Pages/KYS/UpdateFees";
import Competition from "./Pages/KYS/Competition";
import AddWorkShop from "./Pages/KYS/AddWorkShop";
import Workshop from "./Pages/KYS/Workshop";
import PageNotFound from "./Pages/PageNotFound";
import Test from "./Pages/Test"
import UpdateTest from "./Pages/UpdateTest";

import Return from './Pages/RETURN/Return'
import ReturnRequest from './Pages/RETURN/RequestReturn'



function App() {
  const isAuth = useSelector((state) => state.auth.user);
  const MsAuth = useSelector((state) => state.auth.msAuth);

  // const isAuth = true
  // const Admin = useSelector((state) => state.auth.admin);
  const Admin = true;

  return (
    <div className=" font-Roboto bg-[#111322]">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={isAuth || MsAuth ? <Home /> : <Login />}
          />
          <Route path="/" element={isAuth || MsAuth ? <Home /> : <Login />} />
          {/* <Route
            path="/mySchool"
            element={isAuth || MsAuth ? <MySchool /> : <Login />}
          /> */}
          <Route
            path="/tagging"
            element={isAuth || MsAuth ? <Tagging /> : <Login />}
          />
          {/* <Route
            path="/schoolDirectory"
            element={isAuth || MsAuth ? <SchoolDirectory /> : <Login />}
          /> */}
          {/* <Route
            path="/salesInvoices"
            element={isAuth || MsAuth ? <SalesInvoices /> : <Login />}
          /> */}
          {/* <Route
            path="/updateStocks"
            element={isAuth || MsAuth ? <UpdateStocks /> : <Login />}
          /> */}
          {/* <Route
            path="/opportunities"
            element={isAuth || MsAuth ? <Opportunities /> : <Login />}
          /> */}


          <Route
            path="/test"
            element={isAuth || MsAuth ? <Test/> : <Login />}
          />

          <Route
            path="/return"
            element={isAuth || MsAuth ? <Return /> : <Login />}
          />


           <Route
            path="/return_request"
            element={isAuth || MsAuth ? <ReturnRequest /> : <Login />}
          />


          <Route
            path="/manageSchool"
            element={isAuth || MsAuth ? <ManageSchool /> : <Login />}
          />
          <Route
            path="/school/tagging"
            element={isAuth || MsAuth ? <SchoolTagging /> : <Login />}
          />
          <Route
            path="/school/schools"
            element={isAuth || MsAuth ? <Schools /> : <Login />}
          />
          <Route
            path="/tagschool"
            element={isAuth || MsAuth ? <TagSchool /> : <Login />}
          />
          <Route
            path="/addschool"
            element={isAuth || MsAuth ? <AddSchool /> : <Login />}
          />
          <Route
            path="/update_school/:id"
            element={isAuth || MsAuth ? <UpdateSchool /> : <Login />}
          />


          <Route
            path="/update_test/:id"
            element={isAuth || MsAuth ? <UpdateTest /> : <Login />}
          />

          <Route
            path="/school/punch_in"
            element={isAuth || MsAuth ? <SchoolPunchIn /> : <Login />}
          />
          <Route
            path="/order_processing"
            element={isAuth || MsAuth ? <OrderProcessing /> : <Login />}
          />
          <Route
            path="/manage_order"
            element={isAuth || MsAuth ? <ManageOrder /> : <Login />}
          />
          {/* <Route
            path="/pdf_view"
            element={isAuth || MsAuth ? <MyDocument /> : <Login />}
          /> */}
          {/* <Route path="/aof" element={isAuth || MsAuth ? <AOF /> : <Login />} /> */}
          {/* kys */}
          <Route path="/kys" element={isAuth || MsAuth ? <KYS /> : <Login />} />
          <Route
            path="/kys/products/:id"
            element={isAuth || MsAuth ? <Products /> : <Login />}
          />
          <Route
            path="/kys/products/add_product/:id"
            element={isAuth || MsAuth ? <AddProduct /> : <Login />}
          />
          <Route
            path="/kys/strength/:id"
            element={isAuth || MsAuth ? <Strength /> : <Login />}
          />
          <Route
            path="/kys/strength/add_strength/:id"
            element={isAuth || MsAuth ? <AddStrength /> : <Login />}
          />
          <Route
            path="/kys/tution_fees/:id"
            element={isAuth || MsAuth ? <UpdateFees /> : <Login />}
          />
          <Route
            path="/kys/add_competition/:id"
            element={isAuth || MsAuth ? <Competition /> : <Login />}
          />
          <Route
            path="/kys/workshop/:id"
            element={isAuth || MsAuth ? <Workshop /> : <Login />}
          />
          <Route
            path="/kys/add_workshop/:id"
            element={isAuth || MsAuth ? <AddWorkShop /> : <Login />}
          />

          <Route
            path="/web-release-notes"
            element={isAuth || MsAuth ? <ReleaseNote /> : <Login />}
          />
          {/* release notes */}

          <Route
            path="/web-release-notes/v_1_0_0"
            element={isAuth || MsAuth ? <V_1_0_0 /> : <Login />}
          />

          {/* Admin */}

          {/* <Route path="/admin/signIn" element={<AdminLogin />} /> */}
          {/* <Route
            path="/admin/home"
            element={Admin ? <AdminHome /> : <Login />}
          /> */}
          {/* <Route
            path="/admin/user/create/new"
            element={Admin ? <AdminSignUp /> : <Login />}
          /> */}
          {/* <Route
            path="/admin/all/user"
            element={Admin ? <AdminAllUser /> : <Login />}
          /> */}
          {/* <Route
            path="/admin/location/state"
            element={Admin ? <AdminState /> : <Login />}
          /> */}
          {/* <Route
            path="/admin/location/city"
            element={Admin ? <AdminCity /> : <Login />}
          />
          <Route
            path="/admin/location/country"
            element={Admin ? <AdminCountry /> : <Login />}
          /> */}
          <Route path="*" element={isAuth ? <PageNotFound /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
