'use client'; // Ce fichier est un Client Component

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const useFadeInUp = () => {
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in-direction');

    fadeElements.forEach(element => {
      // Récupérer les valeurs des attributs data-* ou définir les valeurs par défaut
      const direction = element.getAttribute('data-direction') || 'up';
      const repeat = element.getAttribute('data-repeat') === 'true';
      const elementDelay = parseFloat(
        element.getAttribute('data-delay') || '0'
      );

      // Initialisation de la position de départ en fonction de la direction
      let fromVars = { opacity: 0, x: 0, y: 0 }; // Toujours initialiser x et y

      switch (direction) {
        case 'right':
          fromVars = { opacity: 0, x: -50, y: 0 }; // Départ de la gauche
          break;
        case 'left':
          fromVars = { opacity: 0, x: 50, y: 0 }; // Départ de la droite
          break;
        case 'bottom':
          fromVars = { opacity: 0, x: 0, y: -30 }; // Départ du haut
          break;
        case 'up':
        default:
          fromVars = { opacity: 0, x: 0, y: 30 }; // Départ du bas (par défaut)
      }

      const toggleActions = repeat
        ? 'restart none none reset'
        : 'play none none none';

      gsap.set(element, fromVars); // Mettre l'élément dans sa position de départ

      gsap.to(element, {
        opacity: 1,
        x: 0, // Position finale pour x
        y: 0, // Position finale pour y
        duration: 0.5, // Durée de l'animation
        delay: elementDelay, // Utilisation du délai spécifique récupéré de data-delay
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
  }, []); // Le hook ne dépend plus de "direction" ou "repeat"
};

export default useFadeInUp;
