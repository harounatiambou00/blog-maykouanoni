import React from "react";
import { PageLayout } from "../../layouts";
import { BsBuildings } from "react-icons/bs";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { Button, TextField } from "@mui/material";

const ContactMe = () => {
  return (
    <PageLayout title="Contacts">
      <div className="w-full h-screen flex">
        <div className="sm:w-full lg:w-5/12 sm:h-auto lg:h-full sm:pt-0 lg:pt-10 sm:px-10">
          <h1 className="text-6xl font-semibold mb-10 font-playfair">
            Laissez moi un message
          </h1>
          <p className="mb-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
            provident dolore, totam expedita ab temporibus, praesentium beatae
            nostrum corporis repudiandae, iure reprehenderit.
          </p>
          <div className="flex items-center mb-2">
            <BsBuildings className="text-2xl" />
            <span className="ml-2">
              1249 Somewhere ST, Montreal, YYY YYY, Canada
            </span>
          </div>
          <div className="flex items-center mb-2">
            <MdOutlineLocalPhone className="text-2xl" />
            <span className="ml-2">+1 (000)-000-0000</span>
          </div>
          <div className="flex items-center mb-2">
            <MdOutlineEmail className="text-2xl" />
            <span className="ml-2">someone@gmail.com</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 w-7/12 sm:px-10 lg:px-5 sm:mt-10 lg:mt-10 sm:gap-5 lg:gap-5 h-fit">
          <TextField
            fullWidth
            label={<span className="font-rubik">Nom</span>}
            className="font-rubik"
          />
          <TextField
            fullWidth
            label={<span className="font-rubik">Email</span>}
            className="font-rubik"
          />
          <TextField
            fullWidth
            label={<span className="font-rubik">Numero de telephone</span>}
            className="font-rubik"
          />
          <TextField
            fullWidth
            label={<span className="font-rubik">Objet</span>}
            className="font-rubik"
          />
          <TextField
            fullWidth
            multiline
            rows={5}
            label={<span className="font-rubik">Nom</span>}
            className="font-rubik col-span-2"
          />

          <Button
            variant="contained"
            className="font-rubik mt-2 bg-primary w-fit uppercase text-sm"
          >
            Envoyer
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactMe;
