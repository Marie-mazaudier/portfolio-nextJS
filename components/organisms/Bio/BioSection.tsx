"use client";
import React, { useRef } from "react";
import { Heading1 } from "@/components/atoms/typography/headingText/heading1";
import { RichText } from "@/components/atoms/RichText/RichText ";
import useFadeIn from "@/app/lib/GSAP/fadeIn";
import useRotate from "@/app/lib/GSAP/rotate";
import Circle from "@/app/assets/icons/circle_red.svg";
import ArrowBtn from "@/app/assets/icons/arrow-up.svg";
import { scrollToElementById } from "@/app/lib/utils/scrollToElement";

interface Bio {
  type: string;
  children: { type: string; text: string }[];
}

interface Tag {
  id: number;
  text: string;
}

interface BioSectionProps {
  mainTitle: string;
  bio: Bio[];
  tags: Tag[];
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
}

const BioSection: React.FC<BioSectionProps> = ({
  mainTitle,
  bio,
  tags,
  buttonText,
  buttonLink,
  imageUrl,
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useFadeIn({ repeat: false });
  useRotate({ direction: "right", repeat: true });
  const anchorId = "outils";
  const anchorIdProject = "portfolio";

  return (
    <section
      id="home"
      className="  before:bg-motif-bg-red before:bg-[length:100%]  lg:before:bg-[length:30%] before:bg-no-repeat before:z-0 before:inset-0  before:absolute
lg:before:bg-[50%_43%] before:bg-[50%_80%]  bg-blend-overlaybox-border relative flex flex-col lg:flex-row bg-secondary justify-center w-full shrink-0 p-5 lg:p-0 min-h-[100vh]">
      {/*Elements en position absolute*/}
      <Circle
        width="200px"
        height="200px"
        className="absolute right-[-165px] lg:right-[-155px] z-50 top-[25%] md:top-[30%] lg:top-[30%] "
        fill="var(--accent-color)"
      />
      <div className="flex flex-row justify-between w-[170px] items-center -rotate-90 absolute right-[-60px] lg:right-[-20px] bottom-36">
        <hr className="box-border relative border-t-solid border-1 mx-2 border-t-1 border-primary  w-full" />
        <a
          onClick={(e) => {
            e.preventDefault(); // Empêche le comportement par défaut du lien
            scrollToElementById(anchorId); // Appelle la fonction pour scroller vers l'élément
          }}
          href={`#${anchorId}`}
          className="text-primary font-textMedium  uppercase  w-[97%]">
          Scroll
        </a>
      </div>
      {/*Fin*/}
      <div
        ref={headingRef}
        className="opacity-0 fade-in pt-32 box-border flex relative flex-col justify-center grow shrink-0 self-stretch  w-full max-w-[1200px] ">
        <div className="box-border flex gap-10 relative flex-col lg:flex-row shrink-0  h-auto">
          <div className="box-border flex relative flex-col shrink-0 my-auto w-full lg:w-[70%] h-full">
            <Heading1 className="text-accent flex flex-col lg:pr-20">
              {mainTitle.split(" ").slice(0, -2).join(" ")}{" "}
              {/* Partie sans les deux derniers mots */}
              <span className="text-outline">
                {mainTitle.split(" ").slice(-2).join(" ")}{" "}
                {/* Les deux derniers mots */}
              </span>
            </Heading1>
            <RichText
              className="text-primary font-regular mt-12 lg:mt-10"
              content={bio}
            />
            <div className="flex flex-row mt-12 lg:mt-10 justify-between lg:w-[38%] items-center">
              <a
                onClick={(e) => {
                  e.preventDefault(); // Empêche le comportement par défaut du lien
                  scrollToElementById(anchorIdProject); // Appelle la fonction pour scroller vers l'élément
                }}
                href={`#${anchorId}`}
                className="h-[25px] group text-primary flex flex-row hover:text-accent transition font-textMedium text-[1rem] uppercase  w-[97%]">
                <span className="border-b border-primary group-hover:border-accent  py-0">
                  {buttonText}
                </span>
                <ArrowBtn
                  width="15px"
                  height="15px"
                  className="mt-1 m-[10px] group-hover:stroke-accent"
                  stroke="var(--primary-color)"
                />
              </a>
            </div>
          </div>

          <div className="box-border  pt-20 flex relative flex-col shrink-0 justify-center items-start h-full w-full lg:w-[35%]"></div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
