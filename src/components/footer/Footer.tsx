import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";

const Footer = () => {
  const navigate = useNavigate();
  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice.user
  );
  let isAdmin = useAppSelector(
    (state: RootState) => state.isAdminSlice.isAdmin
  );

  return (
    <footer className="bg-whiteborder-t border-black w-full">
      <div className="w-full max-w-screen-xl mx-auto sm:px-10 lg:px-4 sm:py-28 lg:py-8">
        <div className="sm:flex sm:flex-col lg:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse cursor-pointer">
            <span className="self-center  sm:text-7xl lg:text-3xl font-kalnia font-semibold whitespace-nowrap">
              Le Decryptage
            </span>
          </div>
          <div className="sm:text-4xl lg:text-base sm:mt-14 lg:mt-0 flex justify-center flex-wrap items-center text-sm font-light text-gray-500 sm:mb-0 z-50">
            <li className="sm:py-5 lg:py-0">
              <a href="#" className="hover:underline me-4 md:me-6 ">
                À propos
              </a>
            </li>
            <li className="sm:py-5 lg:py-0">
              <a
                href="#"
                className="hover:underline me-4 md:me-6 sm:py-5 lg:py-0"
              >
                Politique de confidentialité
              </a>
            </li>

            <li className="sm:py-5 lg:py-0">
              <a
                href="#"
                className="hover:underline me-4 md:me-6 sm:py-5 lg:py-0"
              >
                Contact
              </a>
            </li>
            {currentUser && isAdmin && (
              <li className="sm:py-5 lg:py-0">
                <button
                  className="hover:underline"
                  onClick={() => navigate("admin")}
                >
                  Portail administrateur
                </button>
              </li>
            )}
          </div>
        </div>
        <hr className="sm:my-20 lg:my-8 border-gray-200 sm:mx-auto" />
        <span className="block  text-gray-500 sm:text-center  sm:text-3xl lg:text-sm">
          © 2024{" "}
          <a href="#" className="hover:underline">
            Le Decryptage™
          </a>
          . Tous droits réservés.
        </span>
        <span className="mt-2 block text-gray-500 sm:text-center sm:text-3xl lg:text-sm">
          Développé par{" "}
          <a href="#" className="hover:underline">
            TiamTech
          </a>
          .
        </span>
      </div>
    </footer>
  );
};

export default Footer;
