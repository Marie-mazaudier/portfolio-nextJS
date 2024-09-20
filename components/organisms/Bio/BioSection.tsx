"use client"; // Ajoute ceci en haut du fichier
import React, { useRef } from "react";
import { Heading1 } from "@/components/atoms/typography/headingText/heading1";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";
import ArrowButton from "@/components/atoms/btn/ArrowButton";
import useFadeIn from "@/app/lib/GSAP/fadeIn";
import useRotate from "@/app/lib/GSAP/rotate";
interface ThemeColors {
  primary: string;
  secondary: string;
}

const BioSection: React.FC = () => {
  const themeColors: ThemeColors = {
    primary: "var(--primary-color, #3498db)",
    secondary: "var(--secondary-color, #FFFEEF)",
  };

  const headingRef = useRef<HTMLHeadingElement>(null);
  //direction?: 'up' | 'right' | 'left' | 'bottom';
  useFadeIn({ repeat: false });
  useRotate({ direction: "right", repeat: true }); // Rotation progressive avec le scroll
  return (
    <section
      className="box-border flex flex-col lg:flex-row justify-center w-full shrink-0 p-5 lg:min-h-[100vh]"
      style={{ backgroundColor: themeColors.secondary }}>
      <div className="box-border flex relative flex-col justify-center grow shrink-0 self-stretch py-5 w-full max-w-[1300px] lg:min-h-[100vh]">
        <div
          className="box-border flex gap-10 relative flex-col lg:flex-row shrink-0 pt-10 pb-8 h-auto"
          style={{ backgroundColor: themeColors.secondary }}>
          <div className="box-border flex relative flex-col shrink-0 my-auto w-full lg:w-[55%] h-full">
            {/* Utilisation de la classe fade-in-direction */}
            <Heading1
              className="text-primary lg:pr-10 opacity-0 fade-in"
              intent="bold"
              size="xxl"
              ref={headingRef}>
              Développeuse Web Full Stack
            </Heading1>
            <BodyText className="text-primary font-regular mt-10" size="sm">
              Développeuse web avec 6 ans d&apos;expérience, je collabore depuis
              3 ans avec l&apos;agence marketing iViera. J&apos;utilise des
              technologies modernes telles que Next.js, WordPress, et GraphQL,
              ainsi que des outils d&apos;intégration puissants comme Builder.io
              et Elementor pour concevoir des interfaces visuelles créatives et
              performantes. Découvrez comment je peux transformer vos idées en
              expériences digitales sur mesure.
            </BodyText>
            <ArrowButton />
          </div>

          <div className=" box-border lg:pl-[10%] flex relative flex-col shrink-0 justify-end items-start mb-auto h-full w-full lg:w-[45%]">
            <div className="w-[80%]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2Fb7c2b5e165594b20b03520696ff96e46%2F2185d04b68f840a5a8638bab5cde70e4"
                alt=""
                className="rotate box-border object-contain overflow-hidden shrink-0 mt-auto mr-auto mb-10 w-full aspect-[1.01] max-w-[100px] min-h-[20px] min-w-[20px] object-[bottom_left]"
              />
              <div className="tags_block box-border relative shrink-0 h-auto text-sm text-primary">
                <p>
                  DÉVELOPPEMENT WEB, API INTÉGRATION GRAPHIQUE JAVASCRIPT,
                  TAILWIND, NEXT.JS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
