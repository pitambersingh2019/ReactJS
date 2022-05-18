import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";
import { FieldType } from "../../../../../ts";
import { FieldTypeContainer } from "./field-type.styles";

type FieldTypeComponentProps = {
  type: FieldType;
  info: number | null;
};

export default function FieldTypeComponent({
  type,
  info,
}: FieldTypeComponentProps) {
  const { t } = useTranslation();

  const getContent = () => {
    if (type === "string") {
      return `${t(translations.SyncTool.TextString)} (${info} ${t(
        translations.SyncTool.CharactersMax
      )})`;
    }

    if (type === "datetime") {
      return `${t(translations.SyncTool.DateField)} (${info} ${t(
        translations.SyncTool.Format
      )})`;
    }

    if (type === "bool") {
      return `${t(translations.SyncTool.Boolean)} (${t(
        translations.SyncTool.OnOff
      )}, ${t(translations.SyncTool.YesNo)})`;
    }

    return `${t(translations.SyncTool.Number)}`;
  };

  const content = getContent();

  return <FieldTypeContainer>{content}</FieldTypeContainer>;
}
