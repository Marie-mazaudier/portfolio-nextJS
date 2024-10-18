import { RichTextBlock } from '@/components/atoms/RichText/RichText ';
export interface ProjectAttributes {
  title: string;
  description_project: RichTextBlock[]; // Assure-toi que c'est bien un tableau de blocs RichText

  Client: string;
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

export interface ProjectsData {
  id: string;
  attributes: ProjectAttributes;
}
