import React, { useState, useEffect } from "react";
import { Heading3 } from "@/components/atoms/typography/headingText/heading3";
import Plus from "@/app/assets/icons/plus.svg";
import AnimatedLine from "@/app/lib/GSAP/AnimatedLine";

// Définition du type des props pour SkillsSubtitle
interface SkillsSubtitleProps {
  activeSkill: string;
  subtitleData: Record<string, string>;
}

export const SkillsSubtitle: React.FC<SkillsSubtitleProps> = ({
  activeSkill,
  subtitleData,
}) => {
  const [displayedSubtitle, setDisplayedSubtitle] = useState(
    subtitleData[activeSkill]
  ); // Sous-titre affiché
  const [isFading, setIsFading] = useState(false); // Gestion de l'état de transition

  useEffect(() => {
    // Déclencher une transition de fade-out, puis changer le sous-titre
    setIsFading(true); // Commencer par déclencher le fade-out

    // Après 300ms (le temps du fade-out), changer le sous-titre
    const timeoutId = setTimeout(() => {
      setDisplayedSubtitle(subtitleData[activeSkill]); // Mettre à jour le texte
      setIsFading(false); // Commencer le fade-in
    }, 300); // Durée du fade-out avant de changer le texte

    // Nettoyer le timeout lorsque le composant se démonte
    return () => clearTimeout(timeoutId);
  }, [activeSkill, subtitleData]);

  return (
    <section className="box-border flex relative flex-col shrink-0">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full my-auto">
          <Heading3
            className={`box-border relative shrink-0 h-auto font-black leading-tight 
              transition duration-700 ease-in-out
              ${
                isFading
                  ? "opacity-0 translate-x-[-5px]"
                  : "opacity-100 translate-x-0"
              }
            `}>
            {displayedSubtitle}
          </Heading3>
        </div>
        {/*<div className="flex flex-col ml-5 w-[55%] max-md:ml-0 max-md:w-full">
          <div className="box-border justify-center flex relative flex-col shrink-0 my-auto h-full">
            <div className="flex flex-row align-middle items-center relative pr-20">
              <AnimatedLine
                direction="right"
                duration={2}
                color="white"
                className="box-border relative w-[90%]"
              />
              <Plus
                width="60px"
                height="60px"
                strokeWidth="1px"
                stroke="#ff3131"
                className="absolute right-0 "
              />
            </div>
          </div>
        </div>*/}
      </div>
    </section>
  );
};
