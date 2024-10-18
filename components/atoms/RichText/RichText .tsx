import { cva } from "class-variance-authority";
import React from "react";
import { BodyText } from "../typography/bodyText/BodyText";

export interface RichTextBlock {
  type: string;
  children: {
    type: string;
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  }[];
}

const richTextStyle = cva([""], {
  variants: {
    intent: {
      thin: ["font-extralight", "font-textRegular"],
      regular: ["font-light", "font-textRegular"],
      medium: ["font-medium", "font-textRegular"],
      semibold: ["font-semibold", "font-textRegular"],
      bold: ["font-bold", "font-regular"],
    },
    size: {
      xs: ["text-md sm:text-xs"],
      sm: ["text-md sm:text-sm"],
      md: ["text-md leading-text"],
      lg: ["text-lg"],
      xl: ["text-xl"],
    },
  },
});

interface RichTextProps {
  content: RichTextBlock[];
  intent?: "thin" | "regular" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const RichText: React.FC<RichTextProps> = ({
  content,
  intent = "regular",
  size = "sm",
  className = "",
}) => {
  const renderStyledText = (child: any, key: number) => {
    let element = child.text;

    if (child.bold) {
      element = <strong key={`${key}-bold`}>{element}</strong>;
    }

    if (child.italic) {
      element = <em key={`${key}-italic`}>{element}</em>;
    }

    if (child.underline) {
      element = <u key={`${key}-underline`}>{element}</u>;
    }

    return element;
  };

  return (
    <div className={`${richTextStyle({ intent, size })} ${className}`}>
      {content.map((block, index) => (
        <BodyText className="mb-4" key={index} intent={intent} size={size}>
          {block.children.map((child, childIndex) =>
            renderStyledText(child, childIndex)
          )}
        </BodyText>
      ))}
    </div>
  );
};
