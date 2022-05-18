import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";
import Content from "./Content";
import { ButtonContainer } from "./modal.styles";
import Title from "./Title";

type NotCompleteModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function NotCompleteModal({
  isOpen,
  handleClose,
}: NotCompleteModalProps) {
  const { t } = useTranslation();
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
      <Title text={t(translations.TasksManagement.SubtasksNotComplete)} />
      <Content
        text={t(translations.TasksManagement.SubtasksNotCompleteContent)}
      />
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
