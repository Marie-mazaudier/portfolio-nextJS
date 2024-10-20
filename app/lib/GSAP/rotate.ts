'use client'; // Ce fichier est un Client Component

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface UseRotateOptions {
  direction?: 'right' | 'left'; // Direction de la rotation (droite ou gauche)
  repeat?: boolean; // Option pour répéter l'animation à chaque fois que l'élément entre dans la vue
}

const useRotate = ({
  direction = 'right',
  repeat = false,
}: UseRotateOptions = {}) => {
  useEffect(() => {
    const rotateElements = document.querySelectorAll('.rotate');

    rotateElements.forEach(element => {
      const fromRotation = 0;
      const rotationStep = direction === 'right' ? 180 : -180; // Choix de la direction de rotation
      let rotationValue = 0;

      if (repeat) {
        // Si repeat est true, on fait tourner l'élément continuellement en fonction du scroll
        gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%', // Animation commence lorsque l'élément entre dans la vue
            end: 'bottom 20%', // Fin de l'animation à 20% du bas du viewport
            scrub: 3, // Augmenter encore le scrub pour ralentir davantage l'animation
            onUpdate: self => {
              // On détecte si l'utilisateur scrolle vers le bas ou vers le haut
              const directionMultiplier = self.direction === 1 ? 1 : -1; // 1 pour scroll down, -1 pour scroll up
              const progress = self.progress * 0.2; // Réduire ce facteur pour ralentir la vitesse

              // Ajuster la rotation en fonction du sens du scroll
              rotationValue += rotationStep * progress * directionMultiplier; // Ajuste la rotation en fonction du sens du scroll

              // Appliquer la rotation
              gsap.to(element, {
                rotate: rotationValue,
                duration: 1.6, // Augmenter la durée pour une transition encore plus fluide
                ease: 'power1.out', // Fluidité
              });
            },
          },
        });
      } else {
        // Comportement par défaut si repeat est false (une seule rotation)
        gsap.set(element, { rotate: fromRotation });

        gsap.to(element, {
          rotate: rotationStep, // Rotation jusqu'à 180 ou -180 degrés
          duration: 1, // Durée de l'animation
          scrollTrigger: {
            trigger: element,
            start: 'top 80%', // Le début de l'animation quand le haut de l'élément atteint 80% du viewport
            end: 'bottom 80%', // Fin (pas nécessairement requis ici)
            toggleActions: 'play none none none',
            once: true, // Si repeat est false, ne joue qu'une seule fois
          },
        });
      }
    });

    // Cleanup pour supprimer les triggers si le composant est démonté
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
    };
  }, [direction, repeat]); // Réexécuter seulement si direction ou repeat change
};

export default useRotate;
