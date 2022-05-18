import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { DaysInput, DoneInDaysContainer } from "./done-in-days.styles";

export default function DoneInDays() {
  const { doneInXDays, setDoneInXDays } = useFilter();
  const { t } = useTranslation();
  return (
    <DoneInDaysContainer>
      {t(translations.TasksManagement.DoneInTheLast)}
      <DaysInput
        value={doneInXDays}
        onChange={(e) => setDoneInXDays(e.target.value)}
        type="number"
        isValid={Number(doneInXDays) > 0}
      />
      {t(translations.TasksManagement.Days)}
    </DoneInDaysContainer>
  );
}
