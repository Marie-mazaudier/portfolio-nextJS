"use client"; // Ajoute ceci en haut du fichier
import useFadeIn from "@/app/lib/GSAP/fadeIn";
import React, { useRef } from "react";
import { gsap } from "gsap";
import BuilderImage from "@/components/atoms/builder-image";
import { Heading3 } from "@/components/atoms/typography/headingText/heading3";
interface ProjectCardProps {
  title: string;
  description: string;
  stack: string;
  imageSrc: string;
  imageAlt: string;
  linkText: string;
  primaryColor: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  stack,
  imageSrc,
  imageAlt,
  linkText,
  primaryColor,
}) => {
  const imageRef = useRef<HTMLImageElement>(null); // Référence pour l'image
  useFadeIn({ repeat: false });
  return (
    <article className="box-border flex relative flex-col shrink-0 md:pb-8 mt-5 mb-auto h-auto">
      <BuilderImage
        src={imageSrc}
        alt={imageAlt}
        height={300}
        width={905}
        className="fade-in box-border object-cover overflow-hidden shrink-0 mt-5 w-full rounded-md aspect-[1.77] h-[38vw] min-h-[20px] min-w-[20px]"
        loading="lazy"
        ref={imageRef} // Passer la ref à BuilderImage
      />
      <div className="box-border flex flex-col relative lg:flex-row shrink-0 mt-5 md:mt-10">
        <Heading3 className="titre box-border relative  shrink-0 my-auto mr-auto h-auto text-4xl font-semibold leading-normal text-left text-primary">
          {title}
        </Heading3>
        <a
          href="#"
          className="box-border relative shrink-0 my-auto md:mt-0 mt-5 lg:ml-5 h-auto font-regular  uppercase"
          style={{ color: primaryColor }}>
          {linkText}
        </a>
      </div>
      <div
        className="box-border relative shrink-0 md:mt-10 mt-5 h-auto"
        style={{ color: primaryColor }}>
        <p>{description}</p>
        <p>{stack}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
