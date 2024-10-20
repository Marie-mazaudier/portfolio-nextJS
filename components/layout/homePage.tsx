"use client"; // Utilisation côté client

import BioSection from "@/components/organisms/Bio/BioSection";
import Portfolio from "@/components/organisms/Portfolio/Portfolio";
import Contact from "@/components/organisms/Contact/Contact";
import { Stacks } from "../organisms/Stacks/Stacks";
import { HomePageProps } from "@/app/lib/graphQL/types/homePageProps";

const HomePage: React.FC<HomePageProps> = ({
  homeData,
  projectsData,
  skillsData,
  globalData,
  logo,
}) => {
  // console.log("globalData", globalData);

  const logoUrl = homeData.logo.data.attributes.url || "";
  const logoContactUrl = homeData.logo_contact.data.attributes?.url || "";
  const contactPhotoUrl = homeData.contact_photo.data.attributes?.url || "";
  const githubUrl = globalData.github.link || "";
  const linkedinUrl = globalData.linkedin.link || "";

  // console.log("homeData", homeData.tags);

  const bioSectionData = {
    mainTitle: homeData.main_title,
    bio: homeData.bio,
    tags: homeData.tags,
    buttonText: homeData.button.text,
    buttonLink: homeData.button.link,
    logo: logo, // Sécurisé
  };
  const contactSectionData = {
    logo_contact: logoContactUrl, // Sécurisé
    contact_photo: contactPhotoUrl, // Sécurisé
    contactTitle: homeData.contact_title,
    text_contact: homeData.text_contact,
  };
  // Dynamically create listItems from homeData.tags
  const listItems = homeData.tags.map((tag: { text: string }) => ({
    listItem: tag.text,
  }));

  return (
    <div>
      <BioSection {...bioSectionData} />
      <Stacks skills={skillsData} />
      <Portfolio projects={projectsData} listItems={listItems} />
      {/* Ajout de la prop `list` */}
      <Contact
        linkkedinLink={linkedinUrl}
        githubLink={githubUrl}
        {...contactSectionData}
      />
    </div>
  );
};

export default HomePage;
