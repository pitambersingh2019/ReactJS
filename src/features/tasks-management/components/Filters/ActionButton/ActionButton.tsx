import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { useTasks } from "../../../context/useTasks";
import { ButtonContainer } from "./action-button.styles";

type ActionButtonProps = {
  onClickAdditional?: () => void;
};

export default function ActionButton({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickAdditional = () => {},
}: ActionButtonProps) {
  const { t } = useTranslation();
  const {
    filtersUpdated,
    onFilterTasks,
    filtersApplied,
    makeActiveFilters,
    doneInXDays,
  } = useFilter();
  const { fetchTasks } = useTasks();

  const onApply = async () => {
    fetchTasks(Number(doneInXDays) * 24);
    onFilterTasks();
    makeActiveFilters();
    onClickAdditional();
  };

  return (
    <ButtonContainer>
      <Button
        label={t(translations.TasksManagement.Apply)}
        onClick={onApply}
        size="md"
        width="88px"
        disabled={!filtersUpdated && !filtersApplied}
      />
    </ButtonContainer>
  );
}
