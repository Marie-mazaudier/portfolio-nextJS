import React, { useRef } from "react";
import CustomSlide from "@/components/molecules/slides/slide";
import ProjectSlide from "@/components/molecules/portfolio/ProjectSlide";
import { Heading2 } from "@/components/atoms/typography/headingText/Heading2";
import useFadeIn from "@/app/lib/GSAP/fadeIn";
import { PortfolioProps } from "@/app/lib/graphQL/types/portfolioProps";
import HorizontalServices from "@/components/molecules/portfolio/HorizontalServices";
import useFadeInUp from "@/app/lib/GSAP/fadeInUpDown";
import SkillsLineLeft from "@/app/assets/icons/skills-line-left.svg";

const Portfolio: React.FC<PortfolioProps> = ({ projects, listItems }) => {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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
      className="overflow-x-hidden box-border flex flex-col w-full shrink-0 px-5 py-10 lg:p-5 md:px-10 md:py-28  bg-secondary   before:bg-motif-bg-red-2  before:opacity-[0.03] before:bg-[length:100%] lg:before:bg-[length:80%] before:bg-no-repeat before:z-0 before:inset-0  before:absolute
      lg:before:bg-[90%_90%] before:bg-[90%_7%]  bg-blend-overlaybox-border relative  ">
      <div className="flex w-full  lg:py-20">
        <div className="box-border flex relative flex-col mx-auto md:py-5 w-full md:max-w-[1200px] 2xl:max-w-[1300px]">
          <div className="box-border relative w-[100vw] left-[50%] ml-[-50vw] items-center  flex  flex-row h-auto justify-center  md:mb-10  ">
            <SkillsLineLeft
              stroke="var(--primary-color)"
              className="ml-[-100px] lg:w-[420px] lg:h-[230px] w-[220px] h-[130px]"
            />
            <div ref={headingRef}></div>
            <Heading2 className="text-accent text-center w-full   ">
              <span className="text-outline mr-4">Mes</span>
              Projets
            </Heading2>
            <SkillsLineLeft
              stroke="var(--primary-color)"
              className="transform -scale-x-100 mr-[-100px] lg:w-[420px] lg:h-[230px] w-[220px] h-[130px]"
            />
          </div>

          {/* Insertion du nouveau composant ici */}
          <HorizontalServices projects={projects} listItems={listItems} />

          <div className="box-border flex relative flex-col shrink-0  md:pb-0 h-auto">
            <CustomSlide transition="fade" autoplay={true}>
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
