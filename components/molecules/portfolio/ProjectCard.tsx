"use client"; // Utilisation côté client
import useFadeIn from "@/app/lib/GSAP/fadeIn";
import React, { useRef } from "react";
import BuilderImage from "@/components/atoms/builder-image";
import { Heading3 } from "@/components/atoms/typography/headingText/heading3";

interface ProjectCardProps {
  title: string;
  description: string;
  stack: string;
  imageSrc: string;
  imageAlt: string;
  linkText: string;
  imageWidth: number;
  imageHeight: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  stack,
  imageSrc,
  imageAlt,
  linkText,
  imageWidth,
  imageHeight,
}) => {
  const imageRef = useRef<HTMLImageElement>(null); // Référence pour l'image
  useFadeIn({ repeat: false });

  return (
    <article className="box-border flex relative flex-col shrink-0   mb-auto h-auto">
      <BuilderImage
        src={imageSrc}
        alt={imageAlt}
        height={imageWidth}
        width={imageHeight}
        className="fade-in box-border object-cover overflow-hidden shrink-0  w-full rounded-md aspect-[1.77] h-[30vw] min-h-[20px] min-w-[20px]"
        loading="lazy"
        ref={imageRef} // Passer la ref à BuilderImage
      />
      <div className="box-border flex flex-col relative lg:flex-row shrink-0 mt-5 md:mt-10">
        <Heading3 className=" box-border relative shrink-0 my-auto mr-auto h-auto font-semibold leading-normal text-left text-primary">
          {title}
        </Heading3>
        <a
          href="#"
          className="box-border relative shrink-0 my-auto md:mt-0 mt-5 lg:ml-5 h-auto font-regular uppercase text-primary ">
          {linkText}
        </a>
      </div>
      <div className="box-border relative shrink-0 md:mt-10 mt-5 h-auto text-primary ">
        {/* Utilisation d'un div au lieu d'un p pour éviter l'imbrication */}
        <div>{description}</div>
        <div>{stack}</div>
      </div>
    </article>
  );
};

export default ProjectCard;
