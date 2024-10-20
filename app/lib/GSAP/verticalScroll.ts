'use client'; // Ce fichier est un Client Component

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { RefObject, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollOptions {
  direction?: 'vertical' | 'horizontal' | 'diagonal'; // Ajout de l'option 'diagonal'
  diagonalDirection?: 'bottom-left-to-top-right' | 'top-right-to-bottom-left'; // Direction diagonale
  reverse?: boolean; // Permet d'inverser le sens de l'animation
  from?: { x?: number; y?: number }; // Valeur de départ personnalisable pour x et y
  to?: { x?: number; y?: number }; // Valeur d'arrivée personnalisable pour x et y
  start?: string; // Point de départ du ScrollTrigger
  end?: string; // Point de fin du ScrollTrigger
  duration?: number; // Durée de l'animation
  scrub?: number; // Scrubbing (l'animation suit le défilement)
}

const useVerticalScroll = (
  ref: RefObject<HTMLElement>,
  {
    direction = 'vertical', // Par défaut l'animation est verticale
    diagonalDirection, // Direction diagonale (facultative)
    reverse = false, // Par défaut l'animation n'est pas inversée
    from, // Valeurs personnalisables de départ
    to, // Valeurs personnalisables d'arrivée
    start = 'top 80%', // Par défaut, l'animation démarre lorsque l'élément atteint 80% de la fenêtre
    end = 'bottom 20%', // Par défaut, l'animation se termine lorsque l'élément quitte 20% de la fenêtre
    duration = 10, // Durée par défaut de 1 seconde
    scrub = 7, // Scrubbing activé par défaut
  }: ScrollOptions = {}
) => {
  useEffect(() => {
    const element = ref.current;

    if (element) {
      let fromValue = { x: 0, y: 0 };
      let toValue = { x: 0, y: 0 };

      // Logique pour définir les valeurs par défaut en fonction de la direction
      if (direction === 'vertical') {
        // Si l'animation est inversée, part de bas en haut (100px en bas), sinon de haut en bas (-100px en haut)
        fromValue.y = from?.y ?? (reverse ? 100 : -100);
        toValue.y = to?.y ?? 0;
      } else if (direction === 'horizontal') {
        // Si l'animation est inversée, part de droite à gauche (100px à droite), sinon de gauche à droite (-100px à gauche)
        fromValue.x = from?.x ?? (reverse ? 100 : -100);
        toValue.x = to?.x ?? 0;
      } else if (direction === 'diagonal') {
        if (diagonalDirection === 'bottom-left-to-top-right') {
          fromValue = {
            x: from?.x ?? -100, // Part de 100px à gauche
            y: from?.y ?? 70, // Part de 100px en bas
          };
          toValue = {
            x: to?.x ?? 0, // Arrive à 0
            y: to?.y ?? 0, // Arrive à 0
          };
        } else if (diagonalDirection === 'top-right-to-bottom-left') {
          fromValue = {
            x: from?.x ?? 100, // Part de 100px à droite
            y: from?.y ?? -70, // Part de 100px en haut
          };
          toValue = {
            x: to?.x ?? 0, // Arrive à 0
            y: to?.y ?? 0, // Arrive à 0
          };
        }
      }

      // Animation GSAP
      gsap.fromTo(element, fromValue, {
        ...toValue,
        duration: duration,
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          scrub: scrub,
        },
      });
    }

    // Nettoyage : Suppression des triggers après la fin de l'animation
    return () => {
      if (element) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === element) {
            trigger.kill();
          }
        });
      }
    };
  }, [
    ref,
    direction,
    diagonalDirection,
    reverse,
    from,
    to,
    start,
    end,
    duration,
    scrub,
  ]);
};

export default useVerticalScroll;
