import React from "react";
import { PageLayout } from "../../layouts";
import Landing from "./landing/Landing";
import OurValues from "./our_values/OurValues";
import Team from "./team/Team";
import SubjectsSection from "../home/subjects_section/SubjectsSection";
import Process from "./process/Process";

const About = () => {
  return (
    <div className="w-full min-h-screen pb-10">
      <div className="absolute w-full h-full drop-shadow-sm top-0 left-0 -z-50">
        <svg
          className="w-full h-full"
          viewBox="0 0 80 100"
          preserveAspectRatio="none"
          overflow="visible"
        >
          <polygon points="0,100 100,0 0,0" className="fill-green-50" />
        </svg>
      </div>
      <Landing />
      <OurValues />
      <Team />
      <Process />
      <SubjectsSection />
    </div>
  );
};

export default About;
