export interface IItem {
  id: string;
  name: string;
  children?: { [index: string]: IItem };
}

export interface IItems {
  [index: string]: IItem;
}
