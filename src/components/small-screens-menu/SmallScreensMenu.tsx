import React, { SetStateAction } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { SlSocialLinkedin } from "react-icons/sl";
import { SiUpwork } from "react-icons/si";
import { TbBrandFiverr } from "react-icons/tb";
import { FiGithub } from "react-icons/fi";
import links from "../../data/links";
type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const SmallScreensMenu = ({ isOpen, setOpen }: Props) => {
  const navigate = useNavigate();
  let { pathname } = useLocation();
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-white origin-top z-40"
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
            className="cursor-pointer w-fit mt-20 overflow-hidden text-center"
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
                  ? "font-playfair font-medium text-7xl uppercase text-primary tracking-wider select-none"
                  : "font-playfair font-normal text-7xl tracking-wider uppercase text-gray-700 select-none"
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
