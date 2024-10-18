// app/types/home.ts
export interface HomeData {
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
  text_contact: string;
}
