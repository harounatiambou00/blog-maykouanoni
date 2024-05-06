import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  TextField,
} from "@mui/material";
import React from "react";
import {
  AiFillPlusCircle,
  AiOutlineArrowDown,
  AiOutlinePlus,
  AiOutlineSave,
  AiTwotonePicture,
} from "react-icons/ai";
import { BsFillSave2Fill, BsTrash } from "react-icons/bs";
import { MdClose, MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import { TiptapTextEditor } from "../../../../components/core";
import { firestore, storage } from "../../../../config/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type SectionType = {
  title: string;
  content: string;
};
const AddNewsDialog = ({ open, setOpen }: Props) => {
  const [values, setValues] = React.useState({
    title: "",
    subtitle: "",
    author: "",
    description: "",
    imageName: "",
  });
  const [currentSectionToBeAddedContent, setCurrentSectionToBeAdded] =
    React.useState<SectionType | null>(null);

  const [sections, setSections] = React.useState<SectionType[]>([]);
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const [newsImage, setNewsImage] = React.useState<File | null>(null);
  const [newsImageBase64, setNewsImageBase64] = React.useState<string | null>(
    null
  );

  const handleSave = async () => {
    //Adding the image
    let generatedFileName = undefined;
    if (newsImage) {
      generatedFileName = newsImage.name + v4();
      let imageRef = ref(storage, generatedFileName);
      let addingImageResponse = await uploadBytes(imageRef, newsImage);
    }

    try {
      const docRef = await addDoc(collection(firestore, "news"), {
        title: values.title,
        description: values.description,
        subtitle: values.subtitle,
        author: values.author,
        imageName: generatedFileName ? generatedFileName : "",
        publicationDate:
          new Date().getDay().toString() +
          new Date().getMonth().toString() +
          new Date().getFullYear().toString(),
        lastModificationDate:
          new Date().getDay().toString() +
          new Date().getMonth().toString() +
          new Date().getFullYear().toString(),
        sections: sections,
      });
      setSections([]);
      setCurrentSectionToBeAdded(null);
      setNewsImageBase64(null);
      setNewsImage(null);
      setValues({
        title: "",
        subtitle: "",
        author: "",
        description: "",
        imageName: "",
      });
      setOpen(false);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen
      className="overflow-y-scroll py-20"
    >
      <div className="bg-white w-full h-20 fixed z-20 flex justify-between items-center left-0 top-0 border-b px-10 py-5">
        <h1 className="font-playfair text-4xl font-semibold">
          Ajout d'une actualité
        </h1>
        <IconButton onClick={() => setOpen(false)}>
          <MdClose />
        </IconButton>
      </div>

      <div className="grid grid-cols-12 gap-5 px-10 py-5 h-screen overflow-y-scroll">
        <div className="col-span-12 font-playfair text-3xl font-medium">
          1. Informations sur l'actualité
        </div>
        <div className="col-span-6 rounded-md border-2 border-dashed border-gray-700 flex items-center justify-center cursor-pointer ">
          {newsImageBase64 && newsImage ? (
            <ImageListItem className="h-11/12 w-11/12">
              <img
                src={newsImageBase64}
                alt={newsImage.name}
                className="h-full w-full"
              />
              <ImageListItemBar
                className="bg-transparent"
                position="top"
                actionIcon={
                  <div className="w-full flex justify-between">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        setNewsImage(null);
                      }}
                    >
                      <MdClose />
                    </IconButton>
                  </div>
                }
                actionPosition="right"
              />
            </ImageListItem>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <AiTwotonePicture className="text-8xl text-teal-500" />
              <input
                type="file"
                className="hidden"
                ref={imageInputRef}
                onChange={(e) => {
                  if (e.currentTarget && e.currentTarget.files) {
                    let file = e.currentTarget.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                          setNewsImage(file);
                          setNewsImageBase64(reader.result as string);
                        };
                      };
                    }
                  }
                }}
              />
              <Button
                size="small"
                className="mt-2"
                onClick={() => imageInputRef.current?.click()}
              >
                Téléverser une image
              </Button>
            </div>
          )}
        </div>
        <div className="col-span-6 grid grid-cols-2 gap-5">
          <TextField
            variant="outlined"
            className="font-rubik font-light col-span-2"
            label={<span className="font-rubik">Titre</span>}
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          <TextField
            variant="outlined"
            className="font-rubik font-light"
            label={<span className="font-rubik">Sous-titre</span>}
            onChange={(e) => setValues({ ...values, subtitle: e.target.value })}
          />
          <TextField
            variant="outlined"
            className="font-rubik font-light"
            label={<span className="font-rubik">Auteur</span>}
            onChange={(e) => setValues({ ...values, author: e.target.value })}
          />
          <TextField
            variant="outlined"
            className="font-rubik font-light col-span-2"
            label={<span className="font-rubik">Description</span>}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            multiline
            rows={2}
          />
        </div>
        <div className="col-span-12 font-playfair text-3xl font-medium pt-5">
          2. Contenu de l' actualité
        </div>
        <div className="col-span-12 pl-5 grid grid-cols-12 gap-3">
          <h1 className="font-playfair text-2xl font-medium col-span-12">
            2.1 Sections de l'actualité
          </h1>

          {currentSectionToBeAddedContent && (
            <div className="col-span-12 text-xl mt-3 font-playfair">
              Ajout d'une nouvelle section
            </div>
          )}
          {currentSectionToBeAddedContent && (
            <>
              {" "}
              <h1 className="font-medium mt-3 col-span-12">
                Titre de la section
              </h1>
              <TextField
                className="col-span-12 text-rubik"
                size="small"
                value={currentSectionToBeAddedContent.title}
                onChange={(e) =>
                  setCurrentSectionToBeAdded({
                    ...currentSectionToBeAddedContent,
                    title: e.target.value,
                  })
                }
              />
            </>
          )}
          {currentSectionToBeAddedContent && (
            <>
              <h1 className="font-medium mt-3 col-span-12">Contenu</h1>
              <TiptapTextEditor
                content={currentSectionToBeAddedContent.content}
                setContent={(newContent: string) =>
                  setCurrentSectionToBeAdded({
                    ...currentSectionToBeAddedContent,
                    content: newContent,
                  })
                }
              />
            </>
          )}
          {currentSectionToBeAddedContent ? (
            <div className="flex items-center justify-end col-span-12 mt-3">
              {" "}
              <Button
                className="font-rubik font-normal tracking-normal mr-5"
                variant="outlined"
                color="error"
                size="small"
                onClick={() => setCurrentSectionToBeAdded(null)}
              >
                Annuler
              </Button>
              <Button
                className="font-rubik font-normal bg-primary tracking-normal"
                startIcon={<AiFillPlusCircle />}
                variant="contained"
                size="small"
                onClick={() => {
                  setSections([...sections, currentSectionToBeAddedContent]);
                  setCurrentSectionToBeAdded(null);
                  console.log(sections);
                }}
              >
                Ajouter
              </Button>
            </div>
          ) : (
            <div className="col-span-12">
              <Button
                variant="text"
                size="medium"
                startIcon={<AiOutlinePlus />}
                className="font-rubik font-light tracking-normal"
                onClick={() =>
                  setCurrentSectionToBeAdded({
                    title: "",
                    content: "",
                  })
                }
              >
                Ajouter une section
              </Button>
            </div>
          )}
        </div>
        {sections.map((section) => (
          <Accordion className="col-span-12">
            <AccordionSummary
              expandIcon={<MdKeyboardArrowDown />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="text-xl font-semibold font-rubik"
            >
              {section.title}
            </AccordionSummary>
            <AccordionDetails>
              <div dangerouslySetInnerHTML={{ __html: section.content }}></div>
            </AccordionDetails>
            <AccordionActions>
              <IconButton className="sm:mr-4 lg:mr-2">
                <MdEdit className="sm:text-7xl lg:text-2xl" />
              </IconButton>
              <IconButton color="error">
                <BsTrash className="sm:text-7xl lg:text-2xl" />
              </IconButton>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
      <div className="bg-white w-full h-20 fixed z-20 flex justify-end items-center left-0 bottom-0 border-t px-10 p-5">
        <Button
          className="font-rubik font-normal tracking-normal mr-5"
          variant="outlined"
          color="error"
          size="large"
          onClick={() => {
            setCurrentSectionToBeAdded(null);
            setNewsImageBase64(null);
            setNewsImage(null);
            setValues({
              title: "",
              subtitle: "",
              author: "",
              description: "",
              imageName: "",
            });
            setOpen(false);
          }}
        >
          Annuler
        </Button>
        <Button
          className="font-rubik font-normal bg-primary tracking-normal"
          startIcon={<AiOutlineSave />}
          variant="contained"
          size="large"
          onClick={handleSave}
        >
          Enregistrer
        </Button>
      </div>
    </Dialog>
  );
};

export default AddNewsDialog;
