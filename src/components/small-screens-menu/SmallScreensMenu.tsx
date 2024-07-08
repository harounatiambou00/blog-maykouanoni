import React, { SetStateAction } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, IconButton } from "@mui/material";
import { SlSocialLinkedin } from "react-icons/sl";
import { SiUpwork } from "react-icons/si";
import { TbBrandFiverr } from "react-icons/tb";
import { FiGithub } from "react-icons/fi";
import links from "../../data/links";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";
import { MdOutlinePersonAddAlt } from "react-icons/md";
type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const SmallScreensMenu = ({ isOpen, setOpen }: Props) => {
  const navigate = useNavigate();
  let { pathname } = useLocation();
  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice.user
  );
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-gray-50 origin-top z-40 px-10"
      initial={{ scaleY: 0 }}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { scaleY: 1 },
        closed: { scaleY: 0 },
      }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="h-full flex flex-col items-center justify-center">
        {links.map((link, index) => (
          <div
            key={index}
            className="cursor-pointer w-fit mt-28 overflow-hidden text-center"
          >
            <motion.div
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={{
                closed: { y: "30vh", transition: { duration: 0.5 } },
                open: { y: "0", transition: { duration: 0.7 } },
              }}
              className={
                pathname === link.to
                  ? "font-kalnia font-medium text-7xl uppercase text-primary tracking-wider select-none"
                  : "font-kalnia font-light text-7xl tracking-wider uppercase text-gray-600 select-none"
              }
              onClick={() => {
                setOpen(false);
                navigate(link.to);
              }}
            >
              {link.title}
            </motion.div>
          </div>
        ))}
        {currentUser ? (
          <div className="cursor-pointer w-fit mt-28 overflow-hidden text-center">
            <motion.div
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={{
                closed: { y: "30vh", transition: { duration: 0.5 } },
                open: { y: "0", transition: { duration: 0.7 } },
              }}
              className={
                pathname === "profil"
                  ? "font-kalnia font-medium text-7xl uppercase text-primary tracking-wider select-none"
                  : "font-kalnia font-light text-7xl tracking-wider uppercase text-gray-600 select-none"
              }
              onClick={() => {
                setOpen(false);
                navigate("profil");
              }}
            >
              Profil
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={{
              closed: { y: "30vh", transition: { duration: 0.5 } },
              open: { y: "0", transition: { duration: 0.7 } },
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={
                <MdOutlinePersonAddAlt className="sm:text-6xl lg:text-xl mr-5" />
              }
              className="mt-28 mx-10 rounded-full font-kalnia font-light sm:text-5xl lg:text-md py-5 uppercase"
              onClick={() => {
                navigate("/sign-in");
                setOpen(false);
              }}
            >
              S'identifier
            </Button>
          </motion.div>
        )}
        <div className="overflow-hidden flex items-center justify-center w-full">
          <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={{
              closed: { y: "30vh", transition: { duration: 0.5 } },
              open: { y: "0", transition: { duration: 0.7 } },
            }}
            className="mt-40 flex items-center justify-center w-full"
          >
            <IconButton
              size="small"
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-7xl mr-10"
            >
              <SlSocialLinkedin className="text-gray-600" />
            </IconButton>
            <IconButton
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-7xl mr-10"
            >
              <SiUpwork className="text-gray-600" />
            </IconButton>
            <IconButton
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-7xl mr-10"
            >
              <TbBrandFiverr className="text-gray-600" />
            </IconButton>
            <IconButton
              size="small"
              href=""
              target="_blank"
              rel="noreferrer"
              className="text-7xl"
            >
              <FiGithub className="text-gray-600" />
            </IconButton>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SmallScreensMenu;
