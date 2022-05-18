// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Save from "@material-ui/icons/Save";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import Button from "../../../../Component/DesignSystem/Buttons";
// import { ApplyParamsSetting } from "../../slice";
// import { selectTreeDepartments } from "../../slice/selectors";
// import { TreeData, SelectedMachine, ControllerField } from "../../slice/types";
import InputTextField from "../../../../Component/DesignSystem/InputText";
import {
  StyledModalBackground,
  StyledModalContentWrapper,
  StyledModalContent,
  StyledModalHeader,
  StyleModalHeaderTitle,
  StyledButtonGroup,
  StyledModalDescription,
} from "./modal.styles";

interface SaveModalProps {
  closeModal: (value: boolean) => void;
  templateName: string;
  handleTemplateName: (value: string) => void;
  saveTemplate: () => void;
}

const SaveModal: React.FC<SaveModalProps> = ({
  closeModal,
  templateName,
  handleTemplateName,
  saveTemplate,
}) => {
  const { t } = useTranslation();

  return (
    <StyledModalBackground>
      <StyledModalContentWrapper width="336px" height="280px">
        <StyledModalContent>
          <StyledModalHeader>
            <Save
              style={{
                fontSize: "24px",
                color: "#5900d3",
                border: "1px solid #5900d3",
                borderRadius: "50%",
                padding: "2px",
              }}
            />
            <StyleModalHeaderTitle>
              {t(translations.SPC.SAVE_AS_SPC_TEMPLATE)}
            </StyleModalHeaderTitle>
          </StyledModalHeader>
          <StyledModalDescription>
            {t(translations.SPC.SAVE_TEMPLETE_DESCRIPTION)}
          </StyledModalDescription>
          <InputTextField
            placeholder={"Enter the template name..."}
            required={true}
            TitleText={t(translations.SPC.NEW_SPC_TEMPLATE)}
            value={templateName}
            onChange={handleTemplateName}
            maxLength={40}
          />
        </StyledModalContent>
        <StyledButtonGroup justify="center">
          <Button
            onClick={() => closeModal(false)}
            label={t(translations.SPC.CANCEL)}
            size="md"
            variant="secondary"
          />
          <Button
            onClick={saveTemplate}
            label={t(translations.SPC.SAVE_TEMPLATE)}
            size="md"
            disabled={!(templateName.length > 0)}
          />
        </StyledButtonGroup>
      </StyledModalContentWrapper>
    </StyledModalBackground>
  );
};

export default SaveModal;
