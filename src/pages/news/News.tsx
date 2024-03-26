import React from "react";
import { PageLayout } from "../../layouts";
import {
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
import { news } from "../../data/NewsItem";
import { AiOutlineSearch, AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineBookmarkBorder } from "react-icons/md";

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

  return (
    <PageLayout title="L' actualité">
      <div className="w-full sm:mt-10 lg:mt-5 sm:mb-24 lg:mb-16">
        <div className="flex sm:items-end lg:items-center justify-between w-full">
          <OutlinedInput
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
            className="font-rubik sm:w-1/2 lg:w-2/6 sm:text-3xl lg:text-base placeholder:sm:text-3xl placeholder:lg:text-base placeholder:font-rubik placeholder:text-gray-400"
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
                  height: { md: 120, lg: 50 },
                  "& .MuiInputBase-root": {
                    height: { md: 120, lg: 50 },
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
        <div className="w-full grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-20 lg:gap-10 my-10 -z-10 ">
          {news.map((item, index) => (
            <Card key={index} className="cursor-pointer shadow h-fit">
              <CardActionArea>
                <CardMedia
                  sx={{}}
                  alt={item.title}
                  src={item.image}
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
                    Publié le {item.publicationDate.getDay()}/{" "}
                    {item.publicationDate.getMonth()}/{" "}
                    {item.publicationDate.getFullYear()}
                  </p>
                  <div className="flex sm:mt-5 lg:mt-2">
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
                  </div>
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
      </div>
    </PageLayout>
  );
};

export default News;
