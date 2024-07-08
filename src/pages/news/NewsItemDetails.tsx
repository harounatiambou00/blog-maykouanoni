import { getDownloadURL, ref } from "firebase/storage";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore, storage } from "../../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { Avatar, IconButton } from "@mui/material";
import { CiShare1, CiBookmark } from "react-icons/ci";
import NewsSection from "../../data/NewsSectionType";
import NewsType from "../../data/NewsType";
import { SlLike } from "react-icons/sl";
import CommentsList from "./comments-list/CommentsList";
import { TiHeart, TiHeartOutline } from "react-icons/ti";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../redux/store";
import { disLikeArticle, likeArticle } from "../../services/NewsService";

const NewsItemDetails = () => {
  const { newsItemId } = useParams();
  const [newsItem, setNewsItem] = React.useState<NewsType | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const getNewsItem = async () => {
    if (newsItemId) {
      try {
        const docRef = doc(firestore, "news", newsItemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const newsData = { ...docSnap.data(), id: docSnap.id };
          setNewsItem(newsData as NewsType);
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
    let imageRef = ref(storage, newsItem?.imageUrl);
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

  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice.user
  );
  const likeOrDisLikeArticle = async () => {
    if (currentUser && newsItem) {
      if (newsItem.likedBy.includes(currentUser.uid)) {
        await disLikeArticle(newsItem, currentUser.uid);
      } else {
        await likeArticle(newsItem, currentUser.uid);
      }
      await getNewsItem();
    }
  };
  return (
    <div className="w-full flex items-cente justify-center mt-10 mb-14">
      {newsItem ? (
        <div className="sm:w-11/12 lg:w-8/12">
          <h1 className="font-kalnia sm:text-6xl lg:text-5xl font-semibold">
            {newsItem.title}
          </h1>
          <h1 className="font-kalnia sm:text-4xl lg:text-xl mt-1">
            {newsItem.subtitle}
          </h1>
          <div className="sm:my-10 lg:my-5 border-t border-b w-full sm:py-7 lg:py-3 flex justify-between px-2">
            <div className="flex ">
              <Avatar sx={{ width: 56, height: 56 }} className="uppercase">
                {newsItem.authorName[0] + newsItem.authorName[1]}
              </Avatar>
              <div className="ml-4">
                <div className="font-normal sm:text-4xl lg:text-lg">
                  {newsItem.authorName}
                </div>
                <div className="sm:text-lg lg:text-xs">
                  4 minutes de lecture · publié le{" "}
                  {newsItem.publicationDate.toString()}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <IconButton>
                <CiShare1 className="sm:text-5xl lg:text-base" />
              </IconButton>
              <IconButton>
                <CiBookmark className="sm:text-5xl lg:text-base" />
              </IconButton>
              <IconButton onClick={likeOrDisLikeArticle}>
                {currentUser && newsItem.likedBy.includes(currentUser.uid) ? (
                  <TiHeart className="sm:text-5xl lg:text-2xl text-primary" />
                ) : (
                  <TiHeartOutline className="sm:text-5xl lg:text-2xl" />
                )}
              </IconButton>
            </div>
          </div>
          <div className="sm:text-lg lg:text-xs text-right ">
            Dernière mis à jour {newsItem.lastModification.toString()}
          </div>
          {itemImage && (
            <img src={itemImage} alt={newsItem.title} className="mt-5" />
          )}
          <div className="mt-10">
            {newsItem.sections.map((section: NewsSection) => (
              <div className="" key={section.id}>
                {section.title !== "" && (
                  <h1 className="font-kanit sm:text-5xl lg:text-xl font-semibold">
                    {section.title}
                  </h1>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: section.content,
                  }}
                  className="font-kalnia sm:text-4xl lg:text-lg leading-loose"
                ></div>
              </div>
            ))}
          </div>

          <CommentsList newsId={newsItem.id} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NewsItemDetails;
