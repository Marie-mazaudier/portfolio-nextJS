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
    <div className="relative w-[100vw] left-[50%] ml-[-50vw] mt-8 lg:mt-14 overflow-hidden whitespace-nowrap">
      <div ref={listContainerRef} className="flex whitespace-nowrap">
        <List
          lists={listItems}
          direction="horizontal"
          separator={true}
          separatorHeight="8px"
          separatorColor="red"
          className="text-primary text-[1rem]"
          alignment="center"
          alignmentMobile="left"
          alignmentTablet="left"
          gap={115}
          gapMobile={50}
          gapTablet={40}
          fontSize="lg"
          separatorContent={
            <CircleRed
              width="8px"
              height="8px"
              stroke="var(--accent-color)"
              fill="var(--accent-color)"
              className="border-accent rounded-full"
            />
          }
        />

        {/* Duplication pour le défilement fluide (affiché uniquement sur desktop) */}
        {!isMobile && (
          <>
            <div className="flex mx-12 flex-col justify-end">
              <CircleRed
                width="8px"
                height="8px"
                stroke="var(--accent-color)"
                fill="var(--accent-color)"
                className="border-accent rounded-full m-auto"
              />
            </div>
            <List
              lists={listItems}
              direction="horizontal"
              separator={true}
              separatorHeight="8px"
              separatorColor="red"
              className=" text-primary text-[1rem]"
              alignment="center"
              alignmentMobile="left"
              alignmentTablet="left"
              gap={115}
              gapMobile={25}
              gapTablet={40}
              fontSize="lg"
              separatorContent={
                <CircleRed
                  width="8px"
                  height="8px"
                  stroke="var(--accent-color)"
                  fill="var(--accent-color)"
                  className="border-accent rounded-full"
                />
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HorizontalScrollList;
