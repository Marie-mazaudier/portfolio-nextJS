import React from "react";
import FooterItem from "@/components/molecules/navbar/FooterItem";

const footerItems = ["© test", "Mentions légales", "Réalisation par Marie / M"];

const Footer: React.FC = () => (
  <footer className=" border-t border-primary box-border bg-secondary flex relative flex-col shrink-0 px-5  w-full h-full min-h-[80px]">
    <section className="box-border flex relative flex-col grow shrink-0 px-5 py-8 mx-auto max-w-[1550px] min-h-[80px] ">
      <div className="box-border flex relative text-center flex-col md:flex-row shrink-0 md:gap-10 justify-center mx-auto w-full">
        {footerItems.map((item, index) => (
          <FooterItem key={index} text={item} />
        ))}
      </div>
    </section>
  </footer>
);

export default Footer;
