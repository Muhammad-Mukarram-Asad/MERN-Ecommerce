import AuthLayout from "./components/auth/layout";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/adminView/layout";
import AdminDashboard from "./pages/adminView/dashboard";
import AdminProducts from "./pages/adminView/products";
import AdminOrders from "./pages/adminView/orders";
import AdminFeatures from "./pages/adminView/features";
import ShoppingLayout from "./components/shoppingView/layout";
import ShoppingHome from "./pages/shoppingView/home";
import ShoppingListing from "./pages/shoppingView/listing";
import ShoppingCheckout from "./pages/shoppingView/checkout";
import ShoppingAccount from "./pages/shoppingView/account";
import ValidateAuthentication from "./components/common/checkAuth";
import NotFoundPage from "./pages/notFound";
import UnAuthenticatedPage from "./pages/unAuth";
import { ToastContainer } from "react-toastify";

function App() {

  // Some Dummy Data:

  let isAuthenticated = false;
  let userInfo = null;
  // let userInfo = {
  //   name: "mukii",
  //   role: "normal",
  //   age: 23
  // };
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ToastContainer />
      {/* Auth Routes */}
      <Routes>
        <Route path="/auth" element={
             <ValidateAuthentication isAuthenticated={isAuthenticated} userInfo={userInfo}>
               <AuthLayout />
             </ValidateAuthentication>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
            <ValidateAuthentication isAuthenticated={isAuthenticated} userInfo={userInfo}>
              <AdminLayout />
            </ValidateAuthentication>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* Shopping Routes */}
        <Route path="/shop" element={
           <ValidateAuthentication isAuthenticated={isAuthenticated} userInfo={userInfo}>
           <ShoppingLayout />
         </ValidateAuthentication>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        {/* Not Found Routes */}
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/unauth-page" element={<UnAuthenticatedPage />} />

      </Routes>
    </div>
  );
}

export default App;
