import { getDownloadURL, ref } from "firebase/storage";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore, storage } from "../../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { SectionType } from "../admins/admin-news-page/add-news-dialod/AddNewsDialog";
import { Avatar, IconButton } from "@mui/material";
import { MdShare } from "react-icons/md";

const NewsItemDetails = () => {
  const { newsItemId } = useParams();
  const [newsItem, setNewsItem] = React.useState<any | undefined>(undefined);
  const navigate = useNavigate();
  const getNewsItem = async () => {
    if (newsItemId) {
      try {
        const docRef = doc(firestore, "news", newsItemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const newsItem = { ...docSnap.data(), id: docSnap.id };
          setNewsItem(newsItem);
          console.log(newsItem);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    } else {
      navigate("/news");
    }
  };
  React.useEffect(() => {
    getNewsItem();
  }, []);
  const [itemImage, setItemImage] = React.useState<string>("");
  const getNewsItemImage = async () => {
    let imageRef = ref(storage, newsItem.imageName);
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
    if (newsItem) {
      getNewsItemImage();
    }
  }, [newsItem]);
  return (
    <div className="w-full flex items-cente justify-center mt-10 mb-14">
      {newsItem ? (
        <div className="sm:w-11/12 lg:w-8/12">
          <h1 className="font-playfair sm:text-6xl lg:text-5xl font-semibold">
            {newsItem.title}
          </h1>
          <h1 className="font-rubik sm:text-3xl lg:text-xl mt-1">
            {newsItem.subtitle}
          </h1>
          <div className="my-5 border-t border-b w-full py-3 flex justify-between px-2">
            <div className="flex ">
              <Avatar sx={{ width: 56, height: 56 }} className="uppercase">
                {newsItem.author[0] + newsItem.author[1]}
              </Avatar>
              <div className="ml-4">
                <div className="font-normal sm:text-2xl lg:text-lg">
                  {newsItem.author}
                </div>
                <div className="sm:text-lg lg:text-xs">
                  4 minutes de lecture · publié le {newsItem.publicationDate}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <IconButton>
                <MdShare />
              </IconButton>
            </div>
          </div>
          <div className="sm:text-lg lg:text-xs text-right">
            Dernière mis à jour {newsItem.lastModificationDate}
          </div>
          {itemImage && (
            <img src={itemImage} alt={newsItem.title} className="mt-5" />
          )}
          <div className="mt-10">
            {newsItem.sections.map((section: SectionType) => (
              <div className="">
                {section.title !== "" && (
                  <h1 className="font-kanit sm:text-6xl lg:text-3xl font-semibold">
                    {section.title}
                  </h1>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: section.content,
                  }}
                  className="font-rubik sm:text-2xl lg:text-lg leading-loose"
                ></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NewsItemDetails;
