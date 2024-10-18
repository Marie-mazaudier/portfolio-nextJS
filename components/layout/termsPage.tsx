import React from "react";
import { Heading1 } from "../atoms/typography/headingText/heading1";
import { Terms } from "@/app/lib/graphQL/types/terms";
import { RichText } from "../atoms/RichText/RichText ";

const TermsPage: React.FC<Terms> = ({ title, text }) => {
  return (
    <section className="bg-secondary w-full min-h-[100vh]  p-5 text-justify">
      <div className=" text-primary lg:my-10 my-5 mx-auto  pt-32 box-border flex relative flex-col justify-center grow shrink-0 self-stretch  w-full max-w-[1200px]">
        <Heading1 size="xl" className="mb-10">
          {title}
        </Heading1>
        <RichText content={text} />
      </div>
    </section>
  );
};

export default TermsPage;
