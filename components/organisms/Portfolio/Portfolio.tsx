import React, { useRef } from "react";
import CustomSlide from "@/components/molecules/slides/slide";
import ProjectSlide from "@/components/molecules/portfolio/ProjectSlide";
import { Heading2 } from "@/components/atoms/typography/headingText/Heading2";
import useFadeIn from "@/app/lib/GSAP/fadeIn";
import { PortfolioProps } from "@/app/lib/graphQL/types/portfolioProps";
import AnimatedLine from "@/app/lib/GSAP/AnimatedLine";
import HorizontalServices from "@/components/molecules/portfolio/HorizontalServices";
import Plus from "@/app/assets/icons/plus.svg";
import useFadeInUp from "@/app/lib/GSAP/fadeInUpDown";

const Portfolio: React.FC<PortfolioProps> = ({ projects, listItems }) => {
  const elementRef = useRef<HTMLHeadingElement>(null);

  // Formattage des projets pour passer à CustomSlide avec les bons noms de propriétés
  const formattedProjects = projects.map((project) => ({
    title: project.attributes.title,
    description_project: project.attributes.description_project,
    Client: project.attributes.Client,
    stacks: project.attributes.stacks,
    image: project.attributes.featured_image.data.attributes.url,
    link: project.attributes.button.link,
    width: project.attributes.featured_image.data.attributes.width,
    height: project.attributes.featured_image.data.attributes.height,
    site_category: project.attributes.site_category,
  }));

  useFadeIn({ repeat: false });
  useFadeInUp();

  return (
    <section
      id="portfolio"
      className="overflow-x-hidden box-border flex flex-col w-full shrink-0 px-5 py-16 lg:p-5 md:px-10 md:py-28  bg-secondary   before:bg-motif-bg-red-2  before:opacity-[0.03] before:bg-[length:100%] lg:before:bg-[length:80%] before:bg-no-repeat before:z-0 before:inset-0  before:absolute
      lg:before:bg-[90%_100%] before:bg-[90%_47%]  bg-blend-overlaybox-border relative  ">
      <div className="flex w-full lg:py-32">
        <div className="box-border flex relative flex-col mx-auto md:py-5 w-full md:max-w-[1200px] 2xl:max-w-[1300px]">
          <div className="box-border md:max-w-[1180px] 2xl:max-w-[1280px] flex relative flex-col-reverse lg:flex-row h-auto justify-between items-end md:mb-10 w-full ml-auto">
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
                className="border-t-solid border-1 mx-2 border-t-1 border-primary box-border relative w-full"
              />
            </div>

            <Heading2 className="text-accent text-right w-full lg:max-w-[30%] 2xl:max-w-[40%] uppercase ">
              <span className="text-outline">Mes</span>
              <br /> Projets
            </Heading2>
          </div>

          {/* Insertion du nouveau composant ici */}
          <HorizontalServices projects={projects} listItems={listItems} />

          <div className="box-border flex relative flex-col shrink-0 md:pt-10 md:pb-0 h-auto">
            <CustomSlide
              transition="fade"
              autoplay={true}
              arrowSizeMobile="65px"
              arrowSizeTablet="80px"
              arrowPositionMobile={{ left: "1%", right: "13%", top: "22%" }}
              arrowPositionTablet={{ left: "2%", right: "10%", top: "35%" }}
              arrowColorMobile="#fff"
              arrowColorTablet="#fff">
              {formattedProjects.map((project, index) => (
                <ProjectSlide
                  key={index}
                  title={project.title}
                  description_project={project.description_project}
                  client={project.Client}
                  stacks={project.stacks}
                  image={project.image}
                  link={project.link}
                  width={project.width}
                  height={project.height}
                  site_category={project.site_category}
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
