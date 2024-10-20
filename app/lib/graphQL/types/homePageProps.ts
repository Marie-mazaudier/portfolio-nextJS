// app/types/homePageProps.ts
import { HomeData } from './home';
import { ProjectsData } from './projects';
import { Skill } from './skills';

export interface HomePageProps {
  homeData: HomeData;
  projectsData: ProjectsData[];
  skillsData: Skill[];
  globalData?: any; // Ajouter globalData comme prop optionnelle
  logo: string;
}
