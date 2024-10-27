import React, { useState, useEffect, useRef } from "react";
import { Heading2 } from "@/components/atoms/typography/headingText/Heading2";
import ProgressBar from "@/components/atoms/progressBar/progressBar";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";
import { Skill } from "@/app/lib/graphQL/types/skills";
import useMediaQuery from "@/app/hooks/useMediaQuery"; // Ajoutez ceci pour détecter la taille de l'écran
import SkillsRight from "@/app/assets/icons/skills-horizontale.svg";
export interface ResponsiveStacksProps {
  skills: Skill[];
}

const ResponsiveStacks: React.FC<ResponsiveStacksProps> = ({ skills }) => {
  const [skillsList, setSkillsList] = useState<string[]>([]);
  const [technoData, setTechnoData] = useState<
    Record<string, { name: string; percent: number }[]>
  >({});
  const [subtitleData, setSubtitleData] = useState<Record<string, string>>({});
  const [triggerAnimation, setTriggerAnimation] = useState<boolean[]>([]);

  // Hook pour vérifier si on est en mobile
  const isMobile = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    if (skills.length > 0) {
      const generatedSkillsList: string[] = [];
      const generatedTechnoData: Record<
        string,
        { name: string; percent: number }[]
      > = {};
      const generatedSubtitleData: Record<string, string> = {};

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

      setSkillsList(generatedSkillsList);
      setTechnoData(generatedTechnoData);
      setSubtitleData(generatedSubtitleData);
      setTriggerAnimation(new Array(generatedSkillsList.length).fill(false)); // Initialiser les animations
    }
  }, [skills]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile) return; // N'activer l'observation que si on est en mobile

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTriggerAnimation((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = containerRef.current?.querySelectorAll(".techno-item");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section
      id="outils"
      className="skills-wrapper  fade-in  box-border justify-center flex relative flex-col grow shrink-0 self-stretch">
      {/* Titre sur deux lignes */}
      <div className="flex flex-col items-left mb-10">
        <Heading2 className="text-6xl uppercase text-secondary md:text-9xl text-left">
          <span className="block text-outline-primary">Mes</span>
          <span className="block">compétences</span>
        </Heading2>
        <SkillsRight
          stroke="var(--primary-color)"
          className="absolute mt-[-70px] mr-[-20px] right-0 mx-auto"
          width="220px"
          height="186px"
        />
      </div>

      {/* Affichage horizontal avec overflow scroll */}
      <div
        ref={containerRef}
        className="relative flex overflow-x-scroll space-x-12 pb-5 snap-x snap-mandatory skills-wrapper">
        {skillsList.map((skill, skillIndex) => (
          <div
            key={skillIndex}
            className="relative flex flex-col w-screen flex-shrink-0 snap-center">
            {/* Titre de la compétence */}
            <BodyText className="text-secondary font-bold uppercase ">
              {skill}
            </BodyText>

            {/* Sous-titre de la compétence */}
            <BodyText className="text-secondary font-regular !text-[0.9rem]">
              {subtitleData[skill]}
            </BodyText>

            {/* Technos associées */}
            <div className="flex flex-col gap-2 my-5">
              {technoData[skill] &&
                technoData[skill].map((tech, index) => (
                  <div
                    key={index}
                    data-index={skillIndex * 10 + index}
                    className="techno-item">
                    <ProgressBar
                      key={index}
                      percent={tech.percent}
                      text={tech.name}
                      triggerAnimation={
                        triggerAnimation[skillIndex * 10 + index] || !isMobile
                      } // Toujours animer en Desktop
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResponsiveStacks;
