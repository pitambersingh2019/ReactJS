import { useTranslation } from "react-i18next";
import Modal from "react-modal";

import reset from "../../../../assets/icons/reset-purple.svg";
import Button from "../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../locales/translations";
import useResetTargets from "../../hooks/useResetTargets";
import { useValues } from "../../hooks/useValues";
import {
  StyledButtonsContainer,
  StyledContainer,
  StyledText,
  StyledTitle,
} from "./modal.styles.js";

Modal.setAppElement("#page-top");
// Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "23px 16px 16px 24px",
    borderRadius: "4px",
    boxShadow: "0 0 40px 0 rgba(0, 0, 0, 0.16)",
    border: "solid 1px #f3f3f4",
    maxWidth: "272px",
    maxHeight: "250px",
  },
};

function CustomModal({ isOpen, handleClose }) {
  const { fetchValues } = useValues();
  const [resetTargets] = useResetTargets();

  const { t } = useTranslation();

  const onReset = async () => {
    await resetTargets();
    fetchValues();
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
      <StyledContainer>
        <img src={reset} alt="reset-icon" />
        <StyledTitle>
          {t(translations.TargetsManagement.ResetTargets)}
        </StyledTitle>
        <StyledText>{t(translations.TargetsManagement.ResetModal)}</StyledText>
        <StyledButtonsContainer>
          <Button
            variant="secondary"
            label={t(translations.TargetsManagement.Cancel)}
            onClick={handleClose}
            size="md"
            width="88px"
          />
          <Button
            variant="primary"
            label={t(translations.TargetsManagement.Reset)}
            onClick={onReset}
            size="md"
            width="88px"
          />
        </StyledButtonsContainer>
      </StyledContainer>
    </Modal>
  );
}

export default CustomModal;
