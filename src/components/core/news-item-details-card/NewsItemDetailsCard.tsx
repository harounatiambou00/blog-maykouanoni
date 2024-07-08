import React from "react";
import { storage } from "../../../config/firebase-config";
import { getDownloadURL, ref } from "firebase/storage";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
} from "@mui/material";
import { CiShare1, CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import NewsType from "../../../data/NewsType";

type Props = {
  item: NewsType;
};

const NewsItemDetailsCard = ({ item }: Props) => {
  const navigate = useNavigate();
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
  return (
    <Card className="cursor-pointer shadow h-fit">
      <CardActionArea onClick={() => navigate("/news/" + item.id)}>
        <CardMedia
          sx={{}}
          alt={item.title}
          src={itemImage}
          component="img"
          className=""
        />
        <CardContent className="">
          <h1 className="font-medium font-kalnia sm:text-5xl lg:text-xl">
            {item.title}
          </h1>
          <p className="font-playwrite font-light sm:text-3xl lg:text-sm sm:mt-5 lg:mt-2 ">
            {item.description}
          </p>
          <p className="font-playwrite font-light sm:text-2xl lg:text-xs sm:mt-5 lg:mt-5 w-full flex items-center justify-between sm:px-4 lg:px-2">
            <div>Publié le {item.publicationDate.toString()}</div>
            <div> {item.likedBy.length}likes</div>
          </p>
          <div className="flex sm:mt-5 lg:mt-2">
            {item.tags.map((tag) => (
              <Chip
                key={tag}
                label={
                  <span className="font-playwrite font-normal sm:text-3xl lg:text-xs italic">
                    {tag}
                  </span>
                }
                className="mr-2"
              />
            ))}
          </div>
        </CardContent>
        <CardActions className="sm:py-10 lg:py-3 flex justify-center">
          <IconButton className="sm:mr-4 lg:mr-2">
            <CiShare1 className="sm:text-7xl lg:text-2xl" />
          </IconButton>
          <IconButton>
            <CiBookmark className="sm:text-7xl lg:text-2xl" />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default NewsItemDetailsCard;
