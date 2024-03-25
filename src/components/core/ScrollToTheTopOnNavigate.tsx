import React from "react";
import { useLocation } from "react-router-dom";

const ScrollToTheTopOnNavigate = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return <div></div>;
};

export default ScrollToTheTopOnNavigate;
