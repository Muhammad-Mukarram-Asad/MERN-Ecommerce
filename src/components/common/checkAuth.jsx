import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const ValidateAuthentication = ({ isAuthenticated, userInfo, children }) => {
  const location = useLocation();
  console.log("props => ", isAuthenticated, userInfo);

//   Below is the scenario related to that if user is not authenticated and tries to go to any other route except /auth/login or /auth/register.
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

//   Below is the scenario related to that if user is authenticated and he/she is admin and tries to go to any shop related route then we have to redirect him/her to admin dashboard.
//  Similarly if user is authenticated and he/she is not admin and tries to go to any admin related route then we have to redirect him/her to shop page.
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (userInfo?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    userInfo?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (
    isAuthenticated &&
    userInfo?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  return children;
};

export default ValidateAuthentication;
