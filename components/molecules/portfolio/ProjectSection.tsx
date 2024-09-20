"use client"; // Ajoute ceci en haut du fichier
import ProjectCard from "./ProjectCard";
import useVerticalScroll from "@/app/lib/GSAP/verticalScroll";
import React, { useRef } from "react";

interface ProjectData {
  title: string;
  description: string;
  stack: string;
  imageSrc: string;
  imageAlt: string;
  linkText: string;
}

interface ProjectSectionProps {
  projects: ProjectData[];
  primaryColor: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  projects,
  primaryColor,
}) => {
  return (
    <section className="box-border flex relative flex-col shrink-0 mt-0">
      <div className="flex  gap-0 md:gap-40 max-md:flex-col">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`flex flex-col w-6/12 max-md:w-full ${
              index === 1 ? "mt-0 md:mt-40" : ""
            } max-md:ml-0`}>
            <ProjectCard
              title={project.title}
              description={project.description}
              stack={project.stack}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              linkText={project.linkText}
              primaryColor={primaryColor}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
