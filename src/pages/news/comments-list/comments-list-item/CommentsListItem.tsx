import React from "react";
import NewsCommentType from "../../../../data/NewsCommentType";
import { UserType } from "../../../../data";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../config/firebase-config";
import { Avatar } from "@mui/material";

type Props = {
  comment: NewsCommentType;
};
const CommentsListItem = ({ comment }: Props) => {
  const [user, setUser] = React.useState<UserType | null>(null);
  const getUser = async () => {
    let userData = await getDoc(doc(firestore, "users", comment.userId));
    if (userData.exists()) {
      let data = userData.data() as UserType;
      setUser(data);
    }
  };

  React.useEffect(() => {
    getUser();
  }, [comment]);
  return (
    <div>
      {user && (
        <div className=" pb-5 border-b">
          <div className="flex">
            <div className="font-kalnia sm:text-3xl lg:text-base p-3 rounded-full bg-gray-200 h-fit">
              {user.firstName &&
                user.firstName[0] + (user.lastName && user.lastName[0])}
            </div>
            <h1 className="ml-2 font-kalnia font-normal sm:text-3xl lg:text-base h-fit">
              {user.firstName + " " + user.lastName}
              <br />
              <span className="font-montserrat font-light sm:text-xl lg:text-xs text-gray-600">
                {comment.createdAt.toString()}
              </span>
            </h1>
          </div>
          <div className="font-playrite mt-5 pl-10 sm:text-4xl lg:text-lg">
            {comment.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsListItem;
