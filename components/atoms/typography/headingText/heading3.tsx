import { cva } from "class-variance-authority";
import React, { FC } from "react";
const h3Style = cva([""], {
  variants: {
    intent: {
      normal: ["font-normal", "font-regular"], // Applique la font-family 'regular'
      medium: ["font-medium", "font-medium"], // Applique la font-family 'medium'
      semibold: ["font-semibold", "font-semibold"], // Applique la font-family 'semibold'
      bold: ["font-bold", "font-semibold"], // Applique la font-family 'semibold' pour bold
      fontExtrabold: ["font-extrabold", "font-semibold"], // Applique la font-family 'semibold' pour extra bold
    },
    size: {
      xs: ["text-xs"],
      sm: ["text-xs sm:text-sm"],
      md: ["text-md leading-text"],
      lg: ["text-med md:text-lg"],
      xl: ["text-xl"],
      xxl: ["text-xxl"],
    },
    defaultVariants: {
      size: "lg", // Définit la taille par défaut
    },
  },
});

export interface H3props {
  intent?: "normal" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  children?: React.ReactNode;
}

export const Heading3: FC<H3props> = (props) => {
  const {
    intent = "normal",
    size = "lg",
    className = "",
    children = "Your Text Here",
  } = props;
  return (
    <h3 className={`${h3Style({ intent, size })} ${className}`}>{children}</h3>
  );
};
