import React, { useState } from "react";
import NavItem from "@/components/molecules/navbar/NavItem";
import HamburgerMenu from "./HamburgerMenu";
import MenuIcon from "@/assets/icons/menu.svg";
import GitHub from "@/assets/icons/GitHub.svg";
import Link from "next/link";
import useSticky from "@/app/lib/GSAP/sticky";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);
  const [animateOverlay, setAnimateOverlay] = useState(false);
  useSticky({ offsetTop: 0, delay: 500 }); // 100px depuis le haut de la page avec un délai de 500ms avant de rendre sticky

  const navItems = [
    { label: "À propos", href: "/about" },
    { label: "Projets", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky-element transition duration-300 ease-in-out box-border flex relative flex-row justify-center grow shrink-0  p-5 w-full bg-secondary  min-h-[80px]">
      <div className="box-border justify-center flex relative flex-row shrink-0 w-full  max-w-[1300px] max-lg:items-center ">
        <h1 className="box-border relative shrink-0 my-auto mr-auto w-7/12 h-auto text-nav font-regular text-left text-blue-800 tracking-[2px] max-lg:w-6/12 max-sm:mt-1.5 max-sm:text-sm max-sm:w-[70%]">
          <a href={"/"}> MARIE MAZAUDIER</a>
        </h1>
        <nav className="flex flex-col w-6/12 max-lg:hidden max-lg:w-5/12 max-sm:hidden">
          <ul className="flex gap-5 max-lg:flex-col">
            {navItems.map((item, index) => (
              <NavItem key={index} label={item.label} href={item.href} />
            ))}
            <li className="flex flex-col w-2/12 max-lg:ml-0 max-lg:w-full">
              {/* Le fichier SVG doit être dans le dossier public/svg/menu.svg */}
              <GitHub
                width="30px"
                height="30px"
                className="text-primary m-auto " // Applique la couleur primary au SVG entier via currentColor
              />
            </li>
          </ul>
        </nav>
        <HamburgerMenu
          isActive={hamburgerMenuActive}
          setIsActive={setHamburgerMenuActive}
          setAnimateOverlay={setAnimateOverlay}
          navItems={navItems}
        />
      </div>
    </header>
  );
};

export default Header;
