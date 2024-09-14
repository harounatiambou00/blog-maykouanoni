import { ReactNode } from "react";
import {
  FaCheckCircle,
  FaEye,
  FaBalanceScale,
  FaLightbulb,
  FaBrain,
  FaHandsHelping,
} from "react-icons/fa";

type ValueType = {
  label: string;
  description: string;
  icon: ReactNode;
};

const values = [
  {
    label: "Intégrité et Exactitude",
    description:
      "Nous nous engageons à fournir des informations précises et vérifiées. Chaque article est minutieusement recherché et analysé pour garantir que nous relayons des faits fiables, sans compromis.",
    icon: (
      <FaCheckCircle className="inline sm:text-6xl lg:text-2xl text-primary" />
    ),
  },
  {
    label: "Transparence",
    description:
      "Nous croyons en une communication ouverte avec nos lecteurs. Nous révélons nos sources, expliquons nos processus et soyons transparents sur nos pratiques éditoriales pour assurer une confiance mutuelle.",
    icon: <FaEye className="inline sm:text-6xl lg:text-2xl text-primary" />,
  },
  {
    label: "Éthique et Responsabilité",
    description:
      "Nous adhérons à des standards éthiques stricts, en évitant les biais et les conflits d'intérêt. Nous nous efforçons de représenter tous les points de vue de manière équilibrée et respectueuse.",
    icon: (
      <FaBalanceScale className="inline sm:text-6xl lg:text-2xl text-primary" />
    ),
  },
  {
    label: "Engagement envers la Clarté",
    description:
      "Notre mission est de rendre l'information accessible et compréhensible. Nous nous efforçons de présenter les sujets complexes de manière claire et concise, afin de faciliter la compréhension pour tous nos lecteurs.",
    icon: (
      <FaLightbulb className="inline sm:text-6xl lg:text-2xl text-primary" />
    ),
  },
  {
    label: "Innovation et Curiosité",
    description:
      "Nous sommes animés par la curiosité et l'innovation, cherchant constamment à explorer de nouveaux sujets et à adopter des approches créatives pour informer et engager notre audience.",
    icon: <FaBrain className="inline sm:text-6xl lg:text-2xl text-primary" />,
  },
  {
    label: "Respect et Inclusion",
    description:
      "Nous valorisons la diversité des opinions et des expériences. Nous nous engageons à promouvoir un dialogue respectueux et inclusif, en reconnaissant et en célébrant les différences.",
    icon: (
      <FaHandsHelping className="inline sm:text-6xl lg:text-2xl text-primary" />
    ),
  },
] as ValueType[];

const OurValues = () => {
  return (
    <div className="sm:my-40 lg:my-14">
      <h2 className="sm:text-6xl lg:text-4xl font-kalnia font-semibold sm:mb-4 lg:mb-2 text-gray-900">
        Nos valeurs
      </h2>
      <h3 className="font-playwrite sm:text-3xl lg:text-base sm:w-full lg:w-1/2">
        Chez Le Decryptage, nous croyons que l'intégrité, la transparence et
        l'engagement envers l'excellence sont essentiels pour offrir un contenu
        de qualité et digne de confiance.
      </h3>
      <div className="w-full sm:mt-10 lg:mt-7 grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-14 lg:gap-7">
        {values.map((value) => (
          <div key={value.label} className="inline">
            {value.icon}{" "}
            <span className="font-semibold font-kalnia text-primary ml-2 sm:text-4xl lg:text-lg">
              {value.label}.{" "}
            </span>
            <span className="sm:text-3xl lg:text-base">
              {value.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurValues;
