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
import AddNewCity from "./Pages/AddNewCity";
import SchoolTagging from "./Pages/SchoolTagging";
import Schools from "./Pages/Schools";
import TagSchool from "./Pages/TagSchool";
import AddSchool from "./Pages/AddSchool";
import SchoolPunchIn from "./Pages/SchoolPunchIn";
import OrderProcessing from "./Pages/OrderProcessing";
// import MyDocument from "./Components/PdfDocument";
import ManageOrder from "./Pages/ManageOrder";
import AOF from "./Pages/AOF";
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
import Projection from "./Pages/Projection";
import Addprojection from "./Pages/Addprojection";
import Return from "./Pages/RETURN/Return";
import ReturnRequest from "./Pages/RETURN/RequestReturn";
import Invoice from "./Pages/Invoice";
import InvoiceItem from "./Pages/InvoiceItem";
import ManageSchoolTraining from "./Pages/ManageSchoolTraining";
import AddSchoolTraining from "./Pages/AddSchoolTraining";
import UpdateSchoolTraining from "./Pages/UpdateSchoolTraining";
import InvoiceTraining from "./Pages/InvoiceTraining";
import Inv from "./Pages/PDF/Inv";
import ViewPdf from "./Pages/ViewPdf";
import AddSchoolQuantity from "./Pages/AddSchoolQuantity";
import ClassklapDashboard from "./Pages/ClassklapDashboard";
import ClassklapManageSchool from "./Pages/ClassklapManageSchool";
import AddSchoolCK from "./Pages/AddSchoolCK";
import LocationTraining from "./Pages/LocationTraining";
import PrintPDF from "./Pages/PrintPDF";
import ViewInvoiceSingle from "./Pages/ViewInvoiceSingle";
import ViewInvoiceDouble from "./Pages/ViewInvoiceDouble";
import BulkInv from "./Pages/PDF/BulkInv";
import CustLedger from "./Pages/PDF/CustLedger";
import ClassklapSchool from "./Pages/ClassklapSchool";
import UpdateSchoolTrainingEU from "./Pages/UpdateSchoolTrainingEU";
function App() {
  const isAuth = useSelector((state) => state.auth.user);
  const MsAuth = useSelector((state) => state.auth.msAuth);

  // const isAuth = true
  // const Admin = useSelector((state) => state.auth.admin);
  const Admin = true;

  return (
    <div>
      <div>
        <div className="!font-Roboto bg-[#111322]">
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={isAuth || MsAuth ? <Home /> : <Login />}
              />
              <Route
                path="/"
                element={isAuth || MsAuth ? <Home /> : <Login />}
              />
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
                path="/manageSchool"
                element={isAuth || MsAuth ? <ManageSchool /> : <Login />}
              />
              <Route
                path="/manageSchoolTraining"
                element={
                  isAuth || MsAuth ? <ManageSchoolTraining /> : <Login />
                }
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
                path="/addschooltraining"
                element={isAuth || MsAuth ? <AddSchoolTraining /> : <Login />}
              />

              <Route
                path="/update_school/:id"
                element={isAuth || MsAuth ? <UpdateSchool /> : <Login />}
              />

              <Route
                path="/update_school_training/:id/:scode"
                element={
                  isAuth || MsAuth ? <UpdateSchoolTraining /> : <Login />
                }
              />

              <Route
                path="/update_school_training_eu/:scid/:stid"
                element={
                  isAuth || MsAuth ? <UpdateSchoolTrainingEU /> : <Login />
                }
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
              <Route
                path="/projection"
                element={isAuth || MsAuth ? <Projection /> : <Login />}
              />
              <Route
                path="/addprojection"
                element={isAuth || MsAuth ? <Addprojection /> : <Login />}
              />

              {/* <Route
            path="/pdf_view"
            element={isAuth || MsAuth ? <MyDocument /> : <Login />}
          /> */}
              <Route
                path="/aof"
                element={isAuth || MsAuth ? <AOF /> : <Login />}
              />
              {/* kys */}
              <Route
                path="/kys"
                element={isAuth || MsAuth ? <KYS /> : <Login />}
              />
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

              <Route
                path="/return"
                element={isAuth || MsAuth ? <Return /> : <Login />}
              />

              <Route
                path="/return_request"
                element={isAuth || MsAuth ? <ReturnRequest /> : <Login />}
              />

              <Route
                path="/invoice"
                element={isAuth || MsAuth ? <Invoice /> : <Login />}
              />

              <Route
                path="/invoice_item/:invoiceid"
                // path="/invoice_item/"
                element={isAuth || MsAuth ? <InvoiceItem /> : <Login />}
              />
              <Route
                path="/addschoolquantity/:invoiceid"
                element={isAuth || MsAuth ? <AddSchoolQuantity /> : <Login />}
              />

              <Route
                path="/invoice_training"
                element={isAuth || MsAuth ? <InvoiceTraining /> : <Login />}
              />

              <Route path="/view_pdf/:docnum/:docdate" element={<ViewPdf />} />

              <Route
                path="/bulkinv_pdf/:bp/:todate/:fromdate"
                element={<BulkInv />}
              />

              <Route
                path="/ck_dashboard"
                element={isAuth || MsAuth ? <ClassklapDashboard /> : <Login />}
              />

              <Route
                path="/ck_manageSchool"
                element={
                  isAuth || MsAuth ? <ClassklapManageSchool /> : <Login />
                }
              />

              <Route
                path="/addschoolck"
                element={isAuth || MsAuth ? <AddSchoolCK /> : <Login />}
              />

              <Route
                path="/locationTraining"
                element={isAuth || MsAuth ? <LocationTraining /> : <Login />}
              />

              <Route
                path="/print_pdf"
                element={isAuth || MsAuth ? <PrintPDF /> : <Login />}
              />

              <Route
                path="/invoice_pdf_single"
                element={isAuth || MsAuth ? <ViewInvoiceSingle /> : <Login />}
              />

              <Route
                path="/invoice_pdf_double"
                element={isAuth || MsAuth ? <ViewInvoiceDouble /> : <Login />}
              />

              <Route
                path="/cust_ledger"
                element={isAuth || MsAuth ? <CustLedger /> : <Login />}
              />

              <Route
                path="/add_new_city"
                element={isAuth || MsAuth ? <AddNewCity /> : <Login />}
              />

              <Route
                path="/ck_school_training"
                element={isAuth || MsAuth ? <ClassklapSchool /> : <Login />}
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
      </div>
    </div>
  );
}

export default App;
