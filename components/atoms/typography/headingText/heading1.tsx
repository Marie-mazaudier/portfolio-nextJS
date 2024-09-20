import { cva } from "class-variance-authority";
import React, { forwardRef } from "react";

// Configuration de base avec cva, y compris la taille par défaut et les variantes d'intention
const h1Style = cva([""], {
  variants: {
    intent: {
      normal: ["font-normal", "font-regular"],
      medium: ["font-medium", "font-medium"],
      semibold: ["font-semibold", "font-semibold"],
      bold: ["font-bold", "font-semibold"],
      fontExtrabold: ["font-extrabold", "font-semibold"],
    },
    size: {
      xs: ["text-xs"],
      sm: ["text-xs sm:text-sm"],
      md: ["text-md leading-text"],
      lg: ["text-lg sm:text-md"],
      xl: ["text-xl"],
      xxl: ["text-lg lg:text-xxl"],
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
  ({ intent = "normal", size = "sm", className = "", children }, ref) => {
    return (
      <h1 ref={ref} className={`${h1Style({ intent, size })} ${className}`}>
        {children}
      </h1>
    );
  }
);

Heading1.displayName = "Heading1"; // Ajout du displayName pour éviter les warnings avec React dev tools
