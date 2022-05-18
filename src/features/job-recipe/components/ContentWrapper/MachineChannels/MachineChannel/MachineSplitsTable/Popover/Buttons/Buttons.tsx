import { useTranslation } from "react-i18next";
import Button from "../../../../../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../../../../../locales/translations";
import { ButtonsContainer } from "./buttons.styles";

type ButtonsProps = {
  onCancel: () => void;
  onApply: () => void;
  isDisabled: boolean;
};

export default function Buttons({
  onCancel,
  isDisabled,
  onApply,
}: ButtonsProps) {
  const { t } = useTranslation();

  return (
    <ButtonsContainer>
      <Button
        variant="purple-secondary"
        label={t(translations.TasksManagement.Cancel)}
        onClick={onCancel}
      />
      <Button
        variant="purple"
        label={t(translations.TasksManagement.Apply)}
        onClick={onApply}
        disabled={isDisabled}
      />
    </ButtonsContainer>
  );
}
