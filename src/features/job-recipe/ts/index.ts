export type APIProductRecipeJob = {
  Recipe: {
    channels: Channel[];
  };
  error: {
    ErrorCode: number;
    ErrorMessage?: string;
  };
  RecipeRef: RecipeRef[];
  RecipeJobLastUpdate: string;
  RecipeJobUpdatedBy: string;
};

export type RecipeRefType = 1 | 2 | 6;

export type RecipeRef = {
  Checked: boolean;
  EName: string;
  LName: string;
  MEJid: number;
  RecipeRefType: RecipeRefType;
  StandardRecipe: StandardRecipe[];
};

type StandardRecipe = {
  Checked: boolean;
  EName: string;
  LName: string;
  standardID: number;
};

export type Channel = {
  inRecipeMatrix: boolean;
  ChannelLname: string;
  ChannelEname: string;
  channelSplit: ChannelSplit[];
  ChannelNum: number;
};

export type ChannelSplit = {
  splits: Split[];
};

type ComboValue = {
  ComboQueryHField: string;
  ComboQueryEField: string;
  ComboValueField: number;
  isDefault: boolean;
  ChildcomboValues: [];
};

export type Split = {
  ProductID: number;
  ProductRecipeID: number;
  PropertyID: number;
  ChannelNum: number;
  SplitNum: number;
  LValue: number;
  HValue: number;
  matrixModeID: 0;
  matrixPositionID: 1;
  IsValid: boolean;
  PropertyEName: string;
  PropertyHName: string;
  DisplayType: "combo" | "num" | "text" | "Boolean";
  IsEditable: boolean;
  RecipeFValue: boolean;
  RecipeLValue: boolean;
  RecipeHValue: boolean;
  IsEnabled: boolean;
  PropertyName: string;
  FValue: string;
  MandatoryField: boolean;
  FValueCalcFunction: string;
  AllowNull: boolean;
  AllowEdit: boolean;
  ComboValues: ComboValue[];
  CalcUpdateOption: number;
  SourceTable: string;
  LValueCalcFunction: string;
  HValueCalcFunction: string;
  ToolTip: string;
};

export type APIProductReferenceRecipeJob = {
  channels: Channel[];
  LastUpdate: string;
  UpdatedBy: string;
};

export type MachineSplit = {
  Id: number;
  LName: string;
  EName: string;
  FieldName: string;
  DisplayType: 6 | 1;
  DisplayTypeName: "Number" | "Text";
  TargetParameters: string;
  isSum: boolean;
  AllowEntry: boolean;
  Value: string;
  SplitNumber: number;
  UrlTarget: string;
  SearchListAPI: string;
  KeyName: string;
  KeyValue: string;
  RefValue: string;
};

export type MachineChannel = {
  //typo on the backend
  Cahnnel: number;
  Split: MachineSplit[][];
  CahnnelPC: string;
};

export type APIMachineMainChannelsParametersData = {
  //typo on the backend
  Chanels: MachineChannel[];
};

export type APISaveMachineMainChannelsParametersData = {
  error: { ErrorCode: number; ErrorMessage?: string } | null;
};

export type DrawerExpanded = {
  drawerId: string | number;
  expanded: boolean;
};

export type ProductionParameters = {
  RecipeID: number;
  FValue: string;
  LValue: number;
  HValue: number;
};

export type APIUpdateProductRecipeJob = {
  JobID: number;
  recipeValue: ProductionParameters[];
};

export type ChannelParameter = {
  ChannelNum: number;
  KeyName: string;
  KeyValue: string | number;
  SplitNum: number;
};

export type MachineSplitsTableRow = {
  splitId: string | number;
  material: {
    refValue: string | undefined;
    value: string | undefined;
  } & Partial<MachineSplit>;
  catalog: {
    refValue: string | undefined;
    value: string | undefined;
  } & Partial<MachineSplit>;
  batch: {
    refValue: string | undefined;
    value: string | undefined;
  } & Partial<MachineSplit>;
  [key: string]: any;
};

export type InventoryItem = {
  ID: number;
  MaterialBatch: string;
  EffectiveAmount: number;
  CatalogID: string;
  Date: string;
  MaterialName: string;
  Description: string;
};

export type APIInventoryListForMaterial = {
  error: {
    ErrorCode: number;
    ErrorMessage?: string;
  };
  ResponseDictionaryDT: {
    InventoryItems?: InventoryItem[];
  };
};

export type APIGetInventoryListForMaterialParams = {
  JobID: number;
  MaterialID: number | string;
};

export type MaterialItem = {
  ID: number;
  CatalogID: string;
  MaterialID: number;
  MaterialName: string;
  Description: string;
  MaterialGroupName: string;
};

export type APIMaterialsList = {
  error: {
    ErrorCode: number;
    ErrorMessage?: string;
  };
  ResponseDictionaryDT: {
    Materials: MaterialItem[];
  };
};

export type ReferenceRecipeOption = {
  label: string;
  id: number;
  checked?: boolean;
  recipeRefType: RecipeRefType;
};

export type SelectedRecipeRefType = {
  refType: RecipeRefType;
  standardID: StandardRecipe["standardID"];
};

export type UpsertRecordByFormParams = {
  FieldName: string;
  Eq: number | string | null;
  DataType: "num" | "text" | "True/False" | "Date";
}[];

export type TitleDataItem = {
  DisplayEName: string;
  DisplayLName: string;
  DisplayOrder: number;
  ID: number;
  UrlTarget: string;
  Value: string;
};

export type LastUpdated = {
  date: string;
  updatedBy: string;
};

export enum SAVING_STATE {
  IDLE = "IDLE",
  SAVING = "SAVING",
  SAVED = "SAVED",
}

export function isInventoryItem(
  item: InventoryItem | MaterialItem
): item is InventoryItem {
  return (item as InventoryItem).MaterialBatch !== undefined;
}
