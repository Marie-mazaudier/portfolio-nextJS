"use client"; // Ce fichier est un Client Component

import React from "react";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";
interface FooterItemProps {
  text: string;
  link?: string;
}

const FooterItem: React.FC<FooterItemProps> = ({ text, link }) => (
  <div className="box-border  relative shrink-0 my-auto h-auto uppercase font-regular text-primary">
    <a href={link}>
      <BodyText size="xs">{text}</BodyText>
    </a>
  </div>
);

export default FooterItem;
