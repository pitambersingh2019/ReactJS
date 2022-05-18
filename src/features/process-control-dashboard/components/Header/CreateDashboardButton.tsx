import { useTranslation } from "react-i18next";
import Button from "../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../locales/translations";
import { useEditMode } from "../../context/useEditMode";

export default function CreateDashboardButton() {
  const { t } = useTranslation();
  const { onShowEditMode } = useEditMode();

  const handleClick = () => {
    onShowEditMode();
  };

  return (
    <Button
      label={t(translations.ProcessControlDashboard.CreateNewDashboard)}
      onClick={handleClick}
      withIcon
      width="auto"
      variant="purple"
    />
  );
}
