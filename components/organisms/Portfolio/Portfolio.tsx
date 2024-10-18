"use client";

import React, { useRef } from "react";
import CustomSlide from "@/components/molecules/slides/slide"; // Importation de CustomSlide
import ProjectSlide from "@/components/molecules/portfolio/ProjectSlide";
import { Heading2 } from "@/components/atoms/typography/headingText/Heading2";
import useVerticalScroll from "@/app/lib/GSAP/verticalScroll";
import List from "@/components/atoms/list/list";
import Plus from "@/app/assets/icons/plus.svg";
import CircleRed from "@/app/assets/icons/circle_red.svg";
import useFadeIn from "@/app/lib/GSAP/fadeIn";
// Import des props combinés
import { PortfolioProps } from "@/app/lib/graphQL/types/portfolioProps";
import AnimatedLine from "@/app/lib/GSAP/AnimatedLine";

const Portfolio: React.FC<PortfolioProps> = ({ projects, listItems }) => {
  const myElementRef = useRef<HTMLDivElement>(null);
  // Animation de défilement vertical
  useVerticalScroll(myElementRef, {
    direction: "diagonal",
    diagonalDirection: "top-right-to-bottom-left",
  });
  // Formattage des projets pour passer à CustomSlide avec les bons noms de propriétés
  const formattedProjects = projects.map((project) => ({
    title: project.attributes.title,
    description_project: project.attributes.description_project, // Utiliser description_project, pas description
    Client: project.attributes.Client, // Correction: renommer `client` en `Client`
    stacks: project.attributes.stacks, // Correction: renommer `stack` en `stacks`
    image: project.attributes.featured_image.data.attributes.url, // Correction: renommer `imageSrc` en `image`
    link: project.attributes.button.link, // Correction: renommer `linkText` en `link`
    width: project.attributes.featured_image.data.attributes.width,
    height: project.attributes.featured_image.data.attributes.height,
  }));

  useFadeIn({ repeat: false });
  const elementRef = useRef<HTMLHeadingElement>(null);

  return (
    <section
      id="portfolio"
      ref={elementRef}
      className="fade-in  box-border flex flex-col w-full shrink-0 px-5 py-20 lg:p-5 md:px-10 md:py-28  bg-secondary   before:bg-motif-bg-red-2 before:opacity-[0.055] before:bg-[length:100%] lg:before:bg-[length:80%] before:bg-no-repeat before:z-0 before:inset-0  before:absolute
 before:bg-[100%_102%]  bg-blend-overlaybox-border relative  ">
      <div className="flex w-full lg:py-32">
        <div className="box-border flex relative  flex-col mx-auto md:py-5 w-full md:max-w-[1200px]">
          <div
            /*ref={myElementRef}*/
            className="box-border   md:max-w-[1180px] flex relative  flex-col-reverse lg:flex-row   h-auto justify-between items-end md:mb-10  w-full ml-auto ">
            <div className="flex w-full lg:w-[60%] flex-row items-center">
              <Plus
                width="60px"
                height="60px"
                strokeWidth="1px"
                stroke="#000"
              />
              <AnimatedLine
                direction="right"
                duration={2}
                color="primary"
                className=" border-t-solid border-1 mx-2 border-t-1 border-primary  box-border relative  w-full"
              />
            </div>
            <Heading2 className="text-primary  text-right w-full lg:max-w-[30%] 2xl:max-w-[40%] 	uppercase ">
              <span className="text-outline-secondary">
                Mes{/*mainTitle.split(" ")[0]}*/}
              </span>
              {/* Premier mot */}
              {/*mainTitle.split(" ").slice(1).join(" ")}{" "}
              {/* Le reste du texte */}
              <br /> Projets
            </Heading2>
          </div>
          <div className=" lg:pl-0 w-full mt-8 lg:mt-14 overflow-x-auto whitespace-nowrap flex flex-nowrap lg:overflow-hidden">
            <List
              lists={listItems}
              direction="horizontal"
              separator={true}
              separatorHeight="8px"
              separatorColor="red"
              className="text-primary text-[1rem] "
              alignment="center"
              alignmentMobile="left" // Alignement pour mobile
              alignmentTablet="left" // Alignement pour tablette
              gap={115}
              gapMobile={25} // Gap spécifique pour mobile
              gapTablet={40} // Gap spécifique pour tablette
              fontSize="lg"
              separatorContent={
                <CircleRed
                  width="8px"
                  height="8px"
                  stroke="var(--accent-color)"
                  fill="var(--accent-color)"
                  className=" border-accent rounded-full "
                />
              }
            />
          </div>
          <div className="box-border flex relative flex-col shrink-0  md:pt-10 md:pb-8 h-auto  ">
            {/* Utilisation du slider avec les projets formatés */}
            <CustomSlide
              transition="fade"
              autoplay={true}
              arrowSizeMobile="40px" // Taille des flèches sur mobile
              arrowSizeTablet="80px" // Taille des flèches sur tablette
              arrowPositionMobile={{ left: "2%", right: "8%", top: "25%" }}
              arrowPositionTablet={{ left: "2%", right: "10%", top: "35%" }}
              arrowColorMobile="#fff" // Couleur des flèches sur mobile
              arrowColorTablet="#fff" // Couleur des flèches sur tablette
            >
              {formattedProjects.map((project, index) => (
                <ProjectSlide
                  key={index}
                  title={project.title}
                  description_project={project.description_project} // Utiliser `description_project` correctement
                  client={project.Client}
                  stacks={project.stacks}
                  image={project.image}
                  link={project.link}
                  width={project.width}
                  height={project.height}
                />
              ))}
            </CustomSlide>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
