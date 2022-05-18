import { Item } from "../../../../../Component/DesignSystem/DropDown/types";
import { IterfaceDataItem } from "../../../ts";
import ColumnSelector from "./ColumnSelector/ColumnSelector";
import DataItem from "./DataItem/DataItem";
import {
  LeftSideContainer,
  RightSideContainer,
  RowContainer,
} from "./row.styles";
import UserColumn from "./UserColumn/UserColumn";

type RowProps = {
  dataItem: IterfaceDataItem;
  userFieldsItems?: Item[];
  withSelect?: boolean;
};

export default function Row({
  dataItem,
  userFieldsItems,
  withSelect = true,
}: RowProps) {
  return (
    <RowContainer>
      <LeftSideContainer>
        <DataItem dataItem={dataItem} />
      </LeftSideContainer>
      <RightSideContainer>
        {withSelect && userFieldsItems && (
          <ColumnSelector
            dataItemId={dataItem.SyncDefinitionFieldID}
            userFieldsItems={userFieldsItems}
          />
        )}
        {!withSelect && <UserColumn columnName={dataItem.sourcefieldname} />}
      </RightSideContainer>
    </RowContainer>
  );
}
