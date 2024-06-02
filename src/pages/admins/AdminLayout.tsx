import React from "react";
import { auth } from "../../config/firebase-config";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
const AdminLayout = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!auth.currentUser) {
      navigate("/sign-in");
    }
  }, [auth]);
  let { pathname } = useLocation();
  return (
    <div className="flex">
      <div className="flex flex-col pt-5">
        <div className="flex">
          <Avatar />
        </div>

        <div
          className={
            pathname === "/admin"
              ? "w-full px-5 mt-5 font-rubik bg-primary bg-opacity-20 cursor-pointer py-2"
              : "w-full px-5 mt-5 font-rubik hover:bg-gray-100 bg-opacity-15 cursor-pointer py-2"
          }
          onClick={() => navigate("/admin")}
        >
          Tableau de bord
        </div>
        <div
          className={
            pathname === "/admin/news"
              ? "w-full px-5 mt-5 font-rubik bg-primary bg-opacity-20 cursor-pointer py-2"
              : "w-full px-5 mt-5 font-rubik hover:bg-gray-100 bg-opacity-15 cursor-pointer py-2"
          }
          onClick={() => navigate("/admin/news")}
        >
          Actualites
        </div>
        <div
          className={
            pathname === "/admin/messages"
              ? "w-full px-5 mt-5 font-rubik bg-primary bg-opacity-20 cursor-pointer py-2"
              : "w-full px-5 mt-5 font-rubik hover:bg-gray-100 bg-opacity-15 cursor-pointer py-2"
          }
        >
          Messages
        </div>
        <div className="w-full mt-40 px-5 font-rubik bg-red-100 text-red-600 cursor-pointer py-2">
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
