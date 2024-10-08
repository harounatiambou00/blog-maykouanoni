import links from "../../data/links";
import { AppBar, Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import { FiFacebook, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import SmallScreensHamburgerMenuIcon from "../small-screens-menu/SmallScreensHamburgerMenuIcon";
import SmallScreensMenu from "../small-screens-menu/SmallScreensMenu";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks";
import ElevationScroll from "../core/elevation_scroll/ElevationScroll";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const Header = (props: Props) => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const [openSmallScreensMenu, setOpenSmallScreensMenu] = React.useState(false);
  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice.user
  );
  return (
    <ElevationScroll {...props}>
      <AppBar className="fixed top-0 left-0 w-full sm:px-10 lg:px-10 z-50">
        <div className="w-full flex justify-between items-center border-b border-b-primary sm:py-10 lg:py-7">
          <div className="flex justify-between items-center">
            <h1 className="font-megrim font-semibold sm:text-6xl lg:text-3xl z-50 text-primary">
              Le Décryptage
            </h1>
          </div>
          <div className="ml-10 justify-between items-center sm:hidden lg:flex z-50">
            {links.map((link, index) => (
              <div
                key={index}
                className={
                  pathname === link.to
                    ? "mr-10 cursor-pointer uppercase text-primary text-xs font-medium z-50"
                    : "mr-10 cursor-pointer uppercase text-gray-400 hover:text-primary text-xs font-light z-40"
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
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
