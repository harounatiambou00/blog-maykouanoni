import React from "react";
import { auth } from "../../config/firebase-config";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
const AdminLayout = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!auth.currentUser) {
      navigate("/sign-in");
    }
  }, [auth]);
  return (
    <div className="flex">
      <div className="border-r border-black flex flex-col pt-5">
        <div className="flex">
          <Avatar />
        </div>

        <div className="w-full px-5 mt-5 font-rubik hover:bg-gray-100 bg-opacity-15 cursor-pointer py-2">
          Tableau de bord
        </div>
        <div className="w-full px-5 mt-5 font-rubik hover:bg-gray-100 bg-opacity-15 cursor-pointer py-2">
          Actualites
        </div>
        <div className="w-full mt-5  px-5 font-rubik hover:bg-gray-100 bg-opacity-15 cursor-pointer py-2">
          Messages
        </div>
        <div className="w-full mt-5 px-5 font-rubik bg-red-100 text-red-600 cursor-pointer py-2">
          Se deconnecter
        </div>
      </div>
      <div className="min-h-screen flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
