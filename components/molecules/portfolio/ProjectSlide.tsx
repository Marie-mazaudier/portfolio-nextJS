import React, { useState } from "react";
import BuilderImage from "@/components/atoms/builder-image";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";
import { Heading3 } from "@/components/atoms/typography/headingText/heading3";
import ArrowBtnUp from "@/app/assets/icons/arrow-up.svg";
import { SlideData } from "@/app/lib/graphQL/types/slideData";
import { RichText } from "@/components/atoms/RichText/RichText ";
import Plus from "@/app/assets/icons/plus.svg";
import Minus from "@/app/assets/icons/minus.svg";
import useFadeInUp from "@/app/lib/GSAP/fadeInUpDown";

const ProjectSlide: React.FC<SlideData> = ({
  image,
  title,
  description_project,
  stacks,
  link,
  width,
  height,
  client,
  site_category,
}) => {
  const [btnActive, setbtnActive] = useState(false);
  const webpImageUrl = image.replace("/upload/", "/upload/f_webp/");
  useFadeInUp();

  return (
    <div className="!flex flex-col 2xl:p-20 lg:flex-row /shadow-[-2px_-1px_6px_rgba(0,0,0,0.05)]  rounded-3xl items-center gap-12 lg:gap-20 my-7  lg:p-10 lg:bg-[#f9f7e9]">
      {/* Section Image */}
      <div className="w-full lg:w-1/2">
        <BuilderImage
          src={webpImageUrl}
          alt={title}
          className="rounded-md md:h-[75vh] 2xl:h-[60vh] shadow-lg w-full object-cover"
          width={width}
          height={height}
          loading="lazy"
        />
      </div>
      {/* Section Texte */}
      <div className="w-full lg:w-1/2 text-left">
        <div
          data-delay="0"
          data-direction="bottom"
          data-repeat="false"
          className="fade-in-direction">
          <Heading3 className=" text-primary lg:text-xl ">{title}</Heading3>
        </div>
        <div
          data-delay="0.2"
          data-direction="bottom"
          data-repeat="false"
          className="fade-in-direction">
          <RichText
            className=" text-primary  mt-10 lg:mt-16 lg:min-h-16"
            content={description_project}
          />

          <BodyText className=" text-primary mt-3 mr-5">
            <span className="font-textSemibold mr-1 uppercase">Client </span>
            {client}
          </BodyText>
          <div className="text-primary mt-3 mr-5 flex flex-row">
            <BodyText className="border my-3 py-1 w-fit whitespace-nowrap border-accent border-solid transition-all duration-300 ease-in-out rounded-[20px] text-accent px-4">
              {site_category}
            </BodyText>
          </div>

          {/*<BodyText className=" text-primary mt-4 hover:text-accent transition-all duration-300 ease-in-out cursor-pointer group lg:mt-5 ">
            <span
              onClick={() => {
                setbtnActive(!btnActive); // Toggle l'état de btnActive
              }}
              className="font-textSemibold flex items-center uppercase flex-row">
              Technologies
              {btnActive ? (
                <Minus
                  width="20px"
                  height="20px"
                  className="ml-4 mb-[0.5px] border group-hover:border-accent transition-all duration-300 ease-in-out  rounded-full border-primary p-1 group-hover:stroke-accent"
                  stroke="var(--primary-color)"
                />
              ) : (
                <Plus
                  width="20px"
                  height="20px"
                  className="ml-4 mb-[0.5px] border group-hover:border-accent transition-all duration-300 ease-in-out  rounded-full border-primary p-1 group-hover:stroke-accent"
                  stroke="var(--primary-color)"
                />
              )}
            </span>
          </BodyText>
          <BodyText
            size="xs"
            className={` text-primary   mt-5  flex flex-wrap gap-2`}>
            {stacks.map((stack, index) => (
              <span
                key={index}
                className={`${
                  btnActive
                    ? "opacity-100 h-auto py-1"
                    : "opacity-0 h-0 py-0 invisible"
                } border overflow-hidden  border-accent border-solid transition-all duration-300 ease-in-out rounded-[20px] text-accent px-2  whitespace-nowrap`}>
                {stack.text}
              </span>
            ))}
          </BodyText>
          */}
          {/* Section bouton */}
          <div
            className={`${
              btnActive ? "lg:mt-14 mt-10" : "lg:mt-7 mt-3"
            }  flex flex-row justify-between w-[65%] items-center`}>
            <a
              target="_blank"
              href={link}
              className="text-primary h-[25px] transition-all duration-300 ease-in-out flex flex-row hover:text-accent  font-textMedium  uppercase w-[98%] group">
              <span className="border-b border-primary group-hover:border-accent text-[0.95rem]  py-0">
                Voir le site Web
              </span>
              <ArrowBtnUp
                width="13px"
                height="13px"
                className="mt-1 m-[10px] transition-all duration-300 ease-in-out group-hover:stroke-accent"
                stroke="var(--primary-color)"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSlide;
