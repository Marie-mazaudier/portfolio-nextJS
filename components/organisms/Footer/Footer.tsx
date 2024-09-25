"use client"; // Spécifie que ce fichier est un Client Component

import React from "react";
import FooterItem from "@/components/molecules/navbar/FooterItem";

interface FooterProps {
  globalData: {
    footer: {
      copyright: string;
      links: {
        id: string;
        link: string;
        text: string;
      }[];
    };
  };
}

const Footer: React.FC<FooterProps> = ({ globalData }) => {
  const { footer } = globalData;

  return (
    <footer className="border-t border-primary box-border bg-secondary flex relative flex-col shrink-0 px-5 w-full h-full min-h-[80px]">
      <section className="box-border flex relative flex-col grow shrink-0 px-5 py-8 mx-auto max-w-[1550px] min-h-[80px]">
        <div className="box-border flex relative text-center flex-col md:flex-row shrink-0 md:gap-10 justify-center mx-auto w-full">
          <FooterItem text={footer.copyright} />
          {footer.links.map((link) => (
            <FooterItem key={link.id} text={link.text} link={link.link} />
          ))}
        </div>
      </section>
    </footer>
  );
};

export default Footer;
