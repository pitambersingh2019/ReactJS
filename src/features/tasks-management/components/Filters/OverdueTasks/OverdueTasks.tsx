import { useTranslation } from "react-i18next";
import Toggle from "../../../../../Component/DesignSystem/Toggle";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { SectionLabel } from "../filters.styles";
import { Container } from "./overdue-tasks.styles";

export default function OverdueTasks() {
  const { showOverdueTasks, setShowOverdueTasks } = useFilter();

  const { t } = useTranslation();

  const onToggleOnOff = () => {
    setShowOverdueTasks(!showOverdueTasks);
  };

  return (
    <Container>
      <SectionLabel>
        {t(translations.TasksManagement.OverdueTasks)}
      </SectionLabel>
      {showOverdueTasks !== undefined && (
        <Toggle
          isOn={showOverdueTasks}
          onToggleOnOff={onToggleOnOff}
          variant="purple"
        />
      )}
    </Container>
  );
}
