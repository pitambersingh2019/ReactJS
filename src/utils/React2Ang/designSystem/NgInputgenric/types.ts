export interface displayFormResults {
  $scope: any; //remove
  content: ContentEntity;
  search: any; // boolean from where
  formobject: any;
  multiform: any;
  add: any;
  commonFunctions: any;
  language: string;
  modal: any;
  state: any;
  fullSize: any;
  SaveValues: (value: any, isSysemChanges: boolean) => void;
}

export interface ContentEntity {
  fileName?: any;
  fileType?: any;
  AllowEntry?: boolean;
  AllowNull?: boolean;
  CheckBoxSelectAllOption?: boolean;
  ChildDisplayEName?: string | null;
  ChildDisplayLName?: string | null;
  ChildDisplayOrder?: number;
  ChildDisplayTypeName?: string | null;
  ChildName?: string | null;
  ComboAddParentCriteria?: boolean;
  ComboDisplayList?: boolean;
  DataSource?: string;
  DataSourceKey?: boolean;
  DecimalPoint?: number;
  DefaultValue?: any;
  DisplayEName?: string;
  DisplayLName?: string;
  DisplayOrder?: number;
  DisplayType?: number;
  DisplayTypeName?: string;
  FileDisplayHeight?: number;
  FileDisplayWidth?: number;
  GroupID?: any;
  HasSearchBox?: boolean;
  Hint?: string;
  LinkTarget?: string;
  MandatoryField?: boolean;
  MaxValue?: number | null;
  MinValue?: number | null;
  Name?: string;
  ObjectTypeID?: number;
  SearchLinkReportID?: null;
  ShowInCriteria?: boolean;
  ShowInResult?: boolean;
  ShowOnNew?: boolean;
  ToolTip?: string;
  comboValues?: ComboValuesEntity[];
  isOrderField?: boolean;
  value?: any;
  valueChosen?: any;
  contentDisplayName?: string;
  required?: boolean;
  disabled?: boolean;
  ChildValueChosen?: any;
  editableTable?: any;
  decimalValue?: any;
}
export interface ComboValuesEntity {
  ChildcomboValues?: any;
  ComboChainField?: null;
  ComboQueryEField: string;
  ComboQueryHField: string;
  ComboValueField: number;
  isDefault: boolean;
}
