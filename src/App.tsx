import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./components";
import {
  AboutMe,
  ContactMe,
  Home,
  FinanceAndBusiness,
  News,
  NewsItemDetails,
} from "./pages";
import {
  SignInPage,
  Dashboard,
  AdminLayout,
  AdminNewsPage,
} from "./pages/admins";
import React from "react";

function App() {
  let { pathname } = useLocation();
  React.useEffect(() => {
    if (pathname === "/") {
      document.title = "MAYKOUANONI - Acceuil";
    } else if (pathname === "/about-me") {
      document.title = "MAYKOUANONI - Qui suis-je ?";
    } else if (pathname === "/news") {
      document.title = "MAYKOUANONI - Actualités";
    } else if (pathname === "/contact-me") {
      document.title = "MAYKOUANONI - Contacts";
    } else if (pathname === "/finance-and-business") {
      document.title = "MAYKOUANONI - Finance & Affaires";
    } else {
      document.title = "MAYKOUANONI";
    }
  }, [pathname]);
  return (
    <div id="app" className="font-rubik font-light">
      <Header />
      <div className="sm:pt-48 lg:pt-24 sm:px-10 lg:px-10">
        <Routes>
          <Route path="/">
            <Route path="about-me" element={<AboutMe />} />
            <Route path="contact-me" element={<ContactMe />} />
            <Route index path="news" element={<News />} />
            <Route index element={<News />} />
            <Route path="news/:newsItemId" element={<NewsItemDetails />} />
            <Route
              path="finance-and-business"
              element={<FinanceAndBusiness />}
            />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="news" element={<AdminNewsPage />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
