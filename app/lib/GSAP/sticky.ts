'use client'; // Ce fichier est un Client Component

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface UseStickyOptions {
  offsetTop?: number; // Distance depuis le haut de la page où l'élément devient sticky
  delay?: number; // Délai avant que l'élément ne devienne sticky
}

const useSticky = ({
  offsetTop = 0, // Valeur par défaut pour le décalage depuis le haut
  delay = 0, // Délai avant que l'effet sticky ne soit appliqué
}: UseStickyOptions = {}) => {
  useEffect(() => {
    const stickyElements = document.querySelectorAll('.sticky-element'); // Cible les éléments avec cette classe

    stickyElements.forEach(element => {
      gsap.set(element, { clearProps: 'all' }); // Réinitialiser toutes les propriétés au démontage

      ScrollTrigger.create({
        trigger: element,
        start: `top+=${offsetTop} top`, // Déclenche l'animation quand l'élément atteint la position spécifiée par offsetTop
        end: '+=500', // Valeur arbitraire pour garder l'élément sticky
        onEnter: () => {
          setTimeout(() => {
            element.classList.add('sticky'); // Ajouter la classe sticky après le délai
          }, delay); // Appliquer le délai avant de rendre sticky
        },
        onLeaveBack: () => {
          element.classList.remove('sticky'); // Supprimer la classe si on remonte
        },
      });
    });

    // Cleanup pour supprimer les triggers si le composant est démonté
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
    };
  }, [offsetTop, delay]); // Réexécuter seulement si offsetTop ou delay change
};

export default useSticky;
