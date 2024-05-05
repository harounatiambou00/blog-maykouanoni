import React from "react";
import { auth } from "../../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!auth.currentUser) {
      navigate("/sign-in");
    }
  }, [auth]);

  return <div className="flex"></div>;
};

export default Dashboard;
