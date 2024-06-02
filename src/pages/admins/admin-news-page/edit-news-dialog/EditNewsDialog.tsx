import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Dialog,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  OutlinedInput,
  Slide,
  TextField,
} from "@mui/material";
import React from "react";
import {
  AiFillPlusCircle,
  AiOutlinePlus,
  AiOutlineSave,
  AiTwotonePicture,
} from "react-icons/ai";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";
import { TiptapTextEditor } from "../../../../components/core";
import { firestore, storage } from "../../../../config/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { TransitionProps } from "@mui/material/transitions";
import AddedSectionItem from "../add-news-dialod/added-sections-item/AddedSectionItem";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newsData: {
    id: string;
    title: string;
    subtitle: string;
    author: string;
    description: string;
    imageName: string;
    sections: SectionType[];
  };
  refreshNews: () => void;
};

export type SectionType = {
  ranking: number;
  title: string;
  content: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditNewsDialog = ({ open, setOpen, newsData, refreshNews }: Props) => {
  const [newsImageBase64, setNewsImageBase64] = React.useState<string | null>(
    null
  );
  const getNewsItemImage = async () => {
    let imageRef = ref(storage, newsData.imageName);
    try {
      // Retrieve the download URL of the image file
      const url = await getDownloadURL(imageRef);

      // Set the image URL
      setNewsImageBase64(url);
    } catch (error) {
      // Handle any errors
      console.error("Error getting download URL:", error);
      // You might want to set a default image URL or handle the error in another way
      // For example:
      // setItemImage('defaultImageURL');
    }
  };
  React.useEffect(() => {
    getNewsItemImage();
  }, []);
  const [values, setValues] = React.useState({
    title: newsData.title,
    subtitle: newsData.subtitle,
    author: newsData.author,
    description: newsData.description,
    imageName: newsData.imageName,
  });
  const [currentSectionToBeAddedContent, setCurrentSectionToBeAdded] =
    React.useState<SectionType | null>(null);

  const [sections, setSections] = React.useState<SectionType[]>(
    newsData.sections
  );
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const [newsImage, setNewsImage] = React.useState<File | null>(null);

  const [imageRequiredError, setImageRequiredError] = React.useState(false);
  const [titleRequiredError, setTitleRequiredError] = React.useState(false);
  const [authorRequiredError, setAuthorRequiredError] = React.useState(false);
  const [descriptionRequiredError, setDescriptionRequiredError] =
    React.useState(false);
  const [atLeastOneSectionRequiredError, setAtLeastOneSectionRequiredError] =
    React.useState(false);
  const handleSave = async () => {
    if (newsImage === null && newsImageBase64 === null) {
      setImageRequiredError(true);
      return;
    } else {
      setImageRequiredError(false);
    }
    if (values.title === "") {
      setTitleRequiredError(true);
      return;
    } else {
      setTitleRequiredError(false);
    }
    if (values.author === "") {
      setAuthorRequiredError(true);
      return;
    } else {
      setAuthorRequiredError(false);
    }
    if (values.description === "") {
      setDescriptionRequiredError(true);
      return;
    } else {
      setDescriptionRequiredError(false);
    }
    if (sections.length === 0) {
      setAtLeastOneSectionRequiredError(true);
      return;
    } else {
      setAtLeastOneSectionRequiredError(false);
    }
    if (
      imageRequiredError === false &&
      titleRequiredError === false &&
      authorRequiredError === false &&
      descriptionRequiredError === false &&
      atLeastOneSectionRequiredError === false
    ) {
      // Updating the image if a new one is provided
      let generatedFileName = undefined;
      if (newsImage) {
        generatedFileName = newsImage.name + v4();
        let imageRef = ref(storage, generatedFileName);
        let addingImageResponse = await uploadBytes(imageRef, newsImage);
      }
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();
      let ddString = "";
      let mmString = "";
      if (dd < 10) ddString = "0" + dd;
      if (mm < 10) mmString = "0" + mm;

      const formattedToday = ddString + "/" + mmString + "/" + yyyy;
      const docRef = doc(firestore, "news", newsData.id);
      await updateDoc(docRef, {
        title: values.title,
        description: values.description,
        subtitle: values.subtitle,
        author: values.author,
        imageName: generatedFileName ? generatedFileName : newsData.imageName,
        lastModificationDate: formattedToday,
        sections: sections,
      });
      await refreshNews();
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen
      className=""
      TransitionComponent={Transition}
    >
      <div className="bg-white w-full h-20 fixed z-20 flex justify-between items-center left-0 top-0 border-b px-10 py-5">
        <h1 className="font-playfair text-4xl font-semibold">
          Modification d'une actualité
        </h1>
        <IconButton onClick={() => setOpen(false)}>
          <MdClose />
        </IconButton>
      </div>

      <div className="px-10 py-24 h-screen overflow-y-scroll">
        <div className="grid grid-cols-12 gap-5 mt-3">
          <div className="col-span-12 font-playfair text-3xl">
            1. Informations sur l'actualité
          </div>
          <div
            className={
              imageRequiredError
                ? "col-span-6 rounded-md border-2 border-dashed border-red-600 flex items-center justify-center cursor-pointer h-80"
                : "col-span-6 rounded-md border-2 border-dashed border-gray-700 flex items-center justify-center cursor-pointer h-80"
            }
          >
            {newsImageBase64 ? (
              <ImageListItem className="w-full h-full">
                <img
                  src={newsImageBase64}
                  alt={newsImage ? newsImage.name : newsData.imageName}
                  className="h-full w-full"
                />
                <div className="absolute top-1 right-1 flex justify-between">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      setNewsImage(null);
                      setNewsImageBase64(null);
                    }}
                    className="bg-white"
                  >
                    <MdDelete />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => imageInputRef.current?.click()}
                    className="bg-white ml-2"
                  >
                    <MdEdit />
                  </IconButton>
                </div>
              </ImageListItem>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-rubik text-xl dont-medium align-middle">
                  L'image principal de l'article{" "}
                  <span className="text-red-600">*</span>
                </h1>
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
                          setNewsImage(file);
                          setNewsImageBase64(reader.result as string);
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
                {imageRequiredError && (
                  <small className="text-red-600 mt-5">
                    Vous devez ajouter une image.
                  </small>
                )}
              </div>
            )}
          </div>
          <div className="col-span-6 grid grid-cols-2 gap-5 content-start">
            <div className="col-span-2 flex flex-col">
              <label htmlFor="" className="font-kanit text-lg align-middle">
                Titre <span className="text-red-600">*</span>
              </label>
              <OutlinedInput
                fullWidth
                className="font-kanit font-light"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
              />
              {titleRequiredError && (
                <small className="text-red-600 mt-1">
                  Vous devez renseigner le titre de l'article.
                </small>
              )}
            </div>
            <div className="">
              <label htmlFor="" className="font-kanit text-lg align-middle">
                Sous-titre
              </label>
              <OutlinedInput
                fullWidth
                className="font-kanit font-light"
                value={values.subtitle}
                onChange={(e) =>
                  setValues({ ...values, subtitle: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="font-kanit text-lg align-middle">
                Auteur <span className="text-red-600">*</span>
              </label>
              <OutlinedInput
                fullWidth
                className="font-kanit font-light"
                value={values.author}
                onChange={(e) =>
                  setValues({ ...values, author: e.target.value })
                }
              />
              {authorRequiredError && (
                <small className="text-red-600 mt-1">
                  Ce champ est obligatoire.
                </small>
              )}
            </div>
            <div className="col-span-2 flex flex-col">
              <label htmlFor="" className="font-kanit text-lg align-middle">
                Description <span className="text-red-600">*</span>
              </label>
              <OutlinedInput
                fullWidth
                className="font-kanit font-light"
                value={values.description}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                multiline
                rows={2}
              />
              {descriptionRequiredError && (
                <small className="text-red-600 mt-1">
                  Veuillez décrire l'article.
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-12 flex items-center justify-between">
            <div className="font-playfair text-3xl">
              2. Contenu de l'actualité
            </div>
            <Button
              variant="contained"
              size="medium"
              startIcon={<AiOutlinePlus />}
              className={
                currentSectionToBeAddedContent !== null
                  ? "font-rubik font-light tracking-normal"
                  : "font-rubik font-light tracking-normal bg-primary"
              }
              disabled={currentSectionToBeAddedContent !== null}
              onClick={() =>
                setCurrentSectionToBeAdded({
                  ranking: sections.length + 1,
                  title: "",
                  content: "",
                })
              }
            >
              Ajouter une section
            </Button>
          </div>
          {atLeastOneSectionRequiredError && (
            <div className="col-span-12 flex items-center justify-center">
              <Alert severity="error" className="font-kanit">
                Vous devez ajouter au moins une section.
              </Alert>
            </div>
          )}
          <div className="col-span-12 pl-5 grid grid-cols-12 gap-3">
            {currentSectionToBeAddedContent && (
              <div className="col-span-12 text-xl mt-3 font-playfair">
                Ajout d'une nouvelle section
              </div>
            )}
            {currentSectionToBeAddedContent && (
              <>
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
            {currentSectionToBeAddedContent && (
              <div className="flex items-center justify-end col-span-12 mt-3">
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
                  }}
                >
                  Ajouter
                </Button>
              </div>
            )}
          </div>
          {sections.map((section, index) => (
            <AddedSectionItem
              key={index}
              section={section}
              sections={sections}
              setSections={setSections}
            />
          ))}
        </div>
      </div>
      <div className="bg-white w-full h-20 fixed z-20 flex justify-end items-center left-0 bottom-0 border-t px-10 p-5">
        <Button
          className="font-rubik font-normal tracking-normal mr-5"
          variant="outlined"
          color="error"
          size="large"
          onClick={() => {
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
          onClick={() => handleSave()}
        >
          Enregistrer
        </Button>
      </div>
    </Dialog>
  );
};

export default EditNewsDialog;
