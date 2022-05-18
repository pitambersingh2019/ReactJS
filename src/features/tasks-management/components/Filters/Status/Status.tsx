import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { useFilterDrawer } from "../../../context/useFilterDrawer";
import useStatusFilterOptions from "../../../hooks/useStatusFilterOptions";
import { Checked, Status } from "../../../ts";
import { toggleAllStatusFilter, topOptionChecked } from "../../../utils";
import Section from "../Section/Section";
import { OptionItem, TopOption } from "../SectionOptionItem/SectionOptionItem";

export default function StatusFilter() {
  const { statuses, setStatuses } = useFilter();
  const { options } = useStatusFilterOptions();
  const { statusOpened, setStatusOpened } = useFilterDrawer();
  const { t } = useTranslation();

  const topOption: TopOption = {
    name: t(translations.TasksManagement.AllStatuses),
    isChecked: topOptionChecked(statuses && Object.values(statuses)),
  };

  const onStatusChange = (optionItem: OptionItem) => {
    const status = Status[optionItem.name as keyof typeof Status];
    if (statuses) {
      setStatuses({
        ...statuses,
        [status]: optionItem.isChecked,
      });
    }
  };

  const onToggleTopOption = () => {
    const { isChecked } = topOption;
    if (statuses) {
      if (isChecked === Checked.All) {
        const uncheckedAll = toggleAllStatusFilter({
          statuses,
          checked: false,
        });
        setStatuses(uncheckedAll);
        return;
      }

      if (isChecked === Checked.None || isChecked === Checked.Half) {
        const checkedAll = toggleAllStatusFilter({
          statuses,
          checked: true,
        });
        setStatuses(checkedAll);
      }
    }
  };

  return (
    <>
      {options && (
        <Section
          name={t(translations.TasksManagement.Status)}
          options={options}
          topOption={topOption}
          onToggleCheckbox={onStatusChange}
          onToggleTopOption={onToggleTopOption}
          open={statusOpened}
          setOpen={setStatusOpened}
        />
      )}
    </>
  );
}
