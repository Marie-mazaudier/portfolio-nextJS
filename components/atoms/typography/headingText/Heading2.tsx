import { cva } from "class-variance-authority";
import React, { FC } from "react";
const h2Style = cva([""], {
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
      lg: ["text-lg"],
      xl: [" text-lg lg:text-xl"],
      xxl: ["text-lg lg:text-xxl"],
    },
    defaultVariants: {
      size: "xxl", // Définit la taille par défaut
    },
  },
});

export interface H2props {
  intent?: "normal" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  children?: React.ReactNode;
}

export const Heading2: FC<H2props> = (props) => {
  const {
    intent = "normal",
    size = "xxl",
    className = "",
    children = "Your Text Here",
  } = props;
  return (
    <h2 className={`${h2Style({ intent, size })} ${className}`}>{children}</h2>
  );
};
