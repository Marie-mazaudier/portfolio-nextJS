"use client"; // Spécifie que ce fichier est un Client Component

import React, { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import Circle from "@/assets/icons/circle_red.svg";
import { MenusMenus } from "@/app/lib/graphQL/types/menu";
import useSticky from "@/app/lib/GSAP/sticky";
import NavItem from "@/components/molecules/navbar/NavItem";
import BuilderImage from "@/components/atoms/builder-image";
interface HeaderProps {
  globalData: any;
  menu: MenusMenus[];
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ logo, globalData, menu }) => {
  const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
  const [animateOverlay, setAnimateOverlay] = useState(false);
  useSticky({ offsetTop: 0, delay: 300 });

  // Transformer le menu en tableau de liens avec titre et url
  const navItems =
    menu[0]?.attributes?.items?.data.map((menuItem) => ({
      label: menuItem.attributes.title,
      href: menuItem.attributes.url || "#",
    })) || [];

  const headerData = {
    siteName: globalData.site_name,
    gitHubUrl: globalData.header.github.icon.data.attributes.url,
    gitHubLink: globalData.header.github.link,
  };
  return (
    <header className="sticky-element absolute z-10 transition duration-300 ease-in-out box-border flex flex-row justify-center grow shrink-0 p-5 md:py-8 w-full min-h-[80px]">
      <div className="box-border justify-center flex relative flex-row shrink-0 w-full max-w-[1200px] max-lg:items-center">
        <div className="box-border leading-[1em] item-center justify center flex lg:flex-row uppercase relative shrink-0 my-auto mr-auto w-6/12 lg:w-[13%] h-auto text-[1.2rem] font-textBold text-left text-primary max-sm:mt-1.5">
          {/*<Circle
            width="12px"
            height="12px"
            className="my-auto mr-5"
            fill="var(--accent-color)"
          />*/}
          <BuilderImage
            className="lg:mt-[-1px] md:mt-[-10px]"
            width={50}
            height={50}
            src={logo}
            alt="logo"
          />
          <a className="ml-3 mt-[5px]" href={"/"}>
            {headerData.siteName}
          </a>
        </div>
        <nav className="flex justify-center flex-col w-6/12 max-lg:hidden lg:w-[55%]  max-sm:hidden">
          {/* NavItem gère désormais le mapping et l'état actif */}
          <NavItem gitHubUrl={headerData.gitHubLink} navItems={navItems} />
        </nav>
        <HamburgerMenu
          isActive={hamburgerMenuActive}
          setIsActive={setHamburgerMenuActive}
          setAnimateOverlay={setAnimateOverlay}
          navItems={navItems}
          logo={logo}
          gitHubUrl={headerData.gitHubLink}
        />
      </div>
    </header>
  );
};

export default Header;
