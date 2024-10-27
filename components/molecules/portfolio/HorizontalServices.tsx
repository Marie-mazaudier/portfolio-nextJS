"use client";

import React, { useRef } from "react";
import List from "@/components/atoms/list/list";
import CircleRed from "@/app/assets/icons/circle_red.svg";
import useVerticalScroll from "@/app/lib/GSAP/verticalScroll";
import { PortfolioProps } from "@/app/lib/graphQL/types/portfolioProps";
import { useMediaQuery } from "react-responsive";

const HorizontalScrollList: React.FC<PortfolioProps> = ({ listItems }) => {
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Détecter si l'utilisateur est sur mobile
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Appel du hook avec le paramètre `shouldActivate`
  useVerticalScroll(listContainerRef, {
    direction: "horizontal",
    from: { x: -500 },
    to: { x: 0 },
    scrub: 1,
    start: "top bottom",
    end: "+=1000",
    shouldActivate: isMobile, // Activation conditionnelle
  });

  return (
    <div className="relative overflow-hidden whitespace-nowrap">
      <div ref={listContainerRef} className="flex whitespace-nowrap">
        <List
          lists={listItems}
          direction="horizontal"
          separator={true}
          separatorHeight="8px"
          separatorColor="red"
          className="text-primary mr-2 text-[0.90rem] lg:text-[0.95rem] bg-[#f9f7ea] px-4 lg:px-6 py-1 rounded-full"
          alignment="center"
          alignmentMobile="left"
          alignmentTablet="left"
          gap={20}
          gapMobile={20}
          gapTablet={20}
          fontSize="xs"
          separatorContent={
            <CircleRed
              width="5px"
              height="5px"
              stroke="var(--accent-color)"
              fill="var(--accent-color)"
              className="border-accent rounded-full"
            />
          }
        />
      </div>
    </div>
  );
};

export default HorizontalScrollList;
