"use client";

import React, { useRef } from "react";
import ProjectSection from "@/components/molecules/portfolio/ProjectSection";
import { Heading2 } from "@/components/atoms/typography/headingText/Heading2";
import Trait from "@/assets/icons/trait.svg";
import useVerticalScroll from "@/app/lib/GSAP/verticalScroll";

// Interface pour les attributs d'un projet
interface ProjectAttributes {
  title: string;
  description: string;
  stacks: { id: number; text: string }[];
  button: { text: string; link: string };
  featured_image: {
    data: {
      attributes: {
        url: string;
        width: number;
        height: number;
        alternativeText: string | null;
      };
    };
  };
}
interface PortfolioProps {
  projects: {
    id: string;
    attributes: ProjectAttributes;
  }[];
}
interface ProjectData {
  title: string;
  description: string;
  stack: string;
  imageSrc: string;
  imageAlt: string;
  linkText: string;
  width: number;
  height: number;
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  const myElementRef = useRef<HTMLDivElement>(null);
  // Animation de défilement vertical
  useVerticalScroll(myElementRef, {
    direction: "diagonal",
    diagonalDirection: "top-right-to-bottom-left",
  });

  const formattedProjects: ProjectData[] = projects.map((project) => ({
    title: project.attributes.title,
    description: project.attributes.description,
    stack: project.attributes.stacks.map((stack) => stack.text).join(", "),
    imageSrc: project.attributes.featured_image.data.attributes.url,
    imageAlt:
      project.attributes.featured_image.data.attributes.alternativeText ||
      "Image du projet",
    linkText: project.attributes.button.text,
    width: project.attributes.featured_image.data.attributes.width,
    height: project.attributes.featured_image.data.attributes.height,
  }));

  return (
    <section className="box-border flex flex-col  w-full shrink-0 p-5 min-h-[100px] bg-secondary ">
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
          className="text-primary mx-auto mb-[-10px] md:mb-[-20px]" // Applique la couleur primary au SVG entier via currentColor
        />
        <Heading2
          className="text-primary pl-5 md:pl-0  md:pr-1"
          intent="bold"
          size="xxl">
          sélectionnés
        </Heading2>
      </div>
      <div className="box-border flex relative flex-row justify-center w-full">
        <div className="box-border flex relative flex-col md:py-5 w-full md:max-w-[1580px] min-h-[100px]">
          <div className="box-border flex relative flex-col shrink-0 md:pt-10 md:pb-8 h-auto bg-secondary ">
            {/* Envoi des projets convertis à ProjectSection */}
            <ProjectSection
              projects={formattedProjects} // Les 2 premiers projets
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
