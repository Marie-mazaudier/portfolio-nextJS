import React from "react";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";
import ChevronLeft from "@/app/assets/icons/fleche-left.svg";
import ChevronRight from "@/app/assets/icons/fleche-right.svg";
interface SkillsListProps {
  activeSkill: string;
  skillsList: string[];
  scrollPosition: number; // Position de progression transmise depuis Stacks
  setActiveSkill: (skill: string) => void;
  setScrollPosition: (position: number) => void;
}

export const SkillsList: React.FC<SkillsListProps> = ({
  activeSkill,
  skillsList,
  scrollPosition,
  setActiveSkill,
  setScrollPosition,
}) => {
  const handleNextSkill = () => {
    const currentIndex = skillsList.indexOf(activeSkill);
    const nextIndex = (currentIndex + 1) % skillsList.length; // Avancer en boucle
    setActiveSkill(skillsList[nextIndex]);
    setScrollPosition((nextIndex / (skillsList.length - 1)) * 100);
  };

  const handlePrevSkill = () => {
    const currentIndex = skillsList.indexOf(activeSkill);
    const prevIndex =
      (currentIndex - 1 + skillsList.length) % skillsList.length; // Reculer en boucle
    setActiveSkill(skillsList[prevIndex]);
    setScrollPosition((prevIndex / (skillsList.length - 1)) * 100);
  };

  return (
    <section className="skills-section flex flex-col relative pb-5">
      <div className="skills-list flex gap-5 overflow-x-auto whitespace-nowrap lg:justify-between">
        {skillsList.map((skill, index) => (
          <div key={index} className={`skill-item flex flex-col w-auto`}>
            <BodyText
              className={`box-border cursor-pointer relative text-base font-black uppercase ${
                activeSkill === skill ? "text-accent" : "text-secondary"
              }`}>
              {skill}
            </BodyText>
          </div>
        ))}
      </div>

      {/* Barre de progression */}
      <div className="relative mt-4">
        {/* Bouton gauche */}
        <button
          onClick={handlePrevSkill}
          className="absolute left-[-100px] top-1/2 transform -translate-y-1/2 z-10 text-2xl ">
          <ChevronLeft
            width="80px"
            height="80px"
            stroke="var(--secondary-color)"
            strokeWidth="1px"
          />
        </button>
        <div className="progress-bar h-1 bg-gray-300">
          <div
            className="progress-bar-fill h-1 bg-accent transition-all ease-in-out duration-500"
            style={{ width: `${scrollPosition}%` }}></div>
        </div>

        {/* Marqueurs verticaux */}
        <div className="absolute top-[-8px] flex justify-between w-full">
          {skillsList.map((_, index) => (
            <div
              key={index}
              className={`progress-dot w-[1px] h-4 ${
                activeSkill === skillsList[index] ? "bg-accent" : "bg-gray-300"
              }`}></div>
          ))}
        </div>
        {/* Bouton droit */}
        <button
          onClick={handleNextSkill}
          className="absolute right-[-100px] top-1/2 transform -translate-y-1/2 z-10 text-2xl hover:text-accent">
          <ChevronRight
            stroke="var(--secondary-color)"
            strokeWidth="1px"
            width="80px"
            height="80px"
          />
        </button>
      </div>
    </section>
  );
};
