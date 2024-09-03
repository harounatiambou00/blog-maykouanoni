import React from "react";
import { PiNewspaper } from "react-icons/pi";
import { Button, IconButton } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import NewsLetterSection from "./newsletter_section/NewsLetterSection";
import HeroSection from "./hero_section/HeroSection";
import RecentArticlesSection from "./recent_aticles_section/RecentArticlesSection";
import PopularArticlesSection from "./popular_articles_section/PopularArticlesSection";
import SubjectsSection from "./subjects_section/SubjectsSection";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="relative isolate pb-14">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="-z-10 relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary to-green-700 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <HeroSection />
        <RecentArticlesSection />
        <SubjectsSection />
        <PopularArticlesSection />
        <NewsLetterSection />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
