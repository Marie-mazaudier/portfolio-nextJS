import React from "react";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";

interface SkillsListProps {
  activeSkill: string;
  skillsList: string[];
  scrollPosition: number; // Position de progression transmise depuis Stacks
}

export const SkillsList: React.FC<SkillsListProps> = ({
  activeSkill,
  skillsList,
  scrollPosition,
}) => {
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
      </div>
    </section>
  );
};
