import { IconButton } from "@mui/material";
import React, { ReactNode } from "react";
import { SiLinkedin } from "react-icons/si";

type TeamMemberLinkType = {
  icon: ReactNode;
  url: string;
};
type TeamMember = {
  profilePicture: string;
  firstName: string;
  lastName: string;
  role: string;
  location: string;
  links: TeamMemberLinkType[];
};

const teamMembers = [
  {
    profilePicture:
      "https://img.freepik.com/photos-gratuite/jeune-homme-affaires-africain-costume-chic_1303-18479.jpg?t=st=1726170725~exp=1726174325~hmac=e14a3738e64a7d55ae5d665c54a51dc05fc0fc3cb7abddbf60fc859c5d7cc7a5&w=740",
    firstName: "Abdourahmane",
    lastName: "Maykouanoni",
    role: "Rédacteur en chef",
    location: "Montrél, Canada",
    links: [],
  },
  {
    profilePicture:
      "https://img.freepik.com/photos-gratuite/portrait-homme-affaires-elegant-professionnel_23-2150917258.jpg?t=st=1726169898~exp=1726173498~hmac=04e6c1761ab08afe6aa13367e8d206adf7da90f26e113dedda1778f32a90352b&w=740",
    firstName: "A. Aziz",
    lastName: "Dabougui",
    role: "Directeur Technique",
    location: "Saguenay, Canada",
    links: [
      {
        icon: <SiLinkedin className="text-blue-600" />,
        url: "https://www.linkedin.com/in/abdoul-aziz-mahamadou-dabougui-161b08205",
      },
    ],
  },

  {
    profilePicture:
      "https://img.freepik.com/photos-gratuite/portrait-jeune-femme-affaires-tenant-lunettes-main-fond-gris_23-2148029483.jpg?t=st=1726169941~exp=1726173541~hmac=6a7d21900290d8c47de4a9adc4266f59519c1d15be412f214d80f25abbd7e0ec&w=740",
    firstName: "Leslie",
    lastName: "Alexander",
    role: "Journaliste",
    location: "Toronto, Canada",
    links: [],
  },
] as TeamMember[];

const Team = () => {
  return (
    <div className="sm:my-40 lg:my-20">
      <h2 className="sm:text-6xl lg:text-4xl font-kalnia font-semibold sm:mb-4 lg:mb-2 text-gray-900">
        Rencontrez notre équipe
      </h2>
      <h3 className="font-playwrite sm:text-3xl lg:text-base sm:w-full lg:w-1/2">
        Découvrez les personnes passionnées qui se cachent derrière "Le
        Décryptage". Notre équipe est composée de journalistes, rédacteurs,
        chercheurs et experts engagés à fournir des informations précises et
        pertinentes. Chacun de nos membres apporte une expertise unique et une
        passion pour l'exploration de la vérité.
      </h3>
      <div className="w-full sm:mt-10 lg:mt-7 grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-14 lg:gap-10">
        {teamMembers.map((m, index) => (
          <div key={index} className="flex flex-col">
            <img src={m.profilePicture} className="rounded-xl" />
            <h1 className="font-kalnia text-gray-800 font-medium sm:mt-5 lg:mt-2 sm:text-5xl lg:text-lg">
              {m.firstName + " " + m.lastName}
            </h1>
            <h2 className="text-gray-700 font-semibold sm:mt-5 lg:mt-1 sm:text-4xl lg:text-base">
              {m.role}
            </h2>
            <h3 className="text-gray-500 sm:text-4xl lg:text-base">
              {m.location}
            </h3>
            <div className="mt-5 grid grid-cols-3 items-center justify-center gap-10">
              {m.links.map((l, index) => (
                <div key={index}>
                  <IconButton
                    className="sm:text-6xl lg:text-xl"
                    href={l.url}
                    target="_blank"
                  >
                    {l.icon}
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
