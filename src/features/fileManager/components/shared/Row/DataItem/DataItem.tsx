import { IterfaceDataItem } from "../../../../ts";
import {
  ArrowIcon,
  DataItemContainer,
  FieldName,
  FirstRowContainer,
  Required,
  SideContainer,
  Wrapper,
} from "./data-item.styles";
import FieldDescription from "./FieldDescription/FieldDescription";
import FieldType from "./FieldType/FieldType";
import arrowIcon from "../../../../assets/img/mapping_arrow.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";

type DataItemProps = {
  dataItem: IterfaceDataItem;
};

export default function DataItem({ dataItem }: DataItemProps) {
  const { MandatoryFields, AllowNull, Description, Type, FieldSize } = dataItem;

  const { t } = useTranslation();

  return (
    <Wrapper>
      <DataItemContainer>
        <FirstRowContainer>
          <FieldName>{MandatoryFields}</FieldName>
          <FieldDescription description={Description} />
        </FirstRowContainer>
        <FieldType type={Type} info={FieldSize} />
      </DataItemContainer>
      <SideContainer>
        {!AllowNull && (
          <Required>*{t(translations.SyncTool.Required)}</Required>
        )}
        <ArrowIcon src={arrowIcon} alt="arrow icon" />
      </SideContainer>
    </Wrapper>
  );
}
