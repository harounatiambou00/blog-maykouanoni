type LinkType = { id: number; title: string; to: string };

const links: LinkType[] = [
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
    title: "Finance & affaires",
    to: "/finance-and-business",
  },
  {
    id: 4,
    title: "Contacts",
    to: "/contact-me",
  },
];

export default links;
