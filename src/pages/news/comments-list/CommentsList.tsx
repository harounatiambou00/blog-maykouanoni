import React from "react";
import NewsCommentType from "../../../data/NewsCommentType";
import { Alert, Button, OutlinedInput } from "@mui/material";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../redux/store";
import { MdInfo } from "react-icons/md";
import {
  addComment,
  getAllCommentsOfAnArticle,
} from "../../../services/CommentsService";
import CommentsListItem from "./comments-list-item/CommentsListItem";

type Props = {
  newsId: string;
};
const CommentsList = ({ newsId }: Props) => {
  const [comments, setComments] = React.useState<NewsCommentType[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<
    "DATE_ASC" | "DATE_DESC" | "LIKES"
  >("DATE_DESC");

  const getComments = async () => {
    setIsLoading(true);
    try {
      let response = await getAllCommentsOfAnArticle(newsId);
      if (response.data) {
        setComments(response.data);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    getComments();
  }, []);
  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice.user
  );

  const [commentToBeAdded, setCommentToBeAdded] = React.useState({
    content: "",
    userId: currentUser ? currentUser.uid : "",
    newsId: newsId,
  });

  const handleSubmitComment = async () => {
    let response = await addComment(
      commentToBeAdded.userId,
      commentToBeAdded.newsId,
      commentToBeAdded.content
    );
    if (response) {
      await getComments();
      setCommentToBeAdded({
        content: "",
        userId: currentUser ? currentUser.uid : "",
        newsId: newsId,
      });
    }
  };
  return (
    <div className="mt-10">
      <h1 className="font-kalnia font-medium sm:text-4xl lg:text-2xl">
        Commentaires
      </h1>
      {currentUser && (
        <div className="mt-5">
          <OutlinedInput
            fullWidth
            multiline
            rows={3}
            value={commentToBeAdded.content}
            onChange={(e) =>
              setCommentToBeAdded((current) => ({
                ...current,
                content: e.target.value,
              }))
            }
            placeholder="Ecrivez un commentaire ..."
            className="font-playwrite placeholder:font-playwrite sm:text-2xl lg:text-base placeholder:sm:text-xl placeholder:lg:text-base"
          />
          <Button
            onClick={handleSubmitComment}
            variant="contained"
            className="font-playwrite bg-primary sm:mt-5 lg:mt-2 normal-case sm:text-xl lg:text-sm"
          >
            Poster le commentaire
          </Button>
        </div>
      )}
      {comments.length <= 0 ? (
        <div className="w-full flex justify-center items-center sm:mt-10 lg:mt-5">
          <Alert
            className="font-playwrite sm:text-3xl lg:text-base"
            severity="info"
            icon={<MdInfo className="sm:text-5xl lg:text-base" />}
          >
            Aucun commentaires ajoute pour le moment.
          </Alert>
        </div>
      ) : (
        <div className="sm:mt-16 lg:mt-10">
          {comments.map((c, index) => (
            <CommentsListItem key={index} comment={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
