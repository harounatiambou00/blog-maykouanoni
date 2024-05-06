import { collection, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { firestore, storage } from "../../../config/firebase-config";
import { getDownloadURL, ref } from "firebase/storage";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineBookmarkBorder } from "react-icons/md";

type Props = {
  item: any;
};

const NewsItemDetailsCard = ({ item }: Props) => {
  const [itemImage, setItemImage] = React.useState<string>("");
  const getNewsItemImage = async () => {
    let imageRef = ref(storage, item.imageName);
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
          <p className="font-rubik font-light sm:text-3xl lg:text-sm sm:mt-5 lg:mt-2 ">
            {item.description}
          </p>
          <p className="font-rubik sm:text-3xl lg:text-xs sm:mt-5 lg:mt-2">
            Publié le {item.publicationDate}
          </p>
          {/**<div className="flex sm:mt-5 lg:mt-2">
        {item.tags.map((tag) => (
          <Chip
            label={
              <span className="font-rubik font-normal sm:text-3xl lg:text-xs italic">
                {tag}
              </span>
            }
            className="mr-2"
          />
        ))}
      </div> */}
        </CardContent>
        <CardActions className="sm:py-10 lg:py-3 flex justify-center">
          <IconButton className="sm:mr-4 lg:mr-2">
            <AiOutlineShareAlt className="sm:text-7xl lg:text-2xl" />
          </IconButton>
          <IconButton>
            <MdOutlineBookmarkBorder className="sm:text-7xl lg:text-2xl" />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default NewsItemDetailsCard;
