"use client";

import React from "react";
import MenuIcon from "@/assets/icons/menu.svg";
import Close from "@/assets/icons/close.svg";
import BuilderImage from "@/components/atoms/builder-image";
import GitHub from "@/assets/icons/GitHub.svg";

interface HamburgerMenuProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  setAnimateOverlay: (animate: boolean) => void;
  navItems: Array<{ label: string; href: string }>;
  logo: string;
  gitHubUrl: string;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isActive,
  setIsActive,
  setAnimateOverlay,
  logo,
  navItems,
  gitHubUrl,
}) => {
  const handleCloseMenu = () => {
    setIsActive(false);
    setAnimateOverlay(false);
  };

  return (
    <div className="box-border hidden relative flex-col shrink-0  mt-0  max-lg:flex  max-lg:ml-auto max-lg:h-auto  ">
      <button
        className="hamburger-container box-border relative  w-auto h-auto text-3xl text-center cursor-pointer"
        onClick={() => {
          setIsActive(true);
          setAnimateOverlay(true);
        }}
        aria-label="Open menu">
        <MenuIcon
          width="30px"
          height="30px"
          className="text-primary" // Applique la couleur primary au SVG entier via currentColor
        />
      </button>
      <nav
        className={`box-border flex fixed top-0 left-0 flex-col justify-center shrink-0 px-14 mt-10 h-screen bg-secondary shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } min-w-[auto] z-[100] max-lg:pb-20 max-lg:m-auto max-lg:h-screen max-sm:flex max-sm:w-screen max-sm:max-w-[100%]   before:bg-motif-bg-red-2 before:opacity-[0.055] before:bg-[length:100%] lg:before:bg-[length:80%] before:bg-no-repeat before:z-0 before:inset-0  before:absolute
 before:bg-[100%_102%] `}>
        {/* Bouton pour fermer le menu */}
        <button
          className="box-border relative shrink-0 mt-1.5 mb-2.5 ml-auto w-auto h-auto text-4xl font-light text-center cursor-pointer max-md:absolute max-md:top-5 max-md:right-5 max-md:mb-4"
          onClick={handleCloseMenu}
          aria-label="Close menu">
          <Close width="30px" height="30px" className="text-primary" />
        </button>
        <a className="z-50" href="/">
          <BuilderImage
            className="pb-14"
            width={105}
            height={105}
            src={logo}
            alt="logo"
          />
        </a>
        {/* Liste des liens du menu */}
        <ul className="h-[30vh] flex flex-col justify-between item-start">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="box-border tracking-wide hover:text-accent relative shrink-0 mb-2.5 h-auto text-left cursor-pointer pointer-events-auto max-md:font-regular max-md:text-primary max-md:uppercase"
                onClick={handleCloseMenu} // Ajout de l'événement pour fermer le menu au clic
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="jusitfy-left flex flex-row z-50">
            {/* Lien vers le GitHub */}
            <a target="_blank" href={gitHubUrl}>
              <GitHub
                width="30px"
                height="30px"
                className="text-primary m-auto " // Applique la couleur primary au SVG entier via currentColor
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
