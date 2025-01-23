import { logout } from "@/redux/feature/authLoginSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    dispatch(logout());
    navigate("/authLogin");
  }, [navigate, dispatch]);
  return null; //no ui needed
};

export default Logout;
