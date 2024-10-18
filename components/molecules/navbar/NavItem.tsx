"use client"; // Spécifie que ce fichier est un Client Component

import { scrollToElementById } from "@/app/lib/utils/scrollToElement";
import React, { useMemo } from "react";
import useActiveSection from "@/app/hooks/useActiveSection";
import GitHub from "@/assets/icons/GitHub.svg";

interface NavItemProps {
  navItems: {
    label: string;
    href: string;
  }[];
  gitHubUrl: string;
}

const NavItem: React.FC<NavItemProps> = ({ navItems, gitHubUrl }) => {
  // Extraire dynamiquement les IDs des ancres à partir des href des navItems
  const sectionIds = useMemo(
    () =>
      navItems
        .filter((item) => item.href.startsWith("#")) // Ne garder que les ancres
        .map((item) => item.href.substring(1)), // Extraire l'ID (enlever le "#")
    [navItems]
  );

  // Utiliser le hook pour détecter la section active
  const activeSection = useActiveSection(sectionIds);

  return (
    <ul className="flex justify-center items-center space-x-10 max-lg:flex-col w-full">
      {navItems.map((item, index) => (
        <li key={index} className="text-center">
          <a
            href={item.href}
            onClick={(e) => {
              e.preventDefault(); // Empêche le comportement par défaut du lien
              scrollToElementById(item.href.substring(1)); // Appelle la fonction pour scroller vers l'élément
            }}
            className={`box-border uppercase relative shrink-0 my-auto h-auto text-nav font-regular transition ${
              activeSection === item.href.substring(1)
                ? "text-accent"
                : "text-primary"
            } hover:text-accent`}>
            {item.label}
          </a>
        </li>
      ))}
      <li className="text-center">
        {/* Lien vers le GitHub */}
        <a href={gitHubUrl}>
          <GitHub
            width="30px"
            height="30px"
            className="text-primary m-auto " // Applique la couleur primary au SVG entier via currentColor
          />
        </a>
      </li>
    </ul>
  );
};

export default NavItem;
