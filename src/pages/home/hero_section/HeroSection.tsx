import React from "react";
import { PiNewspaper } from "react-icons/pi";
import { Button, IconButton } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full sm:h-auto lg:h-screen flex sm:flex-col lg:flex-row sm:items-center lg:items-center sm:text-center lg:text-left sm:py-40 lg:py-4">
      {/**<div className="hidden sm:mb-8 sm:flex sm:justify-center">
    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
      Announcing our next round of funding.{" "}
      <a href="#" className="font-semibold text-indigo-600">
        <span aria-hidden="true" className="absolute inset-0" />
        Read more <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  </div> */}
      <div className="sm:w-full lg:w-1/2">
        <h1 className="sm:text-8xl lg:text-5xl font-kalnia font-semibold tracking-tight text-gray-900">
          Enquêter, informer et décomplexer les consciences
        </h1>
        <p className="sm:mt-14 lg:mt-6 sm:text-5xl lg:text-lg leading-8 text-gray-600">
          Décryptage est un site libre et indépendant de vulgarisation des
          sujets divers en général. Le site décryptage vise à vulgariser des
          sujets complexes et à rendre moins tabous certains.
        </p>
        <div className="sm:mt-16 lg:mt-10 flex items-center sm:justify-center lg:justify-start sm:gap-x-10 lg:gap-x-6">
          <Button
            onClick={() => navigate("/news")}
            variant="contained"
            size="large"
            startIcon={<PiNewspaper className="sm:text-6xl lg:text-xl" />}
            className="font-playwrite font-medium normal-case bg-primary sm:text-4xl lg:text-base rounded-full sm:py-8 lg:py-2 sm:px-8 lg:px-4"
          >
            L'actualite
          </Button>
          <Button
            onClick={() => navigate("/about")}
            variant="outlined"
            className="font-playwrite font-medium normal-case rounded-full sm:text-4xl lg:text-base sm:py-8 lg:py-2 sm:px-8 lg:px-4"
            endIcon={
              <AiOutlineArrowRight className="sm:text-4xl lg:text-base" />
            }
          >
            En savoir plus
          </Button>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center h-full sm:hidden lg:flex">
        <img
          src={
            "/" + process.env.PUBLIC_URL + "assets/images/hero_section_img.png"
          }
          alt="logo"
          className="h-3/4"
          onClick={() => navigate("/")}
        />
      </div>
    </section>
  );
};

export default HeroSection;
