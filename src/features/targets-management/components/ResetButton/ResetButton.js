import React from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";

import CustomModal from "../ResetTargetsModal/Modal";
import Tooltip from "../Tooltip/Tooltip";
import { StyledContainer } from "./reset-button.styles.js";
import Button from "../../../../Component/DesignSystem/Buttons";
import { useTableWidth } from "../../context/TableWidthContext";

function ResetButton() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  const { tableWidth } = useTableWidth();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return tableWidth ? (
    <StyledContainer tableWidth={tableWidth}>
      <Tooltip text={t(translations.TargetsManagement.ResetTooltip)}>
        <Button
          label={t(translations.TargetsManagement.ResetTargets)}
          onClick={openModal}
          variant="secondary"
          width="auto"
        />
      </Tooltip>
      <CustomModal isOpen={modalIsOpen} handleClose={closeModal} />
    </StyledContainer>
  ) : null;
}

export default ResetButton;
