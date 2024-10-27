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
  shouldActivate?: boolean; // Activer ou désactiver le comportement du hook
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
    duration = 10, // Durée par défaut de 10 secondes
    scrub = 7, // Scrubbing activé par défaut
    shouldActivate = true, // Par défaut, le hook est actif
  }: ScrollOptions = {}
) => {
  useEffect(() => {
    // Si shouldActivate est false, ne fait rien
    if (!shouldActivate) return;

    const element = ref.current;

    if (element) {
      let fromValue = { x: 0, y: 0 };
      let toValue = { x: 0, y: 0 };

      // Logique pour définir les valeurs par défaut en fonction de la direction
      if (direction === 'vertical') {
        fromValue.y = from?.y ?? (reverse ? 100 : -100);
        toValue.y = to?.y ?? 0;
      } else if (direction === 'horizontal') {
        fromValue.x = from?.x ?? (reverse ? 100 : -100);
        toValue.x = to?.x ?? 0;
      } else if (direction === 'diagonal') {
        if (diagonalDirection === 'bottom-left-to-top-right') {
          fromValue = {
            x: from?.x ?? -100,
            y: from?.y ?? 70,
          };
          toValue = {
            x: to?.x ?? 0,
            y: to?.y ?? 0,
          };
        } else if (diagonalDirection === 'top-right-to-bottom-left') {
          fromValue = {
            x: from?.x ?? 100,
            y: from?.y ?? -70,
          };
          toValue = {
            x: to?.x ?? 0,
            y: to?.y ?? 0,
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
    shouldActivate, // Ajouté pour la dépendance
  ]);
};

export default useVerticalScroll;
