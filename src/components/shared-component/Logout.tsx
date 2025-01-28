import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out successful! Redirecting to login...", {
      position: "top-right",
    });
    setTimeout(() => {
      navigate("/login"); // Redirect to login page after successful registration
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
