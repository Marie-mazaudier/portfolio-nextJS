"use client"; // Spécifie que ce fichier est un Client Component

import { scrollToElementById } from "@/app/lib/utils/scrollToElement";
import React, { useMemo } from "react";
import useActiveSection from "@/app/hooks/useActiveSection";

interface NavItemProps {
  navItems: {
    label: string;
    href: string;
  }[];
}

const NavItem: React.FC<NavItemProps> = ({ navItems }) => {
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
    <ul className="flex gap-5 max-lg:flex-col">
      {navItems.map((item, index) => (
        <li
          key={index}
          className="flex flex-col w-4/12 max-md:ml-0 max-md:w-full">
          <a
            href={item.href}
            onClick={(e) => {
              e.preventDefault(); // Empêche le comportement par défaut du lien
              scrollToElementById(item.href.substring(1)); // Appelle la fonction pour scroller vers l'élément
            }}
            className={`box-border uppercase relative shrink-0 my-auto m-auto h-auto text-nav font-regular text-left transition ${
              activeSection === item.href.substring(1)
                ? "text-accent"
                : "text-primary"
            } hover:text-accent`}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavItem;
