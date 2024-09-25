"use client"; // Utilisation côté client

import BioSection from "@/components/organisms/Bio/BioSection";
import Portfolio from "@/components/organisms/Portfolio/Portfolio";
import Contact from "@/components/organisms/Contact/Contact";

// Interface pour homeData
interface HomeData {
  main_title: string;
  bio: { type: string; children: { type: string; text: string }[] }[];
  tags: { id: number; text: string }[];
  button: { text: string; link: string };
  contact_photo: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
        width: number;
        height: number;
        name?: string;
      };
    };
  };
  logo_contact: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
        width: number;
        height: number;
      };
    };
  };
  logo: { data: { attributes: { url: string } } };
  projects_title: string;
  contact_title: string;
}

// Interface pour projectsData
interface ProjectAttributes {
  title: string;
  description: string;
  stacks: { id: number; text: string }[];
  button: { text: string; link: string };
  featured_image: {
    data: {
      id: string;
      attributes: {
        url: string;
        width: number;
        height: number;
        alternativeText: string | null;
      };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ProjectsData {
  id: string;
  attributes: ProjectAttributes;
}

// Interface pour HomePageProps
interface HomePageProps {
  homeData: HomeData;
  projectsData: ProjectsData[];
}

const HomePage: React.FC<HomePageProps> = ({ homeData, projectsData }) => {
  //  console.log("homedata", homeData);

  // Sécurisation des données
  const logoUrl = homeData.logo.data.attributes.url || "";
  const logoContactUrl = homeData.logo_contact.data.attributes?.url || "";
  const contactPhotoUrl = homeData.contact_photo.data.attributes?.url || "";
  console.log("projectsData", projectsData);

  // Préparation des données pour BioSection
  const bioSectionData = {
    mainTitle: homeData.main_title,
    bio: homeData.bio,
    tags: homeData.tags,
    buttonText: homeData.button.text,
    buttonLink: homeData.button.link,
    imageUrl: logoUrl, // Sécurisé
  };

  // Préparation des données pour ContactSection
  const contactSectionData = {
    logo_contact: logoContactUrl, // Sécurisé
    contact_photo: contactPhotoUrl, // Sécurisé
    contactTitle: homeData.contact_title,
  };

  return (
    <div>
      <BioSection {...bioSectionData} />
      <Portfolio projects={projectsData} />
      <Contact {...contactSectionData} />
    </div>
  );
};

export default HomePage;
