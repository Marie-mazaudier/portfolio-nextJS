import React from "react";
import Arrow from "@/assets/icons/arrow-down-right.svg";

// Définition de l'interface pour la structure des couleurs
interface ThemeColors {
  primary: string;
}

// Définition de l'interface pour les props du composant
interface CallToActionProps {
  themeColors?: {
    data: ThemeColors; // Utilisation de l'interface ThemeColors
  };
  text: string;
  link: string;
}

const ArrowButton: React.FC<CallToActionProps> = ({ themeColors }) => {
  return (
    <div
      className="box-border relative shrink-0 mt-10 mr-auto h-auto text-sm text-blue-800 uppercase"
      style={{ color: themeColors?.data.primary }} // Application de la couleur si définie
    >
      <p className="inline-flex items-center">
        Découvrir mes projets
        <Arrow
          width="23px"
          height="23px"
          className="text-primary m-auto ml-2" // Applique la couleur via currentColor
          strokeWidth="1.5"
        />
      </p>
    </div>
  );
};

export default ArrowButton;
