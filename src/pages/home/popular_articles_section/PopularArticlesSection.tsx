import { Button } from "@mui/material";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import NewsType from "../../../data/NewsType";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../config/firebase-config";
import NewsItemDetailsCard from "../../../components/core/news-item-details-card/NewsItemDetailsCard";

const PopularArticlesSection = () => {
  const navigate = useNavigate();
  const [news, setNews] = React.useState<NewsType[]>([]);
  const getNews = async () => {
    await getDocs(collection(firestore, "news")).then((querySnapshot) => {
      const newsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNews(newsData as NewsType[]);
    });
  };
  React.useEffect(() => {
    getNews();
  }, []);
  return (
    <div className="w-full sm:py-40 lg:py-20">
      <div className="flex justify-between">
        <div className="mb-8 sm:w-3/4 lg:w-1/2">
          <h2 className="sm:text-6xl lg:text-4xl font-kalnia font-semibold sm:mb-4 lg:mb-2 text-gray-900">
            Publications populaires
          </h2>
          <h3 className="font-playwrite sm:text-3xl lg:text-base">
            Parcourez les publications qui ont fait sensation. Ces articles sont
            les plus appréciés et ont retenu l'attention de notre communauté
            pour leur contenu captivant et leur pertinence.
          </h3>
        </div>
        <Button
          onClick={() => navigate("/news")}
          variant="outlined"
          className="font-playwrite h-fit font-medium normal-case rounded-xl sm:text-3xl lg:text-sm sm:py-4 lg:py-1 sm:px-8 lg:px-2"
          endIcon={<AiOutlineArrowRight className="sm:text-4xl lg:text-base" />}
        >
          Voir plus
        </Button>
      </div>
      <div className="w-full grid sm:grid-cols-1 lg:grid-cols-3 gap-5">
        {news
          .sort((a, b) => b.likedBy.length - a.likedBy.length)
          .slice(0, 5)
          .map((item) => (
            <NewsItemDetailsCard item={item} />
          ))}
      </div>
    </div>
  );
};

export default PopularArticlesSection;
