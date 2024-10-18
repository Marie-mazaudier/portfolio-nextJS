import { cva } from "class-variance-authority";
import React, { FC } from "react";

const btStyle = cva([""], {
  variants: {
    intent: {
      thin: ["font-extralight", "font-textRegular"],
      regular: ["font-light", "font-textRegular"],
      medium: ["font-medium", "font-textRegular"],
      semibold: ["font-semibold", "font-textRegular"],
      bold: ["font-bold", "font-regular"],
    },
    size: {
      xs: ["text-md sm:text-xs "],
      sm: ["text-md sm:text-sm "],
      md: ["text-md leading-text"],
      lg: ["lg:text-item, text-md"],
      xl: ["text-xl"],
    },
  },
});

export interface BTProps {
  intent?: "thin" | "regular" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  children?: React.ReactNode;
}

export const BodyText: FC<BTProps> = (props) => {
  const {
    intent = "regular",
    size = "sm",
    className = "",
    children = "Your Text here",
  } = props;
  return (
    <p className={`${btStyle({ intent, size })} ${className}`}>{children}</p>
  );
};
