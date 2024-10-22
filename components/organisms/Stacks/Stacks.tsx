import React, { useState, useRef, useEffect } from "react";
import { Heading2 } from "@/components/atoms/typography/headingText/Heading2";
import ProgressBar from "@/components/atoms/progressBar/progressBar";
import Plus from "@/app/assets/icons/plus.svg";
import { SkillsList } from "./SkillsList";
import useFadeIn from "@/app/lib/GSAP/fadeIn";
import { Skill } from "@/app/lib/graphQL/types/skills"; // Assurez-vous d'adapter l'import en fonction de votre modèle Skill
import { SkillsSubtitle } from "./skillsSubtitle";
import useScrollSkills from "@/app/lib/GSAP/useScrollSkills"; // Le nouveau hook pour le scroll
export interface StacksProps {
  skills: Skill[];
}

export const Stacks: React.FC<StacksProps> = ({ skills }) => {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const [activeSkill, setActiveSkill] = useState<string>(""); // Gère le titre de la compétence active
  const [technoData, setTechnoData] = useState<
    Record<string, { name: string; percent: number }[]>
  >({}); // Technologies liées aux compétences
  const [subtitleData, setSubtitleData] = useState<Record<string, string>>({});
  const [skillsList, setSkillsList] = useState<string[]>([]); // Liste des compétences dynamiques

  useFadeIn({ repeat: false });
  // Utilisation des données dynamiques pour initialiser les compétences, techno et sous-titres
  useEffect(() => {
    if (skills.length > 0) {
      // Initialiser la compétence active avec la première dans la liste
      setActiveSkill(skills[0].attributes.title);

      // Générer les données dynamiques de techno (technoData), les sous-titres (subtitleData) et la liste des compétences (skillsList)
      const generatedTechnoData: Record<
        string,
        { name: string; percent: number }[]
      > = {};
      const generatedSubtitleData: Record<string, string> = {};
      const generatedSkillsList: string[] = [];

      skills.forEach((skill) => {
        const { title, subtitle, techno } = skill.attributes;

        // Ajouter le titre à la liste des compétences
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
      setSkillsList(generatedSkillsList); // Mettre à jour la liste des compétences dynamiques
    }
  }, [skills]);
  // Utiliser le hook pour synchroniser la sélection avec le scroll
  useScrollSkills({ skillsList, setActiveSkill });
  return (
    <section
      id="outils"
      ref={elementRef}
      className="overflow-x-hidden fade-in p-5 md:p-10 lg:p-5 bg-primary before:bg-motif-bg-noir before:bg-[length:cover] before:bg-no-repeat before:z-[-1] before:inset-0 before:absolute
      before:opacity-[0.7] before:bg-[-300px_0px] bg-blend-overlay box-border justify-center min-h-[90vh] lg:min-h-[110vh] flex relative flex-col grow shrink-0 self-stretch py-20">
      <div className="flex flex-col w-full max-w-[1200px] 2xl:max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Colonne gauche : Titre */}
          <div className="flex flex-col w-full lg:w-1/3">
            <Heading2 className=" text-6xl uppercase text-secondary md:text-9xl">
              <span className="text-outline-primary">
                Mes{/*mainTitle.split(" ")[0]}*/}
              </span>
              <br /> Outils
            </Heading2>
          </div>

          {/* Colonne droite : Outils */}
          <div className="flex flex-col  ml-5 w-full lg:w-[33%] max-md:ml-0 max-md:w-full" />
          <div className="flex flex-col lg:ml-5 w-full lg:w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-row align-middle items-center">
              {/*<Plus
                width="60px"
                height="60px"
                className="ml-[-20px]"
                strokeWidth="1px"
                stroke="currentColor"
              />*/}
              <hr className="box-border relative w-full" />
            </div>
            <div className="mt-8">
              {/* Affichage dynamique des barres de progression en fonction de la compétence sélectionnée */}
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

        {/* Liste des compétences avec l'élément actif */}
        <SkillsList
          activeSkill={activeSkill}
          setActiveSkill={setActiveSkill}
          skillsList={skillsList} // Passer la liste des compétences dynamiques
        />

        {/* Sous-titre dynamique basé sur la compétence sélectionnée */}
        <SkillsSubtitle activeSkill={activeSkill} subtitleData={subtitleData} />
      </div>
    </section>
  );
};
