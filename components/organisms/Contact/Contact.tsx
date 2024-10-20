"use client";
import React, { useRef } from "react";
import Image from "next/image";
import ContactForm from "@/components/molecules/Form/ContactForm";
import { Heading2 } from "@/components/atoms/typography/headingText/Heading2";
import Github from "@/app/assets/icons/GitHub.svg";
import Malt from "@/app/assets/icons/malt.svg";
import Linkedin from "@/app/assets/icons/linkedin.svg";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";
import BuilderImage from "@/components/atoms/builder-image";
import useRotate from "@/app/lib/GSAP/rotate";
import useFadeIn from "@/app/lib/GSAP/fadeIn";
import List from "@/components/atoms/list/list";
import useFadeInUp from "@/app/lib/GSAP/fadeInUpDown";

interface ContactProps {
  contactTitle: string;
  contact_photo: string; // Correspond désormais à l'URL de la photo
  logo_contact: string; // Correspond à l'URL du logo contact
  githubLink: string;
  linkkedinLink: string;
  text_contact: string;
  maltData: any;
}

const Contact: React.FC<ContactProps> = ({
  contactTitle,
  contact_photo,
  logo_contact,
  githubLink,
  linkkedinLink,
  text_contact,
  maltData,
}) => {
  const elementRef = useRef<HTMLHeadingElement>(null);
  useFadeIn({ repeat: false });
  useRotate({ direction: "right", repeat: true });

  const infoEmail = {
    email_admin: "marie.esturgie@gmail.com",
    firm_name: "Marie Esturgie",
  };
  const maltUrl = maltData.link_text;
  const maltText = maltData.text;
  const webpImageUrl = contact_photo.replace("/upload/", "/upload/f_webp/");
  useFadeInUp();

  return (
    <section className="relative box-border bg-secondary flex  flex-col grow shrink-0 self-stretch p-1 lg:p-5 mx-auto w-full max-w-[1920px] min-h-[auto]">
      <div
        id="contact"
        ref={elementRef}
        className="before:bg-motif-bg before:bg-[length:25%] before:bg-no-repeat before:z-0 before:inset-0  before:absolute
 before:opacity-[0.03] before:bg-[0%_0%]  bg-blend-overlay fade-in box-border bg-primary flex relative flex-col shrink-0 px-5 py-10 lg:py-20 h-auto rounded-md min-h-[auto] text-primary">
        <div className="box-border flex relative flex-col grow shrink-0 self-stretch py-10 px-0 lg:py-20 mx-auto w-full h-auto rounded-md max-w-[1200px] min-h-[auto]">
          <div className="box-border flex relative flex-col shrink-0  my-auto">
            <div className="box-border flex  gap-14 lg:gap-5 max-md:flex-col">
              <div className="flex flex-col lg:w-7/12 md:w-9/12 max-md:ml-0 max-md:w-full">
                <div className="box-border flex relative flex-col shrink-0 my-auto w-auto h-auto">
                  <div className="w-full lg:w-1/2"></div>

                  <BodyText className="hidden lg:flex text-secondary mb-5 lg:mb-0">
                    {text_contact}
                  </BodyText>
                  <Heading2 className="uppercase 	 box-border relative shrink-0  h-auto text-accent">
                    {contactTitle}
                  </Heading2>
                  <BodyText className=" lg:hidden text-secondary mt-5 lg:mb-0">
                    {text_contact}
                  </BodyText>

                  <ContactForm
                    email_admin={infoEmail.email_admin}
                    firm_name={infoEmail.firm_name}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:ml-5 lg:w-5/12 md:w-3/12 max-md:ml-0 max-md:w-full">
                <div className="box-border flex relative flex-col shrink-0 justify-start items-start lg:pl-36 m-auto  w-full h-auto">
                  <div className="relative :mt-2 ml-[-10px] md:ml-0 md:mt-0">
                    <BuilderImage
                      src={logo_contact}
                      alt="Logo Contact"
                      width={270} // Ajuster les valeurs si nécessaire
                      height={20}
                      className="rotate box-border  object-contain overflow-hidden shrink-0 mt-auto mr-auto mb-5 w-full aspect-[1.02] max-w-[130px] min-h-[auto] min-w-[20px] object-[bottom_left]"
                    />
                    {/**/}{" "}
                    <BuilderImage
                      src={webpImageUrl}
                      alt="Contact Photo"
                      width={150} // Ajuster les valeurs si nécessaire
                      height={150}
                      className="rounded-full absolute top-[24px] left-[-3px] object-cover object-top overflow-hidden shrink-0 mt-0 mr-auto ml-7 w-full aspect-square max-w-[79px] min-h-[20px] min-w-[20px] z-[999999999]"
                      loading="lazy"
                    />
                  </div>

                  <div className="box-border flex relative flex-col shrink-0 justify-start md:pl-4 mr-auto w-full">
                    <a
                      className="inline-flex text-secondary"
                      href={githubLink}
                      target="_blank"
                      rel="noreferrer">
                      <Github
                        width="37px"
                        height="37px"
                        className="pr-2 pb-[13px]"
                      />
                      Github
                    </a>

                    <a
                      href={linkkedinLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-secondary">
                      <Linkedin
                        width="37px"
                        height="33px"
                        className="pr-2 pb-[13px]"
                        strokeWidth="1px"
                      />
                      Linkedin
                    </a>
                    <a
                      className="inline-flex text-secondary"
                      href={maltUrl}
                      target="_blank"
                      rel="noreferrer">
                      <Malt
                        width="37px"
                        height="37px"
                        className="pr-2 pb-[13px]"
                        fill="var(--accent-color)"
                        stroke-width="1px"
                      />
                      {maltText}
                    </a>
                    <a
                      className="lg:mt-3"
                      target="_blank"
                      href="https://www.codeur.com/-marie-mazaudier"
                      title="Marie-Mazaudier">
                      <img
                        src="https://api.codeur.com/widgets/badge.svg?k=CTGQrLk6lLsDOlIC"
                        alt="badge codeur"
                        width="200"
                        height="80"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
