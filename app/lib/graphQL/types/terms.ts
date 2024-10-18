export interface MentionsLegale {
  data: Data;
}

export interface Data {
  attributes: Terms;
}

export interface Terms {
  title: string;
  text: { type: string; children: { type: string; text: string }[] }[];
}
