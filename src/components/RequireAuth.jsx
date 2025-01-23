import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  //userdata is json here
  //   userData is key, {"message":"Shivani is Logged in successfull","error":false,"data":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhlNDUzZGYxMzAyMjkzN2RhYjJiOGIiLCJpYXQiOjE3Mzc0NDkyMzV9.3-Gq3P0UIJ-sJf-PdoruGrbovBXVYHTpE4sOInQE9Ng","success":true}
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   const accessToken = userData ? userData.data : null;
  //   const accessToken = localStorage.getItem("token");
  //   const accessToken = sessionStorage.getItem("token");
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    if (!accessToken) navigate("/");
  }, [accessToken, navigate]);
  return children; //return the children component ie pages that is accessible after login
};

export default RequireAuth;
