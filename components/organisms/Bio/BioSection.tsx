"use client";
import React, { useRef } from "react";
import { Heading1 } from "@/components/atoms/typography/headingText/heading1";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";
import ArrowButton from "@/components/atoms/btn/ArrowButton";
import useFadeIn from "@/app/lib/GSAP/fadeIn";
import useRotate from "@/app/lib/GSAP/rotate";
import BuilderImage from "@/components/atoms/builder-image";
interface Bio {
  type: string;
  children: { type: string; text: string }[];
}

interface Tag {
  id: number;
  text: string;
}

interface BioSectionProps {
  mainTitle: string;
  bio: Bio[];
  tags: Tag[];
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
}

const BioSection: React.FC<BioSectionProps> = ({
  mainTitle,
  bio,
  tags,
  buttonText,
  buttonLink,
  imageUrl,
}) => {
  const themeColors = {
    primary: "var(--primary-color, #3498db)",
    secondary: "var(--secondary-color, #FFFEEF)",
  };

  const headingRef = useRef<HTMLHeadingElement>(null);

  useFadeIn({ repeat: false });
  useRotate({ direction: "right", repeat: true });

  return (
    <section
      className="box-border flex flex-col lg:flex-row justify-center w-full shrink-0 p-5 lg:min-h-[100vh]"
      style={{ backgroundColor: themeColors.secondary }}>
      <div className="box-border flex relative flex-col justify-center grow shrink-0 self-stretch py-5 w-full max-w-[1300px] lg:min-h-[100vh]">
        <div
          className="box-border flex gap-10 relative flex-col lg:flex-row shrink-0 pt-10 pb-8 h-auto"
          style={{ backgroundColor: themeColors.secondary }}>
          <div className="box-border flex relative flex-col shrink-0 my-auto w-full lg:w-[55%] h-full">
            <Heading1
              className="text-primary lg:pr-10 opacity-0 fade-in"
              intent="bold"
              size="xxl"
              ref={headingRef}>
              {mainTitle}
            </Heading1>
            <BodyText className="text-primary font-regular mt-10" size="sm">
              {bio.length > 0 && bio[0].children[0].text}
            </BodyText>
            <ArrowButton text={buttonText} link={buttonLink} />
          </div>

          <div className="box-border lg:pl-[10%] flex relative flex-col shrink-0 justify-end items-start mb-auto h-full w-full lg:w-[45%]">
            <div className="w-[80%]">
              <BuilderImage
                src={imageUrl}
                alt="Bio image"
                width={500} // ajustez la taille si nécessaire
                height={500} // ajustez la taille si nécessaire
                className="rotate box-border object-contain overflow-hidden shrink-0 mt-auto mr-auto mb-10 w-full aspect-[1.01] max-w-[100px] min-h-[20px] min-w-[20px] object-[bottom_left]"
              />
              <div className="tags_block box-border relative shrink-0 h-auto text-sm text-primary">
                <p>{tags.map((tag) => tag.text).join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
