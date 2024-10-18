import React from "react";

interface BackgroundSectionProps {
  children?: React.ReactNode;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({ children }) => {
  return (
    <section className="box-border  flex relative flex-col grow shrink-0  px-5  mx-auto w-full bg-fixed  bg-center bg-no-repeat bg-cover bg-[url(https://cdn.builder.io/api/v1/image/assets%2Fb7c2b5e165594b20b03520696ff96e46%2Fb685e76241aa4c9783a43adc8c1dcc0f)]  min-h-[60vh]">
      {children}
    </section>
  );
};

export default BackgroundSection;
