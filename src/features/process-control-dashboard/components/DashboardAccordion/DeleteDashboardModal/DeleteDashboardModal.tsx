import { Buttons, Content, Modal, Title } from "../../shared/CustomModal";
import warningIcon from "../../../../../assets/icons/tasks-management/warning.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import Button from "../../../../../Component/DesignSystem/Buttons";

type DeleteDashboardModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onDelete: () => void;
};

export default function DeleteDashboardModal({
  isOpen,
  handleClose,
  onDelete,
}: DeleteDashboardModalProps) {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "338px",
        minHeight: "280px",
        padding: "32px 24px 16px",
      }}
    >
      <Title
        icon={warningIcon}
        titleText={t(translations.ProcessControlDashboard.DeleteDashboard)}
      />
      <Content>
        {t(translations.ProcessControlDashboard.DeleteDashboardModalContent)}
        <br />
        {t(translations.ProcessControlDashboard.SureToProceed)}
      </Content>
      <div style={{ marginTop: "24px" }} />
      <Content>{t(translations.ProcessControlDashboard.NoUndo)}</Content>
      <Buttons marginTop="88px">
        <Button
          label={t(translations.ProcessControlDashboard.Cancel)}
          variant="purple-secondary"
          onClick={handleClose}
          width="128px"
          size="md"
        />
        <Button
          label={t(translations.ProcessControlDashboard.DeleteDashboard)}
          onClick={onDelete}
          width="146px"
          size="md"
          variant="purple"
        />
      </Buttons>
    </Modal>
  );
}
