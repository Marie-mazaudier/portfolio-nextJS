import React from "react";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";

interface SkillsListProps {
  activeSkill: string;
  setActiveSkill: (skill: string) => void;
  skillsList: string[]; // Liste des compétences dynamiques
}

export const SkillsList: React.FC<SkillsListProps> = ({
  activeSkill,
  setActiveSkill,
  skillsList,
}) => {
  return (
    <section className="box-border my-20 flex relative flex-col shrink-0 pb-5 border-b border-white border-solid">
      <div className="flex gap-5 scrollbar-hide  overflow-x-auto whitespace-nowrap lg:justify-between max-md:flex-row">
        {skillsList.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col w-auto flex-shrink-0 max-md:ml-0 max-md:w-auto"
            onClick={() => setActiveSkill(skill)}
            onMouseEnter={() => setActiveSkill(skill)}>
            <BodyText
              className={`
                box-border cursor-pointer relative shrink-0 mt-5 h-auto text-base font-black uppercase 
                transition-colors ease-in-out duration-500
                ${activeSkill === skill ? "text-accent active" : ""}
              `}>
              {skill}
            </BodyText>
          </div>
        ))}
      </div>
    </section>
  );
};
