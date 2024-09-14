import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Box,
} from "@mui/material";

const steps = [
  {
    title: "Recherche et Collecte d’Informations",
    description:
      "Nous utilisons une approche systématique pour recueillir des informations auprès de sources diverses et fiables. Chaque sujet est exploré en profondeur pour garantir une couverture complète et précise.",
  },
  {
    title: "Vérification des Faits",
    description:
      "Nos articles sont soumis à un processus rigoureux de vérification des faits. Nous recoupons les informations avec plusieurs sources indépendantes pour assurer leur exactitude avant publication.",
  },
  {
    title: "Analyse et Rédaction",
    description:
      "Les informations collectées sont analysées par nos experts pour offrir des perspectives éclairées. Nos rédacteurs s’assurent que chaque article est bien structuré et accessible tout en restant informatif.",
  },
  {
    title: "Révision et Édition",
    description:
      "Avant publication, chaque article passe par un processus de révision et d’édition minutieux. Nos éditeurs veillent à ce que le contenu soit exempt d’erreurs et conforme à nos standards de qualité.",
  },
  {
    title: "Publication et Mise à Jour",
    description:
      "Une fois publié, nous continuons à surveiller les nouvelles informations et mettons à jour les articles si nécessaire. Nous nous engageons à maintenir le contenu à jour et pertinent pour nos lecteurs.",
  },
];

const Process = () => {
  return (
    <div className="sm:my-40 lg:my-20">
      <h2 className="sm:text-6xl lg:text-4xl font-kalnia font-semibold sm:mb-4 lg:mb-2 text-gray-900">
        Notre méthodologie
      </h2>
      <h3 className="font-playwrite sm:text-3xl lg:text-base sm:w-full lg:w-1/2">
        Chez Le Decryptage, nous croyons que l'intégrité, la transparence et
        l'engagement envers l'excellence sont essentiels pour offrir un contenu
        de qualité et digne de confiance.
      </h3>
      <div className="sm:mt-10 lg:mt-5 grid sm:grid-cols-1 lg:grid-cols-5 sm:gap-10 lg:gap-5">
        {steps.map((step, index) => (
          <div>
            <div className="flex items-center justify-start">
              <div className="sm:w-20 lg:w-10 sm:h-20 lg:h-10 sm:text-3xl lg:text-base font-kalnia font-normal text-gray-50 rounded-full flex justify-center items-center bg-primary">
                {index + 1}
              </div>
              <div className="font-kalnia font-semibold text-primary sm:ml-5 lg:ml-2 sm:text-4xl lg:text-base">
                {step.title}
              </div>
            </div>
            <div className="font-playwrite sm:pl-24 lg:pl-14 sm:mt-2 sm:text-2xl lg:text-sm">
              {step.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
