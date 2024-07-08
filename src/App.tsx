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
  SignUpPage,
  SignInPage,
  AccountPage,
} from "./pages";
import { Dashboard, AdminLayout, AdminNewsPage } from "./pages/admins";
import React from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { RootState } from "./redux/store";
import { UserType } from "./data";
import { setCurrentUser } from "./redux/slices/currentUserSlice";
import { isAdmin } from "./services/AuthService";
import { setIsAdmin } from "./redux/slices/isAdminSlice";
import PersonalInfoPage from "./pages/account/personal_info/PersonalInfoPage";
import SettingsPage from "./pages/account/settings/SettingsPage";
import HelpPage from "./pages/account/help/HelpPage";
import SavedNewsPage from "./pages/account/saved_news/SavedNewsPage";

function App() {
  let { pathname } = useLocation();
  const dispatch = useAppDispatch();
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
  let currentUser = useAppSelector(
    (state: RootState) => state.currentUserSlice.user
  );

  React.useEffect(() => {
    let userFromLocaleStorage = localStorage.getItem("currentUser");
    if (userFromLocaleStorage) {
      dispatch(
        setCurrentUser({
          user: JSON.parse(userFromLocaleStorage) as UserType,
        })
      );
    }
  }, []);

  React.useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          uid: currentUser.uid,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          acceptedToReceivePromotions: currentUser.acceptedToReceivePromotions,
          createdAt: currentUser.createdAt,
        })
      );
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const checkIfUserIsAdmin = async (uid: string) => {
    let response = await isAdmin(uid);
    if (response.data) {
      dispatch(setIsAdmin({ isAdmin: true }));
    } else {
      dispatch(setIsAdmin({ isAdmin: false }));
    }
  };
  React.useEffect(() => {
    if (currentUser?.uid) checkIfUserIsAdmin(currentUser.uid);
  }, [currentUser]);

  return (
    <div id="app" className="font-playwrite text-sm font-light">
      <Header />
      <div className="sm:pt-48 lg:pt-24 sm:px-10 lg:px-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about-me" element={<AboutMe />} />
          <Route path="contact-me" element={<ContactMe />} />
          <Route path="account" element={<AccountPage />}>
            <Route path="" element={<PersonalInfoPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="saved_articles" element={<SavedNewsPage />} />
          </Route>
          <Route path="news" element={<News />} />
          <Route path="news/:newsItemId" element={<NewsItemDetails />} />
          <Route path="finance-and-business" element={<FinanceAndBusiness />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="news" element={<AdminNewsPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
