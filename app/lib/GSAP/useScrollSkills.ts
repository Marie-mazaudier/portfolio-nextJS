import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Activer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface UseScrollSkillsProps {
  skillsList: string[];
  setActiveSkill: (skill: string) => void;
}

const useScrollSkills = ({
  skillsList,
  setActiveSkill,
}: UseScrollSkillsProps) => {
  useEffect(() => {
    // Vérifier si la liste des compétences est vide
    if (skillsList.length === 0) return;

    // Créer une animation qui se déclenche au défilement
    const triggerAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '.skills-list', // L'élément déclencheur
        start: 'top -50%',
        end: 'bottom 80%', // Réduire l'espace de scroll pour plus de rapidité
        scrub: 0.5, // Rendre l'animation plus fluide mais plus rapide
      },
    });

    // Créer une animation pour chaque compétence
    skillsList.forEach((skill, index) => {
      triggerAnimation.to(
        {},
        {
          duration: 0.05, // Ajuster la durée pour chaque compétence
          onStart: () => setActiveSkill(skill),
        },
        index * 0.05
      ); // Décaler légèrement chaque compétence pour plus de fluidité
    });

    // Forcer GSAP à recalculer les dimensions après le montage
    ScrollTrigger.refresh();

    // Nettoyer les ScrollTriggers lors du démontage du composant
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.refresh(); // Assurer une mise à jour propre après le nettoyage
    };
  }, [skillsList, setActiveSkill]);
};

export default useScrollSkills;
