import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface UseFadeInUpOptions {
  direction?: 'up' | 'right' | 'left' | 'bottom'; // Paramètre pour la direction de l'animation
  repeat?: boolean; // Option pour répéter l'animation à chaque fois que l'élément entre dans la vue
}

const useFadeInUp = ({
  direction = 'up',
  repeat = false,
}: UseFadeInUpOptions = {}) => {
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in-direction');

    fadeElements.forEach(element => {
      // Initialisation de la position de départ en fonction de la direction
      let fromVars = { opacity: 0, x: 0, y: 0 }; // Toujours initialiser x et y

      switch (direction) {
        case 'right':
          fromVars = { opacity: 0, x: -100, y: 0 }; // Départ de la gauche
          break;
        case 'left':
          fromVars = { opacity: 0, x: 100, y: 0 }; // Départ de la droite
          break;
        case 'bottom':
          fromVars = { opacity: 0, x: 0, y: -100 }; // Départ du haut
          break;
        case 'up':
        default:
          fromVars = { opacity: 0, x: 0, y: 100 }; // Départ du bas (par défaut)
      }

      const toggleActions = repeat
        ? 'restart none none reset'
        : 'play none none none';

      gsap.set(element, fromVars); // Mettre l'élément dans sa position de départ

      gsap.to(element, {
        opacity: 1,
        x: 0, // Position finale pour x
        y: 0, // Position finale pour y
        duration: 1, // Durée de l'animation
        scrollTrigger: {
          trigger: element,
          start: 'top 80%', // Le début de l'animation quand le haut de l'élément atteint 80% du viewport
          end: 'bottom 80%', // Fin (pas nécessairement requis ici)
          toggleActions: toggleActions, // Gère les redémarrages pour repeat true
          once: !repeat, // Si repeat est false, ne joue qu'une seule fois
        },
      });
    });

    // Cleanup function pour supprimer les triggers si le composant est démonté
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
    };
  }, [direction, repeat]); // Réexécuter seulement si direction ou repeat change
};

export default useFadeInUp;
