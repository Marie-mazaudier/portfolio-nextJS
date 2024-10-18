// app/types/portfolioProps.ts
import { ProjectsData } from './projects'; // Réutilisation des données de projet
import { ListItem } from './list'; // Import des items de liste
export interface PortfolioProps {
  projects: ProjectsData[];
  listItems: ListItem[];
}
