"use client";

import React, { useRef } from "react";
import List from "@/components/atoms/list/list"; // Assurez-vous que le composant List est bien importé
import CircleRed from "@/app/assets/icons/circle_red.svg";
import useVerticalScroll from "@/app/lib/GSAP/verticalScroll"; // Import du fichier GSAP
import { PortfolioProps } from "@/app/lib/graphQL/types/portfolioProps";
import { useMediaQuery } from "react-responsive"; // Import du hook pour détecter la taille d'écran

const HorizontalScrollList: React.FC<PortfolioProps> = ({ listItems }) => {
  // Créer une référence pour la div contenant la liste
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Appliquer le scroll horizontal en fonction du scroll vertical de la page
  useVerticalScroll(listContainerRef, {
    direction: "horizontal", // On active le scroll horizontal
    from: { x: -500 }, // Le point de départ pour le défilement horizontal
    to: { x: 0 }, // La fin du défilement horizontal
    scrub: 1, // Suivre le défilement de la page
    start: "top bottom", // Démarrer l'animation quand le conteneur entre dans la vue
    end: "+=1000", // La distance de défilement
  });

  // Détecter si l'utilisateur est sur mobile
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="relative  overflow-hidden whitespace-nowrap">
      <div ref={listContainerRef} className="flex whitespace-nowrap">
        <List
          lists={listItems}
          direction="horizontal"
          separator={true}
          separatorHeight="8px"
          separatorColor="red"
          className="text-primary mr-2 text-[0.90rem] lg:text-[0.95rem] bg-[#f9f7ea] px-4 lg:px-6 py-1 rounded-full "
          alignment="center"
          alignmentMobile="left"
          alignmentTablet="left"
          gap={20}
          gapMobile={20}
          gapTablet={20}
          fontSize="xs"
          separatorContent={
            <CircleRed
              width="5px"
              height="5px"
              stroke="var(--accent-color)"
              fill="var(--accent-color)"
              className="border-accent rounded-full"
            />
          }
        />
      </div>
    </div>
  );
};

export default HorizontalScrollList;
