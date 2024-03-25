type LinkType = { id: number; title: string; to: string };

const links: LinkType[] = [
  {
    id: 0,
    title: "Acceuil",
    to: "/",
  },
  {
    id: 1,
    title: "Qui suis-je ?",
    to: "/about-me",
  },
  {
    id: 2,
    title: "Actualité",
    to: "/news",
  },
  {
    id: 3,
    title: "Le journal de montreal",
    to: "/montreal-newspapers",
  },
  {
    id: 4,
    title: "Contacts",
    to: "/contact-me",
  },
];

export default links;
