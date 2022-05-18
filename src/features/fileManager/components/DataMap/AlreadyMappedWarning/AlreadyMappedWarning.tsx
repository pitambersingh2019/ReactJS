import {
  AlreadyMappedWarningContainer,
  WarningIcon,
  ContentNotice,
  ContentBold,
} from "./already-mapped-warning.styles";
import mappedWarningIcon from "../../../assets/img/mapped-warning.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";

export default function AlreadyMappedWarning() {
  const { t } = useTranslation();
  return (
    <AlreadyMappedWarningContainer>
      <WarningIcon src={mappedWarningIcon} alt="mapped warning icon" />
      <ContentBold>{t(translations.SyncTool.AlreadyMapped)}</ContentBold>
      <ContentBold>{t(translations.SyncTool.WantToRemap)}</ContentBold>
      <ContentNotice>{t(translations.SyncTool.RemappingWarning)}</ContentNotice>
    </AlreadyMappedWarningContainer>
  );
}
