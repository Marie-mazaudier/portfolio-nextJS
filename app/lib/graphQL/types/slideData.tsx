// app/types/slides.ts

// Interface pour un bloc de texte enrichi
export interface RichTextBlock {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

// Mise à jour de SlideData pour refléter la structure de description_project
export interface SlideData {
  title: string;
  description_project: RichTextBlock[]; // Met à jour description_project avec la structure RichText
  stacks: { id: number; text: string }[];
  image: string;
  link: string;
  width: number;
  height: number;
  client: string;
  site_category: string;
}
