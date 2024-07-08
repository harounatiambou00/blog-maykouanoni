import React from "react";
import { PiNewspaper } from "react-icons/pi";
import { Button, IconButton } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="relative isolate sm:px-3 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <section className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          {/**<div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div> */}
          <div className="text-center">
            <h1 className="sm:text-7xl lg:text-4xl font-kalnia font-semibold tracking-tight text-gray-900">
              Enquêter, informer et décomplexer les consciences
            </h1>
            <p className="sm:mt-14 lg:mt-6 sm:text-4xl lg:text-lg leading-8 text-gray-600">
              Décryptage est un site libre et indépendant de vulgarisation des
              sujets divers en général. Le site décryptage vise à vulgariser des
              sujets complexes et à rendre moins tabous certains.
            </p>
            <div className="sm:mt-16 lg:mt-10 flex items-center justify-center gap-x-6">
              <Button
                onClick={() => navigate("/news")}
                variant="contained"
                size="large"
                startIcon={<PiNewspaper className="sm:text-6xl lg:text-xl" />}
                className="font-playwrite font-medium normal-case bg-primary sm:text-4xl lg:text-base"
              >
                L'actualite
              </Button>
              <Button
                onClick={() => navigate("/about")}
                variant="outlined"
                className="font-playwrite font-medium normal-case rounded-full sm:text-4xl lg:text-base"
                endIcon={
                  <AiOutlineArrowRight className="sm:text-6xl lg:text-base" />
                }
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </section>
        <section className="">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
            <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
              <h2 className="font-kalnia mb-4 sm:text-6xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Notre equipe
              </h2>
              <p className="font-light text-gray-500 lg:mb-16 sm:text-3xl lg:text-lg dark:text-gray-400">
                sous-titre
              </p>
            </div>
            <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
              <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="Bonnie Avatar"
                  />
                </a>
                <div className="p-5">
                  <h3 className="sm:text-4xl lg:text-lg font-medium font-kalnia tracking-tight text-gray-900 dark:text-white">
                    Abdourahmane Maykouanoni
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400">
                    Titre
                  </span>
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                    description
                  </p>
                  <IconButton></IconButton>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
