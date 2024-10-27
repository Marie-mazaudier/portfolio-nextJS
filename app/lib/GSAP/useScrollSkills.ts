import { useEffect } from 'react';

interface UseScrollSkillsProps {
  skillsList: string[];
  setActiveSkill: (skill: string) => void;
  setScrollPosition: (position: number) => void;
  isActive: boolean;
}

const useScrollSkills = ({
  skillsList,
  setActiveSkill,
  setScrollPosition,
  isActive,
}: UseScrollSkillsProps) => {
  useEffect(() => {
    if (!isActive || skillsList.length === 0) return;

    // Initialiser avec la première compétence active
    setActiveSkill(skillsList[0]);
    setScrollPosition(0); // Commence à 0% sur la barre de progression
  }, [skillsList, setActiveSkill, setScrollPosition, isActive]);
};

export default useScrollSkills;
