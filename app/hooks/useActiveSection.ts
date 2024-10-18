import { useState, useEffect } from 'react';

// Définition des types pour les options du hook
type UseActiveSectionHook = (sectionIds: string[]) => string;

/**
 * Hook pour observer quelle section est actuellement visible et définir l'ID de la section active.
 * @param sectionIds - Liste des IDs de section à observer.
 * @returns L'ID de la section actuellement visible.
 */
const useActiveSection: UseActiveSectionHook = sectionIds => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Créer un IntersectionObserver
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // Mettre à jour l'état avec l'ID de la section visible
          }
        });
      },
      {
        threshold: 0.5, // 50% de la section doit être visible
      }
    );

    // Observer chaque élément avec un ID correspondant à ceux dans sectionIds
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Nettoyer l'observation lors du démontage du composant
    return () => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;
