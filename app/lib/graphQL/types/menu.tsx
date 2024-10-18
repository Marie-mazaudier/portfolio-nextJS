export interface MenuData {
  menusMenus: MenusMenus[];
}

export interface MenusMenus {
  id: string;
  attributes: MenuAttributes;
}

export interface MenuAttributes {
  items: Items;
}

export interface Items {
  data: Item[];
}

export interface Item {
  id: string;
  attributes: ItemAttributes;
}

export interface ItemAttributes {
  title: string;
  url: string;
  parent: Parent;
}

export interface Parent {
  data: null | ParentData;
}

export interface ParentData {
  id: string;
  attributes: ParentAttributes;
}

export interface ParentAttributes {
  title: string;
  // Tu peux ajouter ici d'autres attributs du parent s'il y en a
}
