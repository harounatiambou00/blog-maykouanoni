import React from "react";
import { PageLayout } from "../../layouts";
import {
  Alert,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AiOutlineSearch, AiOutlineShareAlt } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../config/firebase-config";
import NewsItemDetailsCard from "../../components/core/news-item-details-card/NewsItemDetailsCard";
import NewsType from "../../data/NewsType";

const News = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const [numberOfPages, setNumberOfPages] = React.useState<number>(1);

  const [sortBy, setSortBy] = React.useState("most_recent");
  const [news, setNews] = React.useState<NewsType[]>([]);
  const [newsToBeDisplayed, setNewsToBeDisplayed] = React.useState<any[]>([]);
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

  React.useEffect(() => {
    setNewsToBeDisplayed(news);
  }, [news]);

  const [searchCriteria, setSearchCriteria] = React.useState("");
  React.useEffect(() => {
    if (searchCriteria === "") setNewsToBeDisplayed(news);
    else {
      setNewsToBeDisplayed(
        news.filter((n) =>
          n.title.toLowerCase().includes(searchCriteria.toLowerCase())
        )
      );
    }
  }, [searchCriteria]);
  return (
    <PageLayout title="L' actualité">
      <div className="w-full sm:mt-10 lg:mt-5 sm:mb-24 lg:mb-16">
        <div className="flex sm:items-end lg:items-center justify-between w-full">
          <OutlinedInput
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
            inputProps={{
              sx: {},
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: { md: 120, lg: 50 },
              },
            }}
            startAdornment={
              <AiOutlineSearch className="sm:text-5xl lg:text-3xl mr-3" />
            }
            className="font-playwrite sm:w-1/2 lg:w-2/6 sm:text-3xl lg:text-base placeholder:sm:text-3xl placeholder:lg:text-base placeholder:font-playwrite placeholder:text-gray-400"
            placeholder="Recherchez une actu par son titre ou son auteur."
          />
          <div className="flex sm:flex-col lg:flex-row sm:items-start lg:items-center">
            <p className="sm:mb-2 lg:mb-0 mr-5 sm:font-normal lg:font-light sm:text-3xl lg:text-base">
              Trier par :
            </p>
            <Select
              value={sortBy}
              onChange={(event: SelectChangeEvent) => {
                setSortBy(event.target.value as string);
              }}
              MenuProps={{}}
              className="font-playwrite sm:text-4xl lg:text-sm"
              inputProps={{
                sx: {
                  height: { md: 120, lg: 50 },
                  "& .MuiInputBase-root": {
                    height: { md: 120, lg: 50 },
                  },
                },
              }}
            >
              <MenuItem
                value="most_recent"
                className="font-playwrite sm:text-4xl lg:text-sm"
              >
                Le plus récent
              </MenuItem>
              <MenuItem
                value="less_recent"
                className="font-playwrite sm:text-4xl lg:text-sm"
              >
                Le moins récent
              </MenuItem>
              <MenuItem
                value="popularity"
                className="font-playwrite sm:text-4xl lg:text-sm"
              >
                Le plus populaire
              </MenuItem>
            </Select>
          </div>
        </div>
        {news.length === 0 ? (
          <div className="w-full flex justify-center items-center my-20">
            <Alert severity="error" className="font-kanit">
              Aucune actualité ajouté pour le moment.
            </Alert>
          </div>
        ) : (
          <div className="w-full grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-20 lg:gap-10 my-10 -z-10 ">
            {newsToBeDisplayed.map((item, index) => (
              <NewsItemDetailsCard item={item} key={index} />
            ))}
          </div>
        )}
        <div className="w-full flex items-center justify-center mt-5">
          <Pagination
            page={currentPage}
            onChange={handleChangePage}
            count={numberOfPages}
            shape="rounded"
            color="primary"
            variant="outlined"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default News;
