import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { useValues } from "../../hooks/useValues";

import ModalItem from "../ColumnChooserModalItem/ModalItem";
import {
  ModalContainer,
  ModalHeader,
  ModalSubtitle,
} from "./column-chooser-modal.styles";

function ColumnChooserModal({ isOpen }) {
  const { values } = useValues();
  const headerTitles = values?.KpiTargetName;

  const { t } = useTranslation();

  return (
    isOpen && (
      <ModalContainer>
        <ModalHeader>
          {t(translations.TargetsManagement.ColumnSelectorTitle)}
        </ModalHeader>
        <ModalSubtitle>
          {t(translations.TargetsManagement.ColumnSelectorSubtitle)}
        </ModalSubtitle>

        {headerTitles?.map(({ LName, Name, IsActive }) => (
          <ModalItem
            columnTitle={LName}
            key={Name}
            targetName={Name}
            checked={IsActive}
          />
        ))}
      </ModalContainer>
    )
  );
}

export default ColumnChooserModal;
