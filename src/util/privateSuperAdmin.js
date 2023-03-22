import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

const PrivateSuperAdmin = () => {
  const [cookies] = useCookies(["auth"]);
  const isAuthenticated = !!cookies.auth;
  console.log(cookies.auth);
  const authCookie = Cookies.get("auth");
  let isSuper = false;
  if (!authCookie) {
  } else {
    try {
      const dataUser = JSON.parse(authCookie);
      console.log(dataUser);
      const token = dataUser.access_token;
      isSuper = dataUser.user.isSuperadmin;
    } catch (error) {
      console.error("Invalid auth cookie:", authCookie);
    }
  }
  return isSuper ? (
    <Outlet />
  ) : (
    <p
      style={{
        height: "700px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#5541D7",
        fontSize: "2rem",
      }}
    >
      Unauthorized
    </p>
  );
};

export default PrivateSuperAdmin;
