"use client"; // Ce fichier est un Client Component

import React from "react";

interface BackgroundSectionProps {
  imageUrl: string;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({ imageUrl }) => {
  return (
    <div
      className="box-border flex relative flex-col shrink-0 p-5 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-hidden="true">
      <section
        className="box-border flex relative flex-col grow shrink-0 self-stretch p-5 mx-auto w-full bg-center bg-no-repeat bg-cover max-w-[1200px] min-h-[432px]"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </div>
  );
};

export default BackgroundSection;
