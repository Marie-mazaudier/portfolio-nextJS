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
  setActiveSkill: (skill: string) => void;
  setScrollPosition: (position: number) => void;
}

const DeskStacks: React.FC<DeskStacksProps> = ({
  activeSkill,
  technoData,
  subtitleData,
  skillsList,
  scrollPosition,
  isTechnoFading,
  setActiveSkill,
  setScrollPosition,
}) => {
  useFadeIn({ repeat: false });
  const elementRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <div className="flex gap-5 my-10 max-md:flex-col">
        <div className="flex flex-col w-[60%] lg:flex-row max-md:ml-0 max-md:w-full my-auto">
          <Heading2 className="text-6xl text-secondary md:text-9xl mb-7">
            <span className="text-outline-primary text-center  mr-4">Mes</span>
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

      {/* Bloc techno et sous titre */}
      <div className="relative flex items-center w-full mb-5 min-h-[250px]">
        <div
          ref={elementRef}
          className="fade-in flex w-full lg:flex-row flex-col items-center gap-5">
          {/* Sous-titre à gauche */}
          <div className="lg:w-[50%] w-full mb-8 lg:mb-0">
            <SkillsSubtitle
              activeSkill={activeSkill}
              subtitleData={subtitleData}
            />
          </div>

          {/* Informations technologiques à droite */}
          <div className="lg:w-[50%] w-full flex flex-col">
            <div
              className={`transition-opacity duration-700 ease-in-out ${
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
      </div>

      <div className="lg:mb-10 lg:mt-5">
        <SkillsList
          activeSkill={activeSkill}
          skillsList={skillsList}
          scrollPosition={scrollPosition}
          setActiveSkill={setActiveSkill}
          setScrollPosition={setScrollPosition}
        />
      </div>
    </>
  );
};

export default DeskStacks;
