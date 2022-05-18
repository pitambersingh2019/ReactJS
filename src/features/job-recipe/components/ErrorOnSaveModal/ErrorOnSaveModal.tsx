import { useTranslation } from "react-i18next";
import CustomPopover from "../../../../Component/CustomModal/CustomPopover";
import Button from "../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetOnSaveErrorMessage } from "../../redux/slice";
import {
  ButtonContainer,
  Content,
  TitleContainer,
  WarningIcon,
} from "./error-on-save-modal.styles";
import warningIcon from "../../../../assets/icons/tasks-management/warning.svg";

export default function ErrorOnSaveModal() {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(
    (state) => state.jobRecipe.onSaveErrorMessage
  );

  const onClose = () => {
    dispatch(resetOnSaveErrorMessage());
    // dispatch(setShouldFocusCellWithError(true));
  };

  const { t } = useTranslation();

  return (
    <CustomPopover
      isOpen={errorMessage !== undefined}
      handleClose={onClose}
      customStyles={{
        width: "272px",
        minHeight: "225px",
        padding: "24px 16px 17px 24px",
      }}
    >
      <TitleContainer>
        <WarningIcon src={warningIcon} alt="warning icon" />
        <span>{t(translations.JobRecipe.Error)}</span>
      </TitleContainer>
      <Content>{errorMessage}</Content>
      <ButtonContainer>
        <Button
          onClick={onClose}
          label={t(translations.TasksManagement.GotIt)}
          size="md"
        />
      </ButtonContainer>
    </CustomPopover>
  );
}
