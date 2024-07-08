type LinkType = { id: number; title: string; to: string };

const links: LinkType[] = [
  {
    id: 1,
    title: "Acceuil",
    to: "/",
  },
  /*{
    id: 2,
    title: "À propos",
    to: "/about",
  },*/
  {
    id: 3,
    title: "Actualité",
    to: "/news",
  },
  {
    id: 4,
    title: "Finance & affaires",
    to: "/finance-and-business",
  },
  {
    id: 5,
    title: "Contacts",
    to: "/contact-me",
  },
];

export default links;
