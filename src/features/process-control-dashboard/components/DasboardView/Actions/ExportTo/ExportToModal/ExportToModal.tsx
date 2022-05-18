import { ClickAwayListener } from "@mui/material";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";
import { ExportOption, ExportToModalContainer } from "./export-to-modal.styles";

type ExportToModalProps = {
  onCloseModal: () => void;
  onExportToPDF: () => void;
};

export default function ExportToModal({
  onCloseModal,
  onExportToPDF,
}: ExportToModalProps) {
  const { t } = useTranslation();

  const onOptionClickPDF = () => {
    onCloseModal();
    onExportToPDF();
  };

  return (
    <ClickAwayListener onClickAway={onCloseModal}>
      <ExportToModalContainer>
        <ExportOption onClick={onOptionClickPDF}>
          {t(translations.ProcessControlDashboard.ExportToPDF)}
        </ExportOption>
      </ExportToModalContainer>
    </ClickAwayListener>
  );
}
