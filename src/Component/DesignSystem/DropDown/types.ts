import { ReactNode } from "react";

export enum DropDownMode {
  disabled = "disabled",
  readonly = "readonly",
  selectable = "selectable",
}

export interface Item {
  value: number;
  label: string;
  childComponent?: ReactNode;
}

export interface DropDownSelectInterface {
  placeholder: string;
  required: boolean;
  mode?: DropDownMode;
  onSelect: (item: Item | undefined) => void;
  TitleText: string;
  items: Item[];
  selectedItem?: Item;
  searchable?: boolean;
  searchPlaceHolder?: string;
  RequiredText?: string;
  isError?: boolean;
  dropDownListHeight?: string;
  varient?: string; //"smallblue" | ""
  allowEmptySelect?: boolean; // defaults to true
}

export enum POSITION {
  TOP = "top",
  BOTTOM = "bottom",
}
export interface DropDownSelectWithDeleteInterface {
  placeholder: string;
  required: boolean;
  mode?: DropDownMode;
  onSelect: (item: Item | undefined) => void;
  onDelete: (item: Item) => void;
  TitleText: string;
  items: Item[];
  selectedItem?: Item;
  searchable?: boolean;
  searchPlaceHolder?: string;
  RequiredText?: string;
  isError?: boolean;
}

export interface MultiDropDownSelectInterface {
  placeholder: string;
  required: boolean;
  mode?: DropDownMode;
  onSelect: (items: Item[]) => void;
  TitleText: string;
  items: Item[];
  selectedItems?: Item[];
  searchable?: boolean;
  showSelected?: boolean;
  searchPlaceHolder?: string;
  RequiredText?: string;
  showSelectedText?: string;
  showAllText?: string;
}
