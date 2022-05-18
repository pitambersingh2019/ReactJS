import {
  EmptyTableContainer,
  Illustration,
  SubText,
  Text,
} from "./empty-table.styles";
import emptyTableImg from "../../../assets/img/empty-table.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";

export default function EmptyTable() {
  const { t } = useTranslation();
  return (
    <EmptyTableContainer>
      <Illustration src={emptyTableImg} alt="empty table illustration" />
      <Text>{t(translations.SyncTool.NoResultsFound)}</Text>
      <SubText>{t(translations.SyncTool.AdjustSelections)}</SubText>
    </EmptyTableContainer>
  );
}
