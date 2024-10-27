import React, { useState, useRef, useEffect } from "react";
import DeskStacks from "./deskStacks";
import ResponsiveStacks from "./responsiveStacks";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import useFadeIn from "@/app/lib/GSAP/fadeIn";
import { Skill } from "@/app/lib/graphQL/types/skills";
import useScrollSkills from "@/app/lib/GSAP/useScrollSkills";

export interface StacksProps {
  skills: Skill[];
}

export const Stacks: React.FC<StacksProps> = ({ skills }) => {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const [activeSkill, setActiveSkill] = useState<string>("");
  const [technoData, setTechnoData] = useState<
    Record<string, { name: string; percent: number }[]>
  >({});
  const [subtitleData, setSubtitleData] = useState<Record<string, string>>({});
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTechnoFading, setIsTechnoFading] = useState(false);

  useFadeIn({ repeat: false });

  // Utiliser le hook pour détecter les tailles d'écran lg et plus grandes
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (skills.length > 0) {
      setActiveSkill(skills[0].attributes.title);
      const generatedTechnoData: Record<
        string,
        { name: string; percent: number }[]
      > = {};
      const generatedSubtitleData: Record<string, string> = {};
      const generatedSkillsList: string[] = [];

      skills.forEach((skill) => {
        const { title, subtitle, techno } = skill.attributes;
        generatedSkillsList.push(title);

        generatedTechnoData[title] =
          skill.attributes.techno.data.attributes.techno.map((tech) => ({
            name: tech.name,
            percent: tech.percent,
          }));

        generatedSubtitleData[title] = subtitle;
      });

      setTechnoData(generatedTechnoData);
      setSubtitleData(generatedSubtitleData);
      setSkillsList(generatedSkillsList);
    }
  }, [skills]);

  useEffect(() => {
    setIsTechnoFading(true);

    const timeoutId = setTimeout(() => {
      setIsTechnoFading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [activeSkill]);

  // Activer useScrollSkills en fonction de la taille d'écran
  useScrollSkills({
    skillsList,
    setActiveSkill,
    setScrollPosition,
    isActive: isLargeScreen,
  });

  return (
    <section
      id="outils"
      ref={elementRef}
      className="skills-wrapper overflow-x-hidden fade-in p-5 md:p-10 lg:p-5 bg-primary before:bg-motif-bg-noir before:bg-[length:cover] before:bg-no-repeat before:z-[-1] before:inset-0 before:absolute
      before:opacity-[0.7] lg:before:bg-[-300px_0px] before:bg-[-220px_0px] bg-blend-overlay box-border justify-center min-h-[70vh] lg:min-h-[110vh] flex relative flex-col grow shrink-0 self-stretch lg:py-20">
      <div className="flex flex-col w-full max-w-[1200px] lg:py-24 2xl:max-w-[1300px] mx-auto">
        {isLargeScreen ? (
          <DeskStacks
            activeSkill={activeSkill}
            technoData={technoData}
            subtitleData={subtitleData}
            skillsList={skillsList}
            scrollPosition={scrollPosition}
            isTechnoFading={isTechnoFading}
          />
        ) : (
          <ResponsiveStacks skills={skills} />
        )}
      </div>
    </section>
  );
};
