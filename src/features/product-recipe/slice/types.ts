export interface ProductRecipeState {
  loading: boolean;
  LastUpdate: Date | undefined;
  UpdatedBy: string | undefined;
  Channels: Channel[] | undefined;
  editing: boolean;
  collapsStatus: boolean[];
  changedValues: ChangedValue[];
  productID: number | undefined;
  MaterialsList: Material[];
  UpdatingStatus: "init" | "saving" | "saved";
}

export interface ChangedValue {
  RecipeID: number;
  FValue?: number;
  LValue?: number;
  HValue?: number;
}

export interface ResponseRecipeDetailsData {
  ChannelSplitName: null | string;
  LastUpdate: Date;
  UpdatedBy: string;
  error: null | string;
  channels: Channel[];
}

export interface Channel {
  ChannelEname: string;
  ChannelLname: string;
  ChannelNumber: number;
  channelSplit: ChannelSplit[];
  channelSplits: ChannelSplit[];
  inRecipeMatrix: boolean;
}

export interface ChannelSplit {
  EName: null | string;
  ID: number;
  LName: null | string;
  SplitNumber: number;
  splits: Split[];
}

export interface Split {
  ProductID: number;
  ProductRecipeID: number;
  PropertyID: number;
  ChannelNum: number;
  SplitNum: number;
  LValue: number;
  HValue: number;
  matrixModeID: number;
  matrixPositionID: number;
  IsValid: boolean;
  PropertyEName: string;
  PropertyHName: string;
  DisplayType: string;
  MaterialTypeEname: string;
  MaterialTypeLname: string;
  MaterialGroupLName: null | string;
  MaterialGroupEName: null | string;
  MaterialImageLink: null | string;
  ComboDisplayHField: string;
  ComboDisplayEField: string;
  ComboValueField: string;
  AllowNull: boolean;
  IsEditable: boolean;
  GroupID: number;
  RecipeFValue: boolean;
  RecipeLValue: boolean;
  RecipeHValue: boolean;
  IsEnabled: boolean;
  ToleranceUpdateOption: number;
  SortOrder: number;
  CalcUpdateOption: number;
  RoundNum: number;
  ValidateValue: boolean;
  MinValidValue: null | boolean | string | number;
  MaxValidValue: null | boolean | string | number;
  MaterialEName: string;
  MaterialLName: string;
  SearchLink: boolean;
  SearchLinkReportID: number;
  CatalogID: string;
  ToolTip: undefined | string;
  FValueCalcFunction: undefined | string | number;
  MandatoryField: boolean;
  ComboValues: string[];
  AllowEdit: boolean;
  PropertyName: string;
  FValue: number;
  Range: null | number | string;
  DisplayOrder: number;
}

export interface ResponseMaterialsList {
  Data: [];
  Response: null;
  ResponseDataTable: [];
  ResponseDictionary: null;
  ResponseDictionaryValues: null;
  ResponseExpandoObjectDictionary: null;
  ResponseList: null;
  error: null;
  ResponseDictionaryDT: { Materials: Material[] };
}

export interface Material {
  ID: number;
  CatalogID: string;
  MaterialID: number;
  MaterialName: string;
  Description: null | string;
  MaterialGroupName: null | string;
}
