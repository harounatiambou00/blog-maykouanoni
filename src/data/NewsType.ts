import { BsThreeDots } from "react-icons/bs";
import NewsSection from "./NewsSectionType";
import { ReactNode } from "react";

export type NewsCategoriesType = "ARTICLE" | "NEWS" | "FINANCE" | "OTHERS";

export const newsCategories = [
  {
    key: "ARTICLE",
    label: "Articles",
  },
  {
    key: "NEWS",
    label: "Actualités",
  },
  {
    key: "FINANCE",
    label: "Finances & Affaires",
  },
  {
    key: "OTHERS",
    label: "Autres",
  },
] as {
  key: NewsCategoriesType;
  label: string;
}[];

export type NewsSubjectsType =
  | "OTHERS"
  | "SPORT"
  | "POLITIC"
  | "SCIENCE"
  | "ECONOMY";

export const newsSubjects = [
  {
    key: "OTHERS",
    label: "Autres",
  },
  {
    key: "POLITIC",
    label: "Politique",
  },
  {
    key: "SPORT",
    label: "Sports",
  },
] as {
  key: NewsSubjectsType;
  label: string;
}[];

export default interface NewsType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  lastModification: Date | string;
  publicationDate: Date | string;
  createdBy: string;
  authorName: string;
  imageUrl: string;
  sections: NewsSection[];
  category: NewsCategoriesType;
  subject: NewsSubjectsType;
  tags: string[];
  likedBy: string[];
}
