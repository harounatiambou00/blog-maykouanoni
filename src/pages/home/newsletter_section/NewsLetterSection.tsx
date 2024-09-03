import { Button } from "@mui/material";
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { TbHandStop } from "react-icons/tb";

const NewsLetterSection = () => {
  const [email, setEmail] = React.useState("");

  return (
    <div className="relative isolate overflow-hidden bg-primary py-16 sm:py-24 lg:py-32 rounded-2xl">
      <div className="px-14 lg:px-8">
        <div className=" grid grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="sm:pr-0 lg:pr-8">
            <h2 className="lg:text-3xl font-kalnia font-medium tracking-tight text-white sm:text-6xl">
              Inscrivez-vous à notre Newsletter.
            </h2>
            <p className="mt-4 sm:text-3xl lg:text-lg leading-8 text-gray-300">
              Recevez chaque semaine dans votre boîte de réception une sélection
              d'articles enrichissants et pertinents. Nous nous engageons à vous
              offrir uniquement du contenu de qualité, sans jamais vous envoyer
              de spam.
            </p>
            <div className="sm:mt-14 lg:mt-6 flex gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Adresse email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Entrez votre email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 sm:px-6 lg:px-3.5 sm:py-4 lg:py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-lg lg:text-sm sm:placeholder:text-lg lg:placeholder:text-sm sm:leading-6"
              />
              <Button
                variant="contained"
                className="font-kalnia normal-case rounded-md text-primary bg-secondary sm:text-3xl lg:text-base"
                size="large"
              >
                S'inscrire
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-1 sm:gap-x-4 lg:gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 sm:p-5 lg:p-2 ring-1 ring-white/10">
                <IoCalendarOutline
                  aria-hidden="true"
                  className="sm:text-5xl lg:text-base text-white"
                />
              </div>
              <dt className="mt-4 font-semibold text-white sm:text-3xl lg:text-base">
                Articles hebdomadaires
              </dt>
              <dd className="mt-2 leading-7 text-gray-300 sm:text-xl lg:text-sm">
                Recevez des articles chaque semaine directement dans votre boîte
                de réception.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 sm:p-5 lg:p-2  ring-1 ring-white/10">
                <TbHandStop
                  aria-hidden="true"
                  className="sm:text-5xl lg:text-base text-white"
                />
              </div>
              <dt className="mt-4 font-semibold text-white sm:text-3xl lg:text-base">
                Pas de spam
              </dt>
              <dd className="mt-2 leading-7 text-gray-300 sm:text-xl lg:text-sm">
                Nous respectons votre vie privée. Pas de spam, uniquement du
                contenu de qualité.
              </dd>
            </div>
          </dl>
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
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-secondary to-green-500 opacity-30"
        />
      </div>
    </div>
  );
};

export default NewsLetterSection;
