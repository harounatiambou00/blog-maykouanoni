import React from "react";

const Landing = () => {
  return (
    <section className="w-full sm:h-auto lg:h-screen flex sm:flex-col lg:flex-row sm:items-center lg:items-center sm:text-center lg:text-left sm:py-40 lg:py-4">
      <div className="sm:w-full lg:w-1/2">
        <h1 className="sm:text-8xl lg:text-5xl font-kalnia font-semibold tracking-tight text-gray-900">
          Explorez 'Le Decryptage' : votre référence pour dévoiler les vérités,
          analyser l'actualité et éveiller les consciences{" "}
        </h1>
        <p className="sm:mt-14 lg:mt-6 sm:text-5xl lg:text-lg leading-8 text-gray-600">
          Bienvenue sur 'Le Decryptage' ! Nous nous engageons à explorer en
          profondeur les vérités cachées et à offrir des analyses claires et
          pertinentes sur une variété de sujets. Notre objectif est de nourrir
          votre curiosité avec des articles captivants couvrant l'économie, la
          politique, les sciences, les sports et plus encore. Découvrez une
          source d'information qui éclaire et inspire, tout en encourageant une
          réflexion critique sur les questions contemporaines.
        </p>
      </div>
      <div className="flex w-1/2 items-center justify-center h-full sm:hidden lg:flex">
        <img
          src={
            "/" +
            process.env.PUBLIC_URL +
            "assets/images/about_us_page_landing_section_image.png"
          }
          alt="logo"
          className="h-3/4"
        />
      </div>
    </section>
  );
};

export default Landing;
