import { Button } from "@mui/material";
import React, { ReactNode } from "react";
import { CiBookmark, CiLogout, CiSettings, CiUser } from "react-icons/ci";
import { TbHelp } from "react-icons/tb";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";
import { setIsAdmin } from "../../redux/slices/isAdminSlice";
import { RootState } from "../../redux/store";

type AccountLinkType = {
  name: string;
  to: string;
  title: string;
  icon: ReactNode;
};

const accountLinks = [
  {
    name: "personal_info",
    to: "/account",
    title: "Informations personnelles",
    icon: <CiUser className="sm:text-6xl lg:text-2xl" />,
  },
  {
    name: "saved_articles",
    to: "/account/saved_articles",
    title: "Articles sauvegardes",
    icon: <CiBookmark className="sm:text-6xl lg:text-2xl" />,
  },
  {
    name: "settings",
    to: "/account/settings",
    title: "Parametres",
    icon: <CiSettings className="sm:text-6xl lg:text-2xl" />,
  },
  {
    name: "help",
    to: "/account/help",
    title: "Aide",
    icon: <TbHelp className="sm:text-6xl lg:text-2xl" />,
  },
] as AccountLinkType[];
const Account = () => {
  let { pathname } = useLocation();
  const [activeLink, setActiveLink] = React.useState("");
  const navigate = useNavigate();
  React.useEffect(() => {
    let activeLinkItem = accountLinks.find((l) => l.to === pathname);
    if (activeLinkItem) {
      setActiveLink(activeLinkItem.name);
    } else {
      setActiveLink("/account");
    }
  }, [pathname]);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(setCurrentUser({ user: undefined }));
    dispatch(setIsAdmin({ isAdmin: false }));
  };

  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice.user
  );
  React.useEffect(() => {
    if (currentUser === undefined) {
      navigate("/sign-in");
    }
  }, [currentUser]);
  return (
    <div className="min-h-screen py-10 grid grid-cols-12 gap-10">
      <div className="h-full sm:col-span-2 lg:col-span-3  flex flex-col sm:justify-start lg:justify-between items-start pb-10">
        <div className="pl-3 pt-3 w-full ">
          {accountLinks.map((l) => (
            <div
              key={l.name}
              className={
                activeLink === l.name
                  ? "sm:mb-7 lg:mb-3 sm:rounded-lg lg:rounded-none w-full flex items-center sm:p-5 lg:p-2 sm:text-md font-kalnia font-normal cursor-pointer text-primary bg-green-50 tracking-wide"
                  : "sm:mb-7 lg:mb-3 sm:rounded-lg lg:rounded-none w-full flex items-center sm:p-5 lg:p-2 text-md font-kalnia font-light cursor-pointer text-gray-500 hover:text-primary tracking-wide"
              }
              onClick={() => navigate(l.to)}
            >
              {l.icon}
              <div className="ml-3 sm:hidden lg:block">{l.title}</div>
            </div>
          ))}
        </div>
        <Button
          color="error"
          className="rounded-non font-playwrite normal-case sm:hidden lg:flex"
          variant="outlined"
          fullWidth
          startIcon={<CiLogout />}
          onClick={logout}
        >
          Se deconnecter
        </Button>
        <div className="flex justify-center w-full mt-5">
          <Button
            color="error"
            className="rounded-non font-playwrite normal-case sm:block lg:hidden bg-red-600"
            variant="contained"
            onClick={logout}
          >
            <CiLogout className="text-6xl" />
          </Button>
        </div>
      </div>
      <div className="h-full sm:col-span-10 lg:col-span-9">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
