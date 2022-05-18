import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { NotMapped, UserColumnContainer } from "./user-column.styles";

type UserColumnProps = {
  columnName: string | null;
};

export default function UserColumn({ columnName }: UserColumnProps) {
  const { t } = useTranslation();
  return columnName ? (
    <UserColumnContainer>{columnName}</UserColumnContainer>
  ) : (
    <NotMapped>{t(translations.SyncTool.ColumnNotMapped)}</NotMapped>
  );
}
