import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollSkillsProps {
  skillsList: string[];
  setActiveSkill: (skill: string) => void;
  setScrollPosition: (position: number) => void;
  isActive: boolean; // Nouvelle prop pour activer/désactiver le comportement
}

const useScrollSkills = ({
  skillsList,
  setActiveSkill,
  setScrollPosition,
  isActive,
}: UseScrollSkillsProps) => {
  useEffect(() => {
    if (!isActive) return; // Ne rien faire si le comportement n'est pas actif

    const totalSkills = skillsList.length;
    const sectionScrollAmount = 100 / (totalSkills - 1);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.skills-wrapper',
        start: 'center center',
        end: `+=${totalSkills * 500}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        markers: false,
        onUpdate: self => {
          const progress = self.progress * 100;
          setScrollPosition(progress);
          const dotIndex = Math.round(progress / sectionScrollAmount);
          if (dotIndex >= 0 && dotIndex < totalSkills) {
            setActiveSkill(skillsList[dotIndex]);
          }
        },
      },
    });

    skillsList.forEach((_, index) => {
      const progressPosition = (index / (totalSkills - 1)) * 100;
      timeline.to('.progress-bar-fill', {
        width: `${progressPosition}%`,
        duration: 0.25,
        ease: 'power1.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [skillsList, setActiveSkill, setScrollPosition, isActive]);
};

export default useScrollSkills;
