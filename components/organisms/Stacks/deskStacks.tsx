import React, { useRef } from "react";
import { Heading2 } from "@/components/atoms/typography/headingText/Heading2";
import ProgressBar from "@/components/atoms/progressBar/progressBar";
import { SkillsList } from "./SkillsList";
import { SkillsSubtitle } from "./skillsSubtitle";
import SkillsRight from "@/app/assets/icons/skills-horizontale.svg";
import useFadeIn from "@/app/lib/GSAP/fadeIn";

interface DeskStacksProps {
  activeSkill: string;
  technoData: Record<string, { name: string; percent: number }[]>;
  subtitleData: Record<string, string>;
  skillsList: string[];
  scrollPosition: number;
  isTechnoFading: boolean;
}

const DeskStacks: React.FC<DeskStacksProps> = ({
  activeSkill,
  technoData,
  subtitleData,
  skillsList,
  scrollPosition,
  isTechnoFading,
}) => {
  useFadeIn({ repeat: false });
  const elementRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <div className="flex gap-5 my-20 max-md:flex-col">
        <div className="flex flex-col w-[60%] lg:flex-row max-md:ml-0 max-md:w-full my-auto mb-20">
          <Heading2 className="text-6xl  text-secondary md:text-9xl">
            <span className="text-outline-primary text-center mr-4">Mes</span>
            compétences
          </Heading2>
          <div className="box-border justify-center lg:mt-20 w-[100%] flex relative flex-col shrink-0 my-auto ">
            <SkillsRight
              stroke="var(--secondary-color)"
              className="absolute mt-[-60px] right-0 mx-auto opacity-[0.7]"
              width="450px"
              height="463px"
            />
          </div>
        </div>
      </div>
      <div
        ref={elementRef}
        className="fade-in flex flex-col items-center lg:flex-row gap-5">
        <div className="flex mb-8 flex-row w-full lg:w-[60%]">
          <SkillsSubtitle
            activeSkill={activeSkill}
            subtitleData={subtitleData}
          />
        </div>
        <div className="flex flex-col lg:ml-5 w-full lg:w-[40%] max-md:ml-0 max-md:w-full">
          <div
            className={`mb-8 transition-opacity duration-700 ease-in-out ${
              isTechnoFading ? "opacity-0" : "opacity-100"
            }`}>
            {technoData[activeSkill] &&
              technoData[activeSkill].map((tech, index) => (
                <ProgressBar
                  key={index}
                  percent={tech.percent}
                  text={tech.name}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="lg:mb-10 lg:mt-5">
        <SkillsList
          activeSkill={activeSkill}
          skillsList={skillsList}
          scrollPosition={scrollPosition}
        />
      </div>
    </>
  );
};

export default DeskStacks;
