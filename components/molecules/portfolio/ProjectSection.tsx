"use client"; // Utilisation côté client

import ProjectCard from "./ProjectCard";
import React from "react";

// Définition de l'interface ProjectData
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

// Interface des props pour ProjectSection
interface ProjectSectionProps {
  projects: ProjectData[]; // Tableau des données de projet
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  return (
    <section className="box-border flex relative flex-col shrink-0 mt-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`flex flex-col w-full ${
              index === 1 ? "mt-0 md:mt-20" : ""
            } max-md:ml-0`}>
            {/* Utilisation du composant ProjectCard avec des données dynamiques */}
            <ProjectCard
              title={project.title}
              description={project.description}
              stack={project.stack}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              linkText={project.linkText}
              imageWidth={project.width}
              imageHeight={project.height}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
