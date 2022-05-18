import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { useStackBy } from "../../../context/useStackBy";
import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";
import Content from "./Content";
import { ButtonContainer } from "./modal.styles";
import Title from "./Title";

type NoPermissionProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function NoPermission({
  isOpen,
  handleClose,
}: NoPermissionProps) {
  const { t } = useTranslation();
  const { stackBySelectedOption } = useStackBy();

  const getContent = () => {
    if (stackBySelectedOption === "assignee") {
      return t(translations.TasksManagement.NoPermissionModalContentAssignee);
    }
    if (stackBySelectedOption === "priority") {
      return t(translations.TasksManagement.NoPermissionModalContentPriority);
    }
    if (stackBySelectedOption === "subject") {
      return t(translations.TasksManagement.NoPermissionModalContentSubject);
    }
    return "";
  };
  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "272px",
        minHeight: "225px", //TODO height = 256px with ShowAgain component
        padding: "24px 16px 17px 24px",
      }}
    >
      <Title text={t(translations.TasksManagement.NoPermission)} />
      <Content text={getContent()} />
      {/* <ShowAgain text={t(translations.TasksManagement.ShowAgain)} /> */}
      <ButtonContainer>
        <Button
          onClick={handleClose}
          label={t(translations.TasksManagement.GotIt)}
          size="md"
        />
      </ButtonContainer>
    </CustomPopover>
  );
}
