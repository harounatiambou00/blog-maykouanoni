import links from "../../data/links";
import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import { FiFacebook, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import SmallScreensHamburgerMenuIcon from "../small-screens-menu/SmallScreensHamburgerMenuIcon";
import SmallScreensMenu from "../small-screens-menu/SmallScreensMenu";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks";

const Header = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const [openSmallScreensMenu, setOpenSmallScreensMenu] = React.useState(false);
  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice.user
  );
  return (
    <div className="fixed top-0 left-0 w-full sm:px-10 lg:px-10 bg-white z-40">
      <div className="w-full flex justify-between items-center border-b border-b-primary sm:py-10 lg:py-7">
        <div className="flex justify-between items-center">
          <h1 className="font-megrim font-semibold sm:text-6xl lg:text-3xl bg-white">
            Le Decryptage
          </h1>
        </div>
        <div className="ml-10 justify-between items-center sm:hidden lg:flex bg-white">
          {links.map((link, index) => (
            <div
              key={index}
              className={
                pathname === link.to
                  ? "mr-10 cursor-pointer uppercase text-primary text-xs font-medium"
                  : "mr-10 cursor-pointer uppercase text-gray-400 hover:text-primary text-xs font-light"
              }
              onClick={() => navigate(link.to)}
            >
              {link.title}
            </div>
          ))}
        </div>
        <div className="sm:hidden lg:flex items-center justify-between">
          <IconButton size="small" className="hover:text-primary">
            <FiFacebook />
          </IconButton>
          <IconButton className="ml-3 hover:text-primary" size="small">
            <FiTwitter />
          </IconButton>
          <IconButton className="ml-3 hover:text-primary" size="small">
            <FiLinkedin />
          </IconButton>
          <div className="ml-4">
            {currentUser ? (
              <Avatar
                className="cursor-pointer"
                onClick={() => navigate("/account")}
              />
            ) : (
              <Button
                variant="outlined"
                startIcon={<MdOutlinePersonAddAlt className="text-xl" />}
                className="ml-10 rounded-full font-playwrite font-light normal-case text-md"
                onClick={() => navigate("/sign-in")}
              >
                S'identifier
              </Button>
            )}
          </div>
        </div>

        <div className="sm:flex items-center justify-center lg:hidden h-full">
          <SmallScreensHamburgerMenuIcon
            isOpen={openSmallScreensMenu}
            onClick={() => setOpenSmallScreensMenu(!openSmallScreensMenu)}
            strokeWidth="8"
            lineProps={{ strokeLinecap: "round" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            width="80"
            height="48"
            className="z-50 absolute right-10"
          />
          <SmallScreensMenu
            isOpen={openSmallScreensMenu}
            setOpen={setOpenSmallScreensMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
