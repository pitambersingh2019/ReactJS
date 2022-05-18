import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { AddButtonContainer } from "./save-button.styles";

type SaveButtonProps = {
  onAdd: () => void;
  isDisabled: boolean;
};

export default function SaveButton({ onAdd, isDisabled }: SaveButtonProps) {
  const { t } = useTranslation();

  const handleClick = () => {
    onAdd();
  };

  return (
    <AddButtonContainer>
      <Button
        label={t(translations.ProcessControlDashboard.Save)}
        onClick={handleClick}
        width="88px"
        variant="purple"
        disabled={isDisabled}
      />
    </AddButtonContainer>
  );
}
