import React from "react";
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  AiOutlinePlusCircle,
  AiOutlineSearch,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { MdEdit, MdOutlineBookmarkBorder } from "react-icons/md";
import AddNewsDialog from "./add-news-dialod/AddNewsDialog";
import { firestore } from "../../../config/firebase-config";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { BsTrash } from "react-icons/bs";
import NewsItemDetailsCard from "../../../components/core/news-item-details-card/NewsItemDetailsCard";
import NewsItemCard from "./NewsItemCard";
import NewsType from "../../../data/NewsType";
const AdminNewsPage = () => {
  const [news, setNews] = React.useState<NewsType[]>([]);
  const [newsToBeDisplayed, setNewsToBeDisplayed] = React.useState<NewsType[]>(
    []
  );

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const [numberOfPages, setNumberOfPages] = React.useState<number>(1);

  const [sortBy, setSortBy] = React.useState("most_recent");
  const [openAddNewsDialog, setOpenAddNewsDialog] = React.useState(false);
  const newsCollectionRef = collection(firestore, "news");
  React.useEffect(() => {
    getNews();
  }, []);
  const getNews = async () => {
    let data = await getDocs(newsCollectionRef);
    let filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setNews(filteredData as NewsType[]);
  };
  const refreshNews = async () => await getNews();
  return (
    <div className="w-full pr-0 p-10 sm:mb-24 lg:mb-16">
      <div className="flex sm:items-end lg:items-center justify-between w-full">
        <div className="flex items-center">
          <OutlinedInput
            size="small"
            inputProps={{
              sx: {},
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: { md: 100, lg: 30 },
              },
            }}
            startAdornment={
              <AiOutlineSearch className="sm:text-5xl lg:text-3xl mr-3" />
            }
            className="mr-5 w-96 font-playwrite sm:text-3xl lg:text-base placeholder:sm:text-3xl placeholder:lg:text-base placeholder:font-playwrite placeholder:text-gray-400"
            placeholder="Recherchez une actu par son titre ou son auteur."
          />
          <div className="flex sm:flex-col lg:flex-row sm:items-start lg:items-center">
            <p className="sm:mb-2 lg:mb-0 mr-2 sm:font-normal lg:font-light sm:text-3xl lg:text-sm">
              Trier par :
            </p>
            <Select
              value={sortBy}
              onChange={(event: SelectChangeEvent) => {
                setSortBy(event.target.value as string);
              }}
              size="small"
              MenuProps={{}}
              className="font-playwrite sm:text-4xl lg:text-sm"
              inputProps={{
                sx: {
                  height: { md: 120, lg: 30 },
                  "& .MuiInputBase-root": {
                    height: { md: 120, lg: 40 },
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
        <div className="">
          <Button
            variant="contained"
            startIcon={<AiOutlinePlusCircle />}
            className="bg-primary tracking-normal font-kalnia font-light"
            size="large"
            onClick={() => setOpenAddNewsDialog(true)}
          >
            Ajouter
          </Button>
        </div>
      </div>
      {news.length === 0 ? (
        <div className="w-full pt-10 flex items-center justify-center">
          <Alert severity="error" className="font-kani">
            Aucune actualité pour le moment.
          </Alert>
        </div>
      ) : (
        <div className="w-full grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-20 lg:gap-10 my-10 -z-10 ">
          {news.map((item, index) => (
            <NewsItemCard refreshNews={refreshNews} item={item} key={index} />
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
      <AddNewsDialog
        refreshNews={refreshNews}
        open={openAddNewsDialog}
        setOpen={setOpenAddNewsDialog}
      />
    </div>
  );
};

export default AdminNewsPage;
