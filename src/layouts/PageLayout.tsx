import React from "react";
type Props = {
  title: string;

  children: React.ReactElement;
};
const PageLayout = ({ title, children }: Props) => {
  return (
    <div className="w-full">
      <div className="border-b border-primary sm:pt-5 sm:pb-10 lg:pt-5 lg:pb-5 sm:text-6xl lg:text-8xl font-kalnia font-semibold text-center uppercase">
        {title}
      </div>
      <div className="pt-5 min-h-screen">{children}</div>
    </div>
  );
};

export default PageLayout;
