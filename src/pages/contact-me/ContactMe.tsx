import React from "react";
import { PageLayout } from "../../layouts";
import { BsBuildings, BsSend } from "react-icons/bs";
import { MdOutlineLocalPhone, MdSend } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import {
  Alert,
  Button,
  OutlinedInput,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
} from "@mui/material";
import { firestore } from "../../config/firebase-config";
import { addDoc, collection } from "firebase/firestore";
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const ContactMe = () => {
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    object: "",
    message: "",
  });
  const [openMessageSentSnackbar, setOpenMessageSentSnackbar] =
    React.useState(false);
  const handleSubmit = async () => {
    try {
      await addDoc(collection(firestore, "messages"), {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        object: values.object,
        message: values.message,
        timestamp: new Date(),
      });
      setOpenMessageSentSnackbar(true);
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        object: "",
        message: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message : ", error);
    }
  };

  return (
    <PageLayout title="Contacts">
      <div className="w-full h-screen flex sm:flex-col lg:flex-row">
        <div className="sm:w-full lg:w-5/12 sm:h-auto lg:h-full sm:pt-16 lg:pt-10 sm:px-10">
          <h1 className="sm:text-6xl lg:text-4xl font-medium mb-10 font-kalnia">
            Laissez nous un message
          </h1>
          <p className="sm:mb-10 lg:mb-5 sm:text-3xl lg:text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
            provident dolore, totam expedita ab temporibus, praesentium beatae
            nostrum corporis repudiandae, iure reprehenderit.
          </p>
          <div className="flex items-center sm:mb-5 lg:mb-2">
            <BsBuildings className="sm:text-6xl lg:text-2xl" />
            <span className="ml-2 sm:text-3xl lg:text-base">
              1249 Somewhere ST, Montreal, YYY YYY, Canada
            </span>
          </div>
          <div className="flex items-center sm:mb-5 lg:mb-2">
            <MdOutlineLocalPhone className="sm:text-6xl lg:text-2xl" />
            <span className="ml-2 sm:text-3xl lg:text-base">
              +1 (000)-000-0000
            </span>
          </div>
          <div className="flex items-center sm:mb-5 lg:mb-2">
            <MdOutlineEmail className="sm:text-6xl lg:text-2xl" />
            <span className="ml-2 sm:text-3xl lg:text-base">
              journaliinc.ca@gmail.com
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:w-full lg:w-7/12 sm:px-10 lg:px-5 sm:mt-10 lg:mt-10 sm:gap-5 lg:gap-5 h-fit">
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Prénom
            </label>
            <OutlinedInput
              value={values.firstName}
              onChange={(e) =>
                setValues({ ...values, firstName: e.target.value })
              }
              type="text"
              placeholder="Votre prénom"
              className="rounded-lg sm:py-4 lg:py-0 pl-2 font-playwrite font-light sm:text-4xl lg:text-base placeholder:font-playwrite"
            />
          </div>
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Nom
            </label>
            <OutlinedInput
              value={values.lastName}
              onChange={(e) =>
                setValues({ ...values, lastName: e.target.value })
              }
              type="text"
              placeholder="Votre nom"
              className="rounded-lg sm:py-4 lg:py-0 pl-2 font-playwrite font-light sm:text-4xl lg:text-base placeholder:font-playwrite"
            />
          </div>
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Email
            </label>
            <OutlinedInput
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              type="text"
              placeholder="Votre email"
              className="rounded-lg sm:py-4 lg:py-0 pl-2 font-playwrite font-light sm:text-4xl lg:text-base placeholder:font-playwrite"
            />
          </div>
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Numero de telephone
            </label>
            <OutlinedInput
              value={values.phoneNumber}
              onChange={(e) =>
                setValues({ ...values, phoneNumber: e.target.value })
              }
              type="text"
              placeholder="Votre numéro de téléphone"
              className="rounded-lg sm:py-4 lg:py-0 pl-2 font-playwrite font-light sm:text-4xl lg:text-base placeholder:font-playwrite"
            />
          </div>
          <div className="flex flex-col sm:col-span-2 lg:col-span-2">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Objet
            </label>
            <OutlinedInput
              value={values.object}
              onChange={(e) => setValues({ ...values, object: e.target.value })}
              type="text"
              placeholder="Objet de votre message"
              className="rounded-lg sm:py-4 lg:py-0 pl-2 font-playwrite font-light sm:text-4xl lg:text-base placeholder:font-playwrite"
            />
          </div>
          <div className="flex flex-col sm:col-span-2 lg:col-span-2">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Message
            </label>
            <OutlinedInput
              value={values.message}
              onChange={(e) =>
                setValues({ ...values, message: e.target.value })
              }
              type="text"
              multiline
              rows={5}
              placeholder="Votre message"
              className="rounded-lg sm:py-4 lg:py-0 pl-2 font-playwrite font-light sm:text-4xl lg:text-base placeholder:font-playwrite"
            />
          </div>
          <Button
            variant="contained"
            className="font-playwrite sm:mt-4 lg:mt-2 bg-primary w-fit normal-case sm:text-4xl lg:text-base"
            size="large"
            startIcon={<BsSend />}
            onClick={handleSubmit}
          >
            Envoyer
          </Button>
          <Snackbar
            open={openMessageSentSnackbar}
            TransitionComponent={SlideTransition}
          >
            <Alert>Votre message a ete envoye avec succes.</Alert>
          </Snackbar>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactMe;
