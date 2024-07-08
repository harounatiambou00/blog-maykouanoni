import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ServiceResponse } from "../data";
import { firestore } from "../config/firebase-config";
import NewsCommentType from "../data/NewsCommentType";

export const getAllCommentsOfAnArticle: (
  newsId: string
) => Promise<ServiceResponse<NewsCommentType[]>> = async (newsId: string) => {
  try {
    let response = await getDocs(collection(firestore, "comments"));
    let docs = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as NewsCommentType[];

    if (response) {
      return {
        data: docs.filter((d) => d.newsId === newsId),
        success: true,
        message: "",
      } as ServiceResponse<NewsCommentType[]>;
    } else {
      return {
        data: null,
        success: false,
        message: "",
      } as ServiceResponse<NewsCommentType[]>;
    }
  } catch (e) {
    return {
      data: null,
      success: false,
      message: e,
    } as ServiceResponse<NewsCommentType[]>;
  }
};

export const addComment: (
  userId: string,
  newsId: string,
  content: string
) => Promise<ServiceResponse<NewsCommentType[]>> = async (
  userId: string,
  newsId: string,
  content: string
) => {
  try {
    let today = new Date();
    let docRef = await addDoc(collection(firestore, "comments"), {
      userId: userId,
      newsId: newsId,
      content: content,
      createdAt:
        "" +
        (today.getDate() <= 9 ? "0" + today.getDate() : today.getDate()) +
        "-" +
        (today.getMonth() <= 9 ? "0" + today.getMonth() : today.getDate()) +
        "-" +
        today.getFullYear(),
    });
    if (docRef) {
      let response = await getAllCommentsOfAnArticle(newsId);
      response.message = "ADDED_SUCCESSFULLY";
      return response;
    } else {
      return {
        data: null,
        success: false,
        message: "",
      } as ServiceResponse<NewsCommentType[]>;
    }
  } catch (e) {
    return {
      data: null,
      success: false,
      message: e,
    } as ServiceResponse<NewsCommentType[]>;
  }
};

export const updateComment: (
  request: NewsCommentType
) => Promise<ServiceResponse<NewsCommentType[]>> = async (
  request: NewsCommentType
) => {
  try {
    await setDoc(doc(firestore, "comments", request.id), {
      userId: request.userId,
      newsId: request.newsId,
      content: request.content,
    });
    let response = await getAllCommentsOfAnArticle(request.newsId);
    response.message = "UPDATED_SUCCESSFULLY";
    return response;
  } catch (e) {
    return {
      data: null,
      success: false,
      message: e,
    } as ServiceResponse<NewsCommentType[]>;
  }
};
