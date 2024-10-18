// app/types/skills.ts

// Définition des attributs d'une techno individuelle
export interface TechnoAttributes {
  name: string;
  percent: number;
}

// Définition de la structure de techno.data
export interface TechnoDataAttributes {
  techno: TechnoAttributes[]; // techno est un tableau d'objets contenant name et percent
}

// TechnoData encapsule les données d'une techno avec ses attributs
export interface TechnoData {
  data: { attributes: TechnoDataAttributes }; // Ajout du champ 'data'
}

// Définition des attributs d'un Skill
export interface SkillAttributes {
  title: string;
  subtitle: string;
  techno: TechnoData; // techno contient 'data'
}

// Définition d'un Skill complet
export interface Skill {
  attributes: SkillAttributes;
}
