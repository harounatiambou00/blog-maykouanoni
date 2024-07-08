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
  MenuItem,
  OutlinedInput,
  Select,
  Slide,
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
import { MdClose, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import { LoadingBackdrop, TiptapTextEditor } from "../../../../components/core";
import { firestore, storage } from "../../../../config/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { TransitionProps } from "@mui/material/transitions";
import AddedSectionItem from "./added-sections-item/AddedSectionItem";
import NewsSection from "../../../../data/NewsSectionType";
import {
  NewsCategoriesType,
  NewsSubjectsType,
  newsCategories,
  newsSubjects,
} from "../../../../data/NewsType";
import TagsInput from "./TagsInput";
import { useAppSelector } from "../../../../hooks";
import { RootState } from "../../../../redux/store";
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshNews: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddNewsDialog = ({ open, setOpen, refreshNews }: Props) => {
  const [values, setValues] = React.useState({
    title: "",
    subtitle: "",
    description: "",
    createdBy: "",
    authorName: "",
    imageUrl: "",
  });
  const [currentSectionToBeAddedContent, setCurrentSectionToBeAdded] =
    React.useState<NewsSection | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState<NewsCategoriesType>("OTHERS");
  const [tags, setTags] = React.useState<string[]>([]);
  const [subject, setSubject] = React.useState<NewsSubjectsType>("OTHERS");
  const [sections, setSections] = React.useState<NewsSection[]>([]);
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const [newsImage, setNewsImage] = React.useState<File | null>(null);
  const [newsImageBase64, setNewsImageBase64] = React.useState<string | null>(
    null
  );
  const [imageRequiredError, setImageRequiredError] = React.useState(false);
  const [titleRequiredError, setTitleRequiredError] = React.useState(false);
  const [authorRequiredError, setAuthorRequiredError] = React.useState(false);
  const [descriptionRequiredError, setDescriptionRequiredError] =
    React.useState(false);
  const [atLeastOneSectionRequiredError, setAtLeastOneSectionRequiredError] =
    React.useState(false);
  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice.user
  );
  const handleSave = async () => {
    if (newsImage === null || newsImageBase64 === null) {
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
    if (values.authorName === "") {
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
      try {
        setIsLoading(true);
        //Adding the image
        let generatedFileName = undefined;
        if (newsImage) {
          generatedFileName = newsImage.name + v4();
          let imageRef = ref(storage, generatedFileName);
          let addingImageResponse = uploadBytes(imageRef, newsImage);
        }
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        let ddString = "";
        let mmString = "";
        if (dd < 10) ddString = "0" + dd;
        if (mm < 10) mmString = "0" + mm;

        const formattedToday = ddString + "-" + mmString + "-" + yyyy;
        // Generate a new document reference with a unique ID
        const newDocRef = doc(collection(firestore, "news"));
        const docId = newDocRef.id;
        await setDoc(newDocRef, {
          id: docId,
          title: values.title,
          subtitle: values.subtitle,
          description: values.description,
          lastModification: formattedToday,
          publicationDate: formattedToday,
          createdBy: currentUser ? currentUser.uid : "",
          authorName: values.authorName,
          imageUrl: generatedFileName ? generatedFileName : "",
          sections: sections,
          category: category,
          subject: subject,
          tags: tags,
          likedBy: [],
        });
        setSections([]);
        setCurrentSectionToBeAdded(null);
        setNewsImageBase64(null);
        setNewsImage(null);
        setValues({
          title: "",
          subtitle: "",
          description: "",
          createdBy: "",
          authorName: "",
          imageUrl: "",
        });
        setCategory("OTHERS");
        setTags([]);
        setSubject("OTHERS");
        await refreshNews();
        setOpen(false);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
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
        <h1 className="font-kalnia text-4xl font-semibold">
          Ajout d'une actualité
        </h1>
        <IconButton onClick={() => setOpen(false)}>
          <MdClose />
        </IconButton>
      </div>

      <div className="px-10 py-24 h-screen overflow-y-scroll">
        <div className="grid grid-cols-12 gap-5 mt-3">
          <div className="col-span-12 font-kalnia text-3xl">
            1. Informations sur l'actualité
          </div>
          <div
            className={
              imageRequiredError
                ? "col-span-6 rounded-md border-2 border-dashed border-red-600 flex items-center justify-center cursor-pointer h-80"
                : "col-span-6 rounded-md border-2 border-dashed border-gray-700 flex items-center justify-center cursor-pointer h-80"
            }
          >
            {newsImageBase64 && newsImage ? (
              <ImageListItem className="w-full h-full">
                <img
                  src={newsImageBase64}
                  alt={newsImage.name}
                  className="h-full w-full"
                />
                <div className="absolute top-1 right-1 flex justify-between">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      setNewsImage(null);
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
                <h1 className="font-playwrite text-xl dont-medium align-middle">
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
              <label
                htmlFor=""
                className="font-normal font-kalnia sm:text-4xl lg:text-lg"
              >
                Titre <span className="text-red-600">*</span>
              </label>
              <OutlinedInput
                size="small"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
                type="text"
                placeholder="Veuillez saisir le titre"
                className="rounded-lg font-playwrite font-light sm:text-4xl lg:text-base placeholder:font-playwrite placeholder:text-xs"
              />
              {titleRequiredError && (
                <small className="text-red-600 mt-1">
                  Vous devez renseingner le titre de l'article.
                </small>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="font-normal font-kalnia sm:text-4xl lg:text-lg"
              >
                Sous-titre <span className="text-red-600">*</span>
              </label>
              <OutlinedInput
                size="small"
                value={values.subtitle}
                onChange={(e) =>
                  setValues({ ...values, subtitle: e.target.value })
                }
                type="text"
                className="rounded-lg font-playwrite font-light sm:text-4xl lg:text-base"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="font-normal font-kalnia sm:text-4xl lg:text-lg "
              >
                Auteur <span className="text-red-600">*</span>
              </label>
              <OutlinedInput
                size="small"
                value={values.authorName}
                onChange={(e) =>
                  setValues({ ...values, authorName: e.target.value })
                }
                type="text"
                className="rounded-lg font-playwrite font-light sm:text-4xl lg:text-base"
              />
              {authorRequiredError && (
                <small className="text-red-600 mt-1">
                  Ce champ est obligatoire.
                </small>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor=""
                className="font-normal font-kalnia sm:text-4xl lg:text-lg"
              >
                Categorie <span className="text-red-600">*</span>
              </label>
              <Select
                size="small"
                value={category}
                onChange={(e) => {
                  let value = e.target.value;
                  try {
                    setCategory(value as NewsCategoriesType);
                  } catch {
                    setCategory("OTHERS");
                  }
                }}
                className="rounded-lg font-playwrite font-light sm:text-4xl lg:text-base"
              >
                {newsCategories.map((c) => (
                  <MenuItem
                    className="font-playwrite"
                    key={c.key}
                    value={c.key}
                  >
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
              {descriptionRequiredError && (
                <small className="text-red-600 mt-1">
                  Veuillez decrire l'article.
                </small>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="font-normal font-kalnia sm:text-4xl lg:text-lg"
              >
                Sujets
              </label>
              <Select
                size="small"
                value={subject}
                onChange={(e) => {
                  let value = e.target.value;
                  try {
                    setSubject(value as NewsSubjectsType);
                  } catch {
                    setSubject("OTHERS");
                  }
                }}
                className="rounded-lg font-playwrite font-light sm:text-4xl lg:text-base"
              >
                {newsSubjects.map((c) => (
                  <MenuItem
                    className="font-playwrite"
                    key={c.key}
                    value={c.key}
                  >
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
              {descriptionRequiredError && (
                <small className="text-red-600 mt-1">
                  Veuillez decrire l'article.
                </small>
              )}
            </div>
            <div className="col-span-2 flex flex-col">
              <label
                htmlFor=""
                className="font-normal font-kalnia sm:text-4xl lg:text-lg"
              >
                Description <span className="text-red-600">*</span>
              </label>
              <OutlinedInput
                size="small"
                value={values.description}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                type="text"
                className="rounded-lg font-playwrite font-light sm:text-4xl lg:text-base"
              />
              {descriptionRequiredError && (
                <small className="text-red-600 mt-1">
                  Veuillez decrire l'article.
                </small>
              )}
            </div>
            <TagsInput tags={tags} setTags={setTags} />
          </div>
        </div>
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-12 flex items-center justify-between">
            <div className="font-kalnia text-3xl">
              2. Contenu de l' actualité
            </div>
            <Button
              variant="contained"
              size="medium"
              startIcon={<AiOutlinePlus />}
              className={
                currentSectionToBeAddedContent !== null
                  ? "font-playwrite normal-case font-light tracking-normal"
                  : "font-playwrite normal-case tracking-normal bg-primary"
              }
              disabled={currentSectionToBeAddedContent !== null}
              onClick={() =>
                setCurrentSectionToBeAdded({
                  id: sections.length + 1,
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
              <div className="col-span-12 text-xl mt-3 font-kalnia">
                Ajout d'une nouvelle section
              </div>
            )}
            {currentSectionToBeAddedContent && (
              <>
                <h1 className="font-medium font-kalnia mt-3 col-span-12">
                  Titre de la section
                </h1>
                <OutlinedInput
                  className="col-span-12 font-playwrite"
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
                <h1 className="font-medium font-kalnia mt-3 col-span-12">
                  Contenu
                </h1>
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
                  className="font-playwrite font-normal normal-case tracking-normal mr-5"
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => setCurrentSectionToBeAdded(null)}
                >
                  Annuler
                </Button>
                <Button
                  className="font-playwrite font-normal normal-case bg-primary tracking-normal"
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
            )}
          </div>
          {sections.map((section) => (
            <AddedSectionItem
              section={section}
              sections={sections}
              setSections={setSections}
            />
          ))}
        </div>
      </div>
      <div className="bg-white w-full h-20 fixed z-20 flex justify-end items-center left-0 bottom-0 border-t px-10 p-5">
        <Button
          className="font-kalnia normal-case font-normal tracking-normal mr-5"
          variant="outlined"
          color="error"
          size="large"
          onClick={() => {
            setSections([]);
            setCurrentSectionToBeAdded(null);
            setNewsImageBase64(null);
            setNewsImage(null);
            setValues({
              title: "",
              subtitle: "",
              description: "",
              createdBy: "",
              authorName: "",
              imageUrl: "",
            });
            setCategory("OTHERS");
            setTags([]);
            setSubject("OTHERS");
            setOpen(false);
          }}
        >
          Annuler
        </Button>
        <Button
          className="font-kalnia normal-case font-normal bg-primary tracking-normal"
          startIcon={<AiOutlineSave />}
          variant="contained"
          size="large"
          onClick={() => handleSave()}
        >
          Enregistrer
        </Button>
      </div>
      <LoadingBackdrop isLoading={isLoading} />
    </Dialog>
  );
};

export default AddNewsDialog;
