export enum DropDownMode {
  disabled = "disabled",
  readonly = "readonly",
  selectable = "selectable",
}

export enum PlacementEnum {
  bottom = "bottom",
  top = "top",
}
export interface Item {
  value: number;
  label: string;
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
