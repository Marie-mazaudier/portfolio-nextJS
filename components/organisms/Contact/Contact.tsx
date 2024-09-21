"use client";
import React, { useRef } from "react";
import ContactForm from "@/components/molecules/Form/ContactForm";
import { Heading2 } from "@/components/atoms/typography/headingText/Heading2";
import Github from "@/app/assets/icons/GitHub.svg";
import Linkedin from "@/app/assets/icons/linkedin.svg";
import { BodyText } from "@/components/atoms/typography/bodyText/BodyText";
import BuilderImage from "@/components/atoms/builder-image";
import useRotate from "@/app/lib/GSAP/rotate";
import useFadeIn from "@/app/lib/GSAP/fadeIn";

const Contact: React.FC = () => {
  const elementRef = useRef<HTMLHeadingElement>(null);
  //direction?: 'up' | 'right' | 'left' | 'bottom';
  useFadeIn({ repeat: false });
  useRotate({ direction: "right", repeat: true }); // Rotation progressive avec le scroll
  const infoEmail = {
    email_admin: "marie.esturgie@gmail.com",
    firm_name: "Marie Esturgie",
  };
  return (
    <section className="box-border bg-secondary flex relative flex-col grow shrink-0 self-stretch p-5 mx-auto w-full max-w-[1920px] min-h-[auto]">
      <div
        ref={elementRef}
        className="fade-in box-border bg-primary flex relative flex-col shrink-0 px-5 lg:py-20 h-auto rounded-md min-h-[auto] text-primary">
        <div className="box-border flex relative flex-col grow shrink-0 self-stretch py-10 px-5 lg:py-20 mx-auto w-full h-auto rounded-md max-w-[1300px] min-h-[auto]">
          <div className="box-border flex relative flex-col shrink-0  my-auto">
            <div className="box-border flex gap-5 max-lg:flex-col">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-lg:w-full">
                <div className="box-border flex relative flex-col shrink-0 my-auto w-auto h-auto">
                  <Heading2
                    size="xl"
                    className="box-border relative shrink-0 mr-auto h-auto text-secondary">
                    Un projet web ?
                  </Heading2>
                  <ContactForm
                    email_admin={infoEmail.email_admin}
                    firm_name={infoEmail.firm_name}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:ml-5 w-6/12 max-md:ml-0 max-lg:w-full">
                <div className="box-border flex relative flex-col shrink-0 justify-end items-start lg:pl-36 mx-auto mt-auto w-full h-auto">
                  <div className="relative">
                    <BuilderImage
                      src="https://cdn.builder.io/api/v1/image/assets%2Fb7c2b5e165594b20b03520696ff96e46%2F433adb12cd3246f1b5eff334f22633bc"
                      alt=""
                      width={250} // Tu peux ajuster cette valeur en fonction de tes besoins
                      height={20} // Idem, ajuste cette valeur pour conserver le ratio aspect
                      className="rotate box-border object-contain overflow-hidden shrink-0 mt-auto mr-auto mb-5 w-full aspect-[1.02] max-w-[130px] min-h-[auto] min-w-[20px] object-[bottom_left]"
                      loading="lazy"
                    />
                    <BuilderImage
                      src="https://cdn.builder.io/api/v1/image/assets%2Fb7c2b5e165594b20b03520696ff96e46%2F5d7a1de52e4149bcbb454c99de0e212e"
                      alt=""
                      width={130} // Tu peux ajuster cette valeur en fonction de tes besoins
                      height={130} // Idem, ajuste cette valeur pour conserver le ratio aspect
                      className="absolute top-[23px] left-[-4.1px] object-cover overflow-hidden shrink-0 mt-0 mr-auto ml-7 w-full aspect-square max-w-[79px] min-h-[20px] min-w-[20px] z-[999999999]"
                      loading="lazy"
                    />
                  </div>

                  <div className="box-border flex relative flex-col shrink-0 justify-start pl-4 mr-auto w-full">
                    <BodyText className="inline-flex text-secondary">
                      <Github
                        width="37px"
                        height="37px"
                        className="pr-2 pb-[13px]"
                      />
                      Github
                    </BodyText>
                    <BodyText className="inline-flex text-secondary">
                      <Linkedin
                        width="33px"
                        height="33px"
                        className="pr-2 pb-[13px]"
                        stroke-width="1px"
                      />
                      Linkedin
                    </BodyText>
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