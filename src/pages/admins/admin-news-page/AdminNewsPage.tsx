import React from "react";
import {
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
const AdminNewsPage = () => {
  const [news, setNews] = React.useState<any[]>([]);
  const [newsToBeDisplayed, setNewsToBeDisplayed] = React.useState([]);

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
    console.log(filteredData);
    setNews(filteredData);
  };

  return (
    <div className="w-full mx-5 sm:mt-10 lg:mt-5 sm:mb-24 lg:mb-16">
      <div className="flex sm:items-end lg:items-center justify-between w-full">
        <div className="flex items-center">
          <OutlinedInput
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
            className="mr-5 w-96 font-rubik sm:text-3xl lg:text-base placeholder:sm:text-3xl placeholder:lg:text-base placeholder:font-rubik placeholder:text-gray-400"
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
              className="font-rubik sm:text-4xl lg:text-sm"
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
                className="font-rubik sm:text-4xl lg:text-sm"
              >
                Le plus récent
              </MenuItem>
              <MenuItem
                value="less_recent"
                className="font-rubik sm:text-4xl lg:text-sm"
              >
                Le moins récent
              </MenuItem>
              <MenuItem
                value="popularity"
                className="font-rubik sm:text-4xl lg:text-sm"
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
            className="bg-primary tracking-normal font-rubik font-light"
            size="large"
            onClick={() => setOpenAddNewsDialog(true)}
          >
            Ajouter
          </Button>
        </div>
      </div>
      <div className="w-full grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-20 lg:gap-10 my-10 -z-10 ">
        {news.map((item, index) => (
          <NewsItemDetailsCard item={item} key={index} />
        ))}
      </div>
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
      <AddNewsDialog open={openAddNewsDialog} setOpen={setOpenAddNewsDialog} />
    </div>
  );
};

export default AdminNewsPage;
