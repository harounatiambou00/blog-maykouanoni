import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./components";
import { AboutMe, ContactMe, Home, MontrealNewspaper, News } from "./pages";
import React from "react";

function App() {
  let { pathname } = useLocation();
  React.useEffect(() => {
    if (pathname === "/") {
      document.title = "MAYKOUANONI - Acceuil";
    } else if (pathname === "/about-me") {
      document.title = "MAYKOUANONI - Qui suis-je ?";
    } else if (pathname === "/news") {
      document.title = "MAYKOUANONI - Actualité";
    } else if (pathname === "/contact-me") {
      document.title = "MAYKOUANONI - Contacts";
    } else if (pathname === "/") {
      document.title = "MAYKOUANONI - Acceuil";
    } else {
      document.title = "MAYKOUANONI";
    }
  }, [pathname]);
  return (
    <div id="app" className="font-rubik font-light">
      <Header />
      <div className="sm:pt-48 lg:pt-24 sm:px-10 lg:px-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about-me" element={<AboutMe />} />
          <Route path="contact-me" element={<ContactMe />} />
          <Route path="news" element={<News />} />
          <Route path="montreal-newspapers" element={<MontrealNewspaper />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
