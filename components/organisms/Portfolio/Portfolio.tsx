"use client";

import React, { useRef, useEffect } from "react";
import ProjectSection from "@/components/molecules/portfolio/ProjectSection";
import { Heading2 } from "@/components/atoms/typography/headingText/Heading2";
import Trait from "@/assets/icons/trait.svg";
import useVerticalScroll from "@/app/lib/GSAP/verticalScroll";
interface ThemeColors {
  primary: string;
  secondary: string;
}

const Portfolio: React.FC = () => {
  // Set random colors directly
  const themeColors: ThemeColors = {
    primary: "var(--primary-color, #3498db)", // A shade of blue
    secondary: "var(--secondary-color, #FFFEEF)", // A shade of green
  };
  const myElementRef = useRef<HTMLDivElement>(null);

  // Appel direct du hook sans avoir à gérer l'effet
  useVerticalScroll(myElementRef, {
    direction: "diagonal", // Animation verticale (par défaut) | horizontale | diagonale
    //reverse: false, // L'animation se fait de bas en haut (par défaut)
    diagonalDirection: "top-right-to-bottom-left", // Animation diagonale top-right-to-bottom-left | bottom-left-to-top-right
  });
  const projects = [
    {
      title: "L'Empreinte",
      description:
        "Développement & web design de la V1 et V2 du site pour la marque Ecocertifié Peftrust (anciennement l'Empreinte).",
      stack: "Stack : Oxygen, Woocommerce",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets%2Fb7c2b5e165594b20b03520696ff96e46%2F4415b856ebb7414da501d26c4b573932",
      imageAlt: "L'Empreinte project screenshot",
      linkText: "Voir le site web",
    },
    {
      title: "Francine Joaillerie",
      description:
        "Collaboration avec l'agence iViera. Développement web, optimisations des performances.",
      stack: "Stack : Elementor, Woocommerce, API",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets%2Fb7c2b5e165594b20b03520696ff96e46%2Ffee5f7954d8243db909d00116430f771",
      imageAlt: "Francine Joaillerie project screenshot",
      linkText: "Voir le site web",
    },
    {
      title: "L'Empreinte",
      description:
        "Développement & web design de la V1 et V2 du site pour la marque Ecocertifié Peftrust (anciennement l'Empreinte).",
      stack: "Stack : Oxygen, Woocommerce",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets%2Fb7c2b5e165594b20b03520696ff96e46%2F4415b856ebb7414da501d26c4b573932",
      imageAlt: "L'Empreinte project screenshot",
      linkText: "Voir le site web",
    },
    {
      title: "Francine Joaillerie",
      description:
        "Collaboration avec l'agence iViera. Développement web, optimisations des performances.",
      stack: "Stack : Elementor, Woocommerce, API",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets%2Fb7c2b5e165594b20b03520696ff96e46%2Ffee5f7954d8243db909d00116430f771",
      imageAlt: "Francine Joaillerie project screenshot",
      linkText: "Voir le site web",
    },
  ];

  return (
    <section
      className="box-border flex flex-col  w-full shrink-0 p-5 min-h-[100px]"
      style={{ backgroundColor: themeColors.secondary }}>
      <div
        ref={myElementRef}
        className="box-border flex relative flex-row mr-5 h-auto justify-end items-center lg:mt-5 w-full ml-auto md:w-[80%]">
        <Heading2
          className="text-primary pr-5 md:pr-0"
          intent="bold"
          size="xxl">
          Projets
        </Heading2>
        <Trait
          stroke-width="1"
          width="250px"
          className="text-primary mx-auto mb-[-10px] md:mb-[-20px] " // Applique la couleur primary au SVG entier via currentColor
        />
        <Heading2
          className="text-primary pl-5 md:pl-0  md:pr-1"
          intent="bold"
          size="xxl">
          sélectionnés
        </Heading2>
      </div>
      <div className="box-border flex relative flex-row justify-center w-full">
        <div className="box-border flex relative flex-col  md:py-5  w-full md:max-w-[1250px] min-h-[100px]">
          <div
            className="box-border flex relative flex-col shrink-0 md:pt-10 md:pb-8 h-auto"
            style={{ backgroundColor: themeColors.secondary }}>
            <ProjectSection
              projects={projects.slice(0, 2)}
              primaryColor={themeColors.primary}
            />
            <ProjectSection
              projects={projects.slice(2)}
              primaryColor={themeColors.primary}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
