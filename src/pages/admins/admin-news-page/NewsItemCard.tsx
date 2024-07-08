import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React from "react";
import { firestore, storage } from "../../../config/firebase-config";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import NewsType from "../../../data/NewsType";
import EditNewsDialog from "./edit-news-dialog/EditNewsDialog";

type Props = {
  item: NewsType;
  refreshNews: () => void;
};

const NewsItemCard = ({ item, refreshNews }: Props) => {
  const [openEditNewsDialog, setOpenEditNewsDialog] = React.useState(false);
  const [itemImage, setItemImage] = React.useState<string>("");
  const getNewsItemImage = async () => {
    let imageRef = ref(storage, item.imageUrl);
    try {
      // Retrieve the download URL of the image file
      const url = await getDownloadURL(imageRef);

      // Set the image URL
      setItemImage(url);
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

  const deleteNews = async (newsId: string, imageName: string) => {
    try {
      // Supprimer le document de Firestore
      await deleteDoc(doc(firestore, "news", newsId));

      // Supprimer l'image de Firebase Storage
      if (imageName) {
        const imageRef = ref(storage, imageName);
        await deleteObject(imageRef);
      }

      console.log("Actualité supprimée avec succès.");
      await refreshNews();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'actualité :", error);
    }
  };
  const handleDelete = async () => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")
    ) {
      await deleteNews(item.id, item.imageUrl);
    }
  };
  return (
    <Card className="cursor-pointer shadow h-fit">
      <CardActionArea>
        <CardMedia
          sx={{}}
          alt={item.title}
          src={itemImage}
          component="img"
          className=""
        />
        <CardContent className="">
          <h1 className="font-medium font-playfair sm:text-5xl lg:text-base">
            {item.title}
          </h1>
          <p className="font-playwrite font-light sm:text-3xl lg:text-sm sm:mt-5 lg:mt-2 ">
            {item.description}
          </p>
          <p className="font-playwrite sm:text-3xl lg:text-xs sm:mt-5 lg:mt-2">
            Publié le {item.publicationDate.toString()}
          </p>
          {/**<div className="flex sm:mt-5 lg:mt-2">
        {item.tags.map((tag) => (
          <Chip
            label={
              <span className="font-playwrite font-normal sm:text-3xl lg:text-xs italic">
                {tag}
              </span>
            }
            className="mr-2"
          />
        ))}
      </div> */}
        </CardContent>
        <CardActions className="sm:py-10 lg:py-3 flex justify-center">
          <IconButton
            className="sm:mr-4 lg:mr-2"
            onClick={() => setOpenEditNewsDialog(true)}
          >
            <MdEdit className="sm:text-7xl lg:text-2xl" />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete()}>
            <MdDelete className="sm:text-7xl lg:text-2xl" />
          </IconButton>
        </CardActions>
      </CardActionArea>
      {
        <EditNewsDialog
          open={openEditNewsDialog}
          setOpen={setOpenEditNewsDialog}
          newsData={item}
          refreshNews={refreshNews}
        />
      }
    </Card>
  );
};

export default NewsItemCard;
