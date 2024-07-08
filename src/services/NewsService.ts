import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ServiceResponse } from "../data";
import NewsType, {
  NewsCategoriesType,
  NewsSubjectsType,
} from "../data/NewsType";
import { firestore } from "../config/firebase-config";
import NewsSection from "../data/NewsSectionType";

export type AddNewsDTO = {
  title: string;
  subtitle: string;
  description: string;
  createdBy: string;
  authorName: string;
  imageFile: File;
  sections: NewsSection[];
  category: NewsCategoriesType;
  subject: NewsSubjectsType;
  tags: string[];
};
const AddNews: (
  request: AddNewsDTO
) => Promise<ServiceResponse<NewsType>> = async (request: AddNewsDTO) => {
  try {
    let docRef = await addDoc(collection(firestore, "news"), request);
    if (docRef) {
      return {
        data: null,
        success: true,
        message: "ADDED_SUCCESSFULLY",
      } as ServiceResponse<NewsType>;
    } else {
      return {
        data: null,
        success: false,
        message: "",
      } as ServiceResponse<NewsType>;
    }
  } catch (e) {
    return {
      data: null,
      success: false,
      message: e,
    } as ServiceResponse<NewsType>;
  }
};

export const likeArticle: (
  article: NewsType,
  userId: string
) => Promise<ServiceResponse<NewsType>> = async (
  article: NewsType,
  userId: string
) => {
  try {
    let newArticle = { ...article };
    newArticle.likedBy.push(userId);
    await setDoc(doc(firestore, "news", article.id), newArticle);

    return {
      data: null,
      success: true,
      message: "LIKED_SUCCESSFULLY",
    } as ServiceResponse<NewsType>;
  } catch (e) {
    return {
      data: null,
      success: false,
      message: e,
    } as ServiceResponse<NewsType>;
  }
};

export const disLikeArticle: (
  article: NewsType,
  userId: string
) => Promise<ServiceResponse<NewsType>> = async (
  article: NewsType,
  userId: string
) => {
  try {
    let newArticle = {
      ...article,
      likedBy: article.likedBy.filter((u) => u != userId),
    };
    await setDoc(doc(firestore, "news", article.id), newArticle);

    return {
      data: null,
      success: true,
      message: "LIKED_SUCCESSFULLY",
    } as ServiceResponse<NewsType>;
  } catch (e) {
    return {
      data: null,
      success: false,
      message: e,
    } as ServiceResponse<NewsType>;
  }
};
