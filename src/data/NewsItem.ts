export interface NewsItemSection {
  id: number;
  title: string;
  description: string;
  sectionImage?: string;
}
export default interface NewsItem {
  id: number;
  title: string;
  description: string;
  lastModification: Date;
  publicationDate: Date;
  wroteBy: string;
  image: string;
  sections: NewsItemSection[];
  tags: string[];
}

export const news = [
  {
    id: 1,
    title: "New Study Shows Benefits of Regular Exercise",
    description:
      "Researchers have found that regular exercise can lead to significant improvements in physical and mental health.",
    lastModification: new Date("2024-03-24"),
    publicationDate: new Date("2024-03-24"),
    wroteBy: "John Smith",
    image:
      "https://s.france24.com/media/display/cd0c6652-e542-11ee-b2c1-005056bf30b7/w:980/p:16x9/000_33QT29F.webp",
    sections: [
      {
        id: 1,
        title: "Health",
        description:
          "Discover the latest findings on the health benefits of exercise.",
        sectionImage: "health.jpg",
      },
      {
        id: 2,
        title: "Fitness",
        description:
          "Learn how to incorporate regular exercise into your fitness routine.",
        sectionImage: "fitness.jpg",
      },
    ],
    tags: ["IA", "Machine Learning", "Computer Vision"],
  },
  {
    id: 2,
    title: "Tech Giant Unveils New Smartphone Model",
    description:
      "The latest smartphone from XYZ Corporation promises cutting-edge features and enhanced performance.",
    lastModification: new Date("2024-03-23"),
    publicationDate: new Date("2024-03-24"),
    wroteBy: "Emily Johnson",
    image:
      "https://images.radio-canada.ca/q_auto,w_1200/v1/ici-info/16x9/senegal-elections-24253.jpg",
    sections: [
      {
        id: 3,
        title: "Technology",
        description:
          "Stay updated on the latest advancements in the tech industry.",
        sectionImage: "technology.jpg",
      },
      {
        id: 4,
        title: "Gadgets",
        description: "Explore the newest gadgets hitting the market.",
        sectionImage: "gadgets.jpg",
      },
    ],
    tags: ["Politicque", "Niger"],
  },
  {
    id: 3,
    title: "Climate Change Conference Yields New Agreements",
    description:
      "Global leaders have reached agreements on measures to combat climate change and reduce carbon emissions.",
    lastModification: new Date("2024-03-22"),
    publicationDate: new Date("2024-03-24"),
    wroteBy: "Alexandra Lee",
    image:
      "https://img.lemde.fr/2024/02/15/0/0/5500/3667/556/0/75/0/5033fb3_2024-02-15t175804z-783958303-rc2436ahygqu-rtrmadp-3-westafrica-politics.JPG",
    sections: [
      {
        id: 5,
        title: "Environment",
        description:
          "Stay informed about efforts to protect the environment and address climate change.",
        sectionImage: "environment.jpg",
      },
      {
        id: 6,
        title: "Sustainability",
        description:
          "Learn about sustainable practices and initiatives around the world.",
        sectionImage: "sustainability.jpg",
      },
    ],
    tags: ["Economie", "CEDEAO", "Afrique"],
  },
  {
    id: 4,
    title: "Space Agency Plans Mission to Mars",
    description:
      "NASA announces plans for a manned mission to Mars, aiming to land astronauts on the Red Planet within the next decade.",
    lastModification: new Date("2024-03-21"),
    publicationDate: new Date("2024-03-24"),
    wroteBy: "Michael Chen",
    image:
      "https://img.lemde.fr/2024/03/25/0/0/5500/3667/556/0/75/0/4e30d9d_2024-03-25t133932z-1593650214-rc21t6ah8e16-rtrmadp-3-israel-palestinians-un.JPG",
    sections: [
      {
        id: 7,
        title: "Space Exploration",
        description:
          "Explore the latest developments in space exploration and astronomy.",
        sectionImage: "space.jpg",
      },
      {
        id: 8,
        title: "Mars",
        description:
          "Learn more about the Red Planet and upcoming missions to explore it.",
        sectionImage: "mars.jpg",
      },
    ],
    tags: ["Demographie", "Montreal", "2024"],
  },
] as NewsItem[];
