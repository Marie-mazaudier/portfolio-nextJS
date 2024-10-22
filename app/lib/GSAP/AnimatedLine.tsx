import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistre le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface AnimatedLineProps {
  direction?: 'left' | 'right'; // Optional direction prop
  duration?: number; // Optional duration prop
  color?: string; // Optional color for the line
  className?: string; // Optional className prop for custom classes
}

const AnimatedLine: React.FC<AnimatedLineProps> = ({
  direction = 'right',
  duration = 2,
  color = 'white',
  className = '', // Default to an empty string if no className is provided
}) => {
  const lineRef = useRef<HTMLHRElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        {
          width: '0%',
          x: direction === 'left' ? '100%' : '0%', // Start from the right for left direction
        },
        {
          width: '100%',
          x: '0%', // Reset the position once the animation is done
          duration: duration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: lineRef.current, // L'élément qui déclenche l'animation
            start: 'top 100%', // Commence quand le haut de l'élément arrive à 80% de la hauteur de la fenêtre
            toggleActions: 'play none none none', // Joue l'animation une fois
          },
        }
      );
    }
  }, [direction, duration]);

  return (
    <hr
      ref={lineRef}
      className={`my-4 h-[1px] bg-${color} border-none ${className}`}
    />
  );
};

export default AnimatedLine;
