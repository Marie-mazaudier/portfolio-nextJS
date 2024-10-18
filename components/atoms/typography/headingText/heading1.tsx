import { cva } from "class-variance-authority";
import React, { forwardRef } from "react";

// Configuration de base avec cva, y compris la taille par défaut et les variantes d'intention
const h1Style = cva([""], {
  variants: {
    intent: {
      normal: ["font-normal", "font-textRegular"],
      medium: ["font-medium", "font-textMedium"],
      semibold: ["font-semibold", "font-textSemibold"],
      bold: ["font-bold", "font-textBold"],
      fontExtrabold: ["font-extrabold", "font-textSemibold"],
    },
    size: {
      xs: ["text-xs"],
      sm: ["text-xs sm:text-sm"],
      md: ["text-md leading-text"],
      lg: ["text-lg sm:text-md"],
      xl: ["lg:text-xl text-xxl"],
      xxl: ["text-lg  md:text-xxxl lg:text-xxl"],
    },
  },
  defaultVariants: {
    size: "xxl", // Définit la taille par défaut
  },
});

export interface H1Props {
  intent?: "normal" | "medium" | "semibold" | "bold" | "fontExtrabold";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  children?: React.ReactNode;
}

// Utilisation de forwardRef pour accepter la prop ref
export const Heading1 = forwardRef<HTMLHeadingElement, H1Props>(
  ({ intent = "semibold", size = "xxl", className = "", children }, ref) => {
    return (
      <h1 ref={ref} className={`${h1Style({ intent, size })} ${className}`}>
        {children}
      </h1>
    );
  }
);

Heading1.displayName = "Heading1"; // Ajout du displayName pour éviter les warnings avec React dev tools
