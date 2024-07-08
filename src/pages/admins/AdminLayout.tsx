import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks";

const navigationLinks = [
  {
    text: "Tableau de bord",
    to: "/admin",
  },
  {
    text: "Actualités",
    to: "/admin/news",
  },
  {
    text: "Utilisateurs",
    to: "/admin/users",
  },
  {
    text: "Messages",
    to: "/admin/messages",
  },
] as {
  text: string;
  to: string;
}[];
const NavigationItem = ({
  isActive,
  text,
  to,
}: {
  isActive: boolean;
  text: string;
  to: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={
        isActive
          ? "w-full pl-5 mt-5 font-playwrite text-md font-semibold bg-primary bg-opacity-20 cursor-pointer py-3"
          : "w-full pl-5 mt-5 font-playwrite text-md hover:bg-gray-100 bg-opacity-15 cursor-pointer py-3"
      }
      onClick={() => navigate(to)}
    >
      {text}
    </div>
  );
};

const AdminLayout = () => {
  const navigate = useNavigate();
  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice.user
  );
  let isAdmin = useAppSelector(
    (state: RootState) => state.isAdminSlice.isAdmin
  );
  React.useEffect(() => {
    if (!currentUser || !isAdmin) {
      navigate("/sign-in");
    }
  }, []);
  let { pathname } = useLocation();
  return (
    <div className="flex">
      <div className="flex flex-col bg-gray-50 w-60 pt-10">
        <div className="flex pl-5">
          <Avatar sizes="40x40" />
        </div>
        {navigationLinks.map((link) => (
          <NavigationItem
            isActive={pathname === link.to}
            text={link.text}
            to={link.to}
          />
        ))}
      </div>
      <div className="min-h-screen flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
