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
import Home from "./pages/notFound/Home";
import UnAuthenticatedPage from "./pages/unAuth";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";

function App() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log("isAuthenticated => ",isAuthenticated,"user => ", user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ToastContainer />
      {/* Auth Routes */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={
             <ValidateAuthentication isAuthenticated={isAuthenticated} userInfo={user}>
               <AuthLayout />
             </ValidateAuthentication>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
            <ValidateAuthentication isAuthenticated={isAuthenticated} userInfo={user}>
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
           <ValidateAuthentication isAuthenticated={isAuthenticated} userInfo={user}>
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
