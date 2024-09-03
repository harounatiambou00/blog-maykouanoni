import React, { ReactNode } from "react";
import { NewsSubjectsType } from "../../../data/NewsType";
import { BsBank, BsThreeDots } from "react-icons/bs";
import { MdSportsSoccer } from "react-icons/md";
import { GiFizzingFlask } from "react-icons/gi";
import { GoLaw } from "react-icons/go";

const newsSubjects = [
  {
    key: "ECONOMY",
    label: "Économie",
    icon: <BsBank className="sm:text-5xl lg:text-4xl" />,
  },
  {
    key: "POLITIC",
    label: "Politique",
    icon: <GoLaw className="sm:text-5xl lg:text-4xl" />,
  },
  {
    key: "SCIENCE",
    label: "Sciences",
    icon: <GiFizzingFlask className="sm:text-5xl lg:text-4xl" />,
  },
  {
    key: "SPORT",
    label: "Sports",
    icon: <MdSportsSoccer className="sm:text-5xl lg:text-4xl" />,
  },
  {
    key: "OTHERS",
    label: "Autres",
    icon: <BsThreeDots className="sm:text-5xl lg:text-4xl" />,
  },
] as {
  key: NewsSubjectsType;
  label: string;
  icon: ReactNode;
}[];
const SubjectsSection = () => {
  return (
    <div className="relative isolate overflow-hidden bg-secondary py-16 sm:py-24 lg:py-32 rounded-2xl">
      <div className="px-14 lg:px-4 flex flex-col items-center justify-center w-full">
        <h2 className="font-kalnia font-semibold sm:text-6xl lg:text-4xl text-primary">
          Découvrez nos thèmes
        </h2>
        <h3 className="font-playwrite sm:text-3xl lg:text-base sm:mt-5 lg:mt-2 sm:w-3/4 lg:text-11/12 text-center">
          Explorez une sélection de sujets fascinants, conçus pour nourrir votre
          curiosité. Parcourez nos articles classés par thématiques pour une
          expérience de lecture enrichissante.
        </h3>
        <div className="sm:mt-20 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-16 lg:gap-16">
          {newsSubjects.map((s, index) => (
            <div
              key={index}
              className="flex items-center sm:gap-x-5 lg:gap-x-2 sm:text-5xl lg:text-2xl font-medium font-kalnia text-gray-900"
            >
              {s.icon}
              {s.label}
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-green-200 to-primary opacity-30"
        />
      </div>
    </div>
  );
};

export default SubjectsSection;
