import React from "react";
import MenuIcon from "@/assets/icons/menu.svg";
import Close from "@/assets/icons/close.svg";

interface HamburgerMenuProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  setAnimateOverlay: (animate: boolean) => void;
  navItems: Array<{ label: string; href: string }>;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isActive,
  setIsActive,
  setAnimateOverlay,
  navItems,
}) => {
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
        className={`box-border flex fixed top-0 left-0 flex-col shrink-0 px-14 mt-14 h-screen bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } min-w-[auto] z-[100] max-lg:pt-36 max-lg:m-auto max-lg:h-screen max-sm:flex max-sm:w-screen max-sm:max-w-[100%]`}>
        {/* Bouton pour fermer le menu */}
        <button
          className="box-border relative shrink-0 mt-1.5 mb-2.5 ml-auto w-auto h-auto text-4xl font-light text-center cursor-pointer max-md:absolute max-md:top-5 max-md:right-5 max-md:mb-4"
          onClick={() => {
            setIsActive(false);
            setAnimateOverlay(false);
          }}
          aria-label="Close menu">
          <Close width="30px" height="30px" className="text-primary" />
        </button>
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="box-border relative shrink-0 mb-2.5 h-auto text-left cursor-pointer pointer-events-auto max-md:font-medium max-md:text-blue-700 max-md:uppercase">
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default HamburgerMenu;
