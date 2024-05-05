import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="px-10">
      <div className="w-full sm:py-10 lg:py-5 border-t border-black flex items-center justify-center">
        <div className="font-playfair text-center sm:text-3xl lg:text-sm text-gray-800">
          Designed & Built by Tiamtech <br />
          &#169; 2024
          <br />
          <br />
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("sign-in")}
          >
            Je suis un administrateur
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
