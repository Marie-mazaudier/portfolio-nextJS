import React, { useEffect, useState } from "react";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";

interface ListProps {
  lists: { listItem: string }[]; // Tableau d'objets contenant des éléments de liste
  direction?: "horizontal" | "vertical"; // Direction de la liste
  separator?: boolean; // Si un trait de séparation doit être affiché
  separatorHeight?: string; // Hauteur du trait de séparation
  separatorColor?: string; // Couleur du trait de séparation
  separatorContent?: React.ReactNode; // Contenu personnalisé pour le séparateur (par exemple, un SVG)
  className?: string; // Classe CSS personnalisée pour styliser les éléments de la liste
  alignment?: "left" | "center" | "right"; // Alignement personnalisé pour desktop
  alignmentMobile?: "left" | "center" | "right"; // Alignement pour mobile
  alignmentTablet?: "left" | "center" | "right"; // Alignement pour tablette
  gap?: number; // Espace entre les éléments (en pixels)
  gapMobile?: number; // Espacement pour mobile
  gapTablet?: number; // Espacement pour tablette
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl"; // Taille de police des éléments de la liste
}

export const List: React.FC<ListProps> = ({
  lists = [], // Par défaut, une liste vide
  direction = "horizontal", // Direction par défaut: horizontal
  separator = false, // Pas de séparateur par défaut
  separatorHeight = "2px", // Hauteur par défaut du séparateur
  separatorColor = "#fff", // Couleur par défaut du séparateur
  separatorContent = null, // Pas de séparateur personnalisé par défaut
  className = "", // Classe CSS personnalisée pour les éléments de la liste
  alignment = "center", // Alignement par défaut: centré (desktop)
  alignmentMobile = "center", // Alignement par défaut pour mobile
  alignmentTablet = "center", // Alignement par défaut pour tablette
  gap = 50, // Espacement par défaut de 50px
  gapMobile = 20, // Espacement pour mobile
  gapTablet = 40, // Espacement pour tablette
  fontSize = "md", // Taille de police par défaut
}) => {
  const isHorizontal = direction === "horizontal";

  // Utiliser un state pour la largeur d'écran
  const [currentGap, setCurrentGap] = useState(gap);
  const [currentAlignment, setCurrentAlignment] = useState(alignment);

  // Utiliser useEffect pour appliquer les bonnes valeurs en fonction de la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        setCurrentGap(gapMobile); // Appliquer le gap pour mobile
        setCurrentAlignment(alignmentMobile); // Appliquer l'alignement pour mobile
      } else if (screenWidth >= 640 && screenWidth < 1024) {
        setCurrentGap(gapTablet); // Appliquer le gap pour tablette
        setCurrentAlignment(alignmentTablet); // Appliquer l'alignement pour tablette
      } else {
        setCurrentGap(gap); // Appliquer le gap par défaut (desktop)
        setCurrentAlignment(alignment); // Appliquer l'alignement par défaut (desktop)
      }
    };

    handleResize(); // Appliquer la bonne taille au montage du composant
    window.addEventListener("resize", handleResize); // Écoute les changements de taille

    return () => {
      window.removeEventListener("resize", handleResize); // Nettoyage
    };
  }, [gap, gapMobile, gapTablet, alignment, alignmentMobile, alignmentTablet]);

  // Déterminer la classe d'alignement en fonction de la prop "alignment"
  const alignmentClass = {
    left: isHorizontal ? "justify-start" : "items-start",
    center: isHorizontal ? "justify-center" : "items-center",
    right: isHorizontal ? "justify-end" : "items-end",
  }[currentAlignment];

  return (
    <div
      className={`flex ${
        isHorizontal ? "flex-row" : "flex-col"
      } w-full ${alignmentClass} relative`}>
      <ul
        className={`flex ${
          isHorizontal ? "flex-row" : "flex-col"
        } w-full ${alignmentClass} relative`}
        style={{
          gap: `${currentGap}px`, // Espacement entre les éléments en fonction de la taille d'écran
        }}>
        {lists && lists.length > 0 ? (
          lists.map((list, index) => (
            <li
              key={index}
              className={`relative flex items-center ${
                isHorizontal ? "elementor-inline-item" : ""
              }`}
              style={{
                textAlign: isHorizontal ? "center" : "left",
                position: "relative",
              }}>
              {/* Utilisation du texte de la liste avec taille de police personnalisée */}
              <BodyText className={className} size={fontSize}>
                {list.listItem}
              </BodyText>

              {/* Séparateur entre les éléments, sauf après le dernier */}
              {separator && index < lists.length - 1 && (
                <span
                  className="separator-wrapper"
                  style={{
                    position: "absolute",
                    right: `calc(-${currentGap}px / 2)`,
                    top: isHorizontal ? "50%" : "auto",
                    bottom: isHorizontal ? "auto" : "0",
                    transform: isHorizontal ? "translateY(-50%)" : "none",
                  }}>
                  {separatorContent ? (
                    // Si separatorContent est fourni, on l'affiche
                    <span className="separator-content mx-2">
                      {separatorContent}
                    </span>
                  ) : (
                    // Sinon, on affiche le séparateur par défaut (trait)
                    <span
                      className="separator"
                      style={{
                        display: "inline-block", // Assure que le séparateur par défaut prenne en compte width et height
                        width: isHorizontal ? "1px" : "100%",
                        height: isHorizontal ? separatorHeight : "1px",
                        backgroundColor: separatorColor,
                      }}></span>
                  )}
                </span>
              )}
            </li>
          ))
        ) : (
          <div>No items available</div> // Message par défaut si aucune liste
        )}
      </ul>
    </div>
  );
};

export default List;
