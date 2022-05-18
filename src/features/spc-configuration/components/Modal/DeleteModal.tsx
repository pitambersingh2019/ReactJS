// import { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
import PriorityHigh from "@material-ui/icons/PriorityHigh";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import Button from "../../../../Component/DesignSystem/Buttons";
// import { ApplyParamsSetting } from "../../slice";
// import { selectTreeDepartments } from "../../slice/selectors";
// import { TreeData, SelectedMachine, ControllerField } from "../../slice/types";
import {
  StyledModalBackground,
  StyledModalContentWrapper,
  StyledModalContent,
  StyledModalHeader,
  StyleModalHeaderTitle,
  StyledButtonGroup,
  StyledModalDescription,
} from "./modal.styles";

interface DeleteModalProps {
  closeModal: (value: number | undefined) => void;
  confirmDeleteTemplate: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  closeModal,
  confirmDeleteTemplate,
}) => {
  const { t } = useTranslation();

  return (
    <StyledModalBackground>
      <StyledModalContentWrapper width="336px" height="280px">
        <StyledModalContent>
          <StyledModalHeader>
            <PriorityHigh
              style={{
                fontSize: "24px",
                color: "#c73431",
                border: "1px solid #c73431",
                borderRadius: "50%",
                padding: "2px",
              }}
            />
            <StyleModalHeaderTitle>
              {t(translations.SPC.DELETE_SPC_TEMPLATE)}
            </StyleModalHeaderTitle>
          </StyledModalHeader>
          <StyledModalDescription>
            {t(translations.SPC.DELETE_SPC_TEMPLATE_DESCRIPTION)}
            <br></br>
            {t(translations.SPC.DELETE_SPC_ARE_YOU_SURE)}
          </StyledModalDescription>
          <StyledModalDescription>
            {t(translations.SPC.UNDO_ACTION)}
          </StyledModalDescription>
        </StyledModalContent>
        <StyledButtonGroup justify="center">
          <Button
            onClick={() => closeModal(undefined)}
            label={t(translations.SPC.CANCEL)}
            size="md"
            variant="secondary"
          />
          <Button
            onClick={confirmDeleteTemplate}
            label={t(translations.SPC.DELETE_TEMPLATE)}
            size="md"
          />
        </StyledButtonGroup>
      </StyledModalContentWrapper>
    </StyledModalBackground>
  );
};

export default DeleteModal;
