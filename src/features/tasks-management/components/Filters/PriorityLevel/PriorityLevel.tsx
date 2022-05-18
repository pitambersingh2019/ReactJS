import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { Checked, TaskPriority } from "../../../ts";
import { toggleAllPriorityLevelFilter, topOptionChecked } from "../../../utils";
import { OptionItem, TopOption } from "../SectionOptionItem/SectionOptionItem";
import Section from "../Section/Section";
import usePriorityLevelsFilterOptions from "../../../hooks/usePriorityLevelsFilterOptions";
import { useFilterDrawer } from "../../../context/useFilterDrawer";

export default function PriorityLevel() {
  const { priorityLevels, setPriorityLevels } = useFilter();
  const { options } = usePriorityLevelsFilterOptions();
  const { priorityLevelOpened, setPriorityLevelOpened } = useFilterDrawer();

  const { t } = useTranslation();

  const topOption: TopOption = {
    name: t(translations.TasksManagement.AllLevels),
    isChecked: topOptionChecked(
      priorityLevels && Object.values(priorityLevels)
    ),
  };

  const onPriorityLevelChange = (optionItem: OptionItem) => {
    const priority = TaskPriority[optionItem.name as keyof typeof TaskPriority];
    if (priorityLevels) {
      setPriorityLevels({
        ...priorityLevels,
        [priority]: optionItem.isChecked,
      });
    }
  };

  const onToggleTopOption = () => {
    const { isChecked } = topOption;
    if (priorityLevels) {
      if (isChecked === Checked.All) {
        const uncheckedAll = toggleAllPriorityLevelFilter({
          priorityLevels,
          checked: false,
        });
        setPriorityLevels(uncheckedAll);
        return;
      }

      if (isChecked === Checked.None || isChecked === Checked.Half) {
        const checkedAll = toggleAllPriorityLevelFilter({
          priorityLevels,
          checked: true,
        });
        setPriorityLevels(checkedAll);
      }
    }
  };

  return (
    <>
      {options && (
        <Section
          name={t(translations.TasksManagement.PriorityLevel)}
          options={options}
          topOption={topOption}
          onToggleCheckbox={onPriorityLevelChange}
          onToggleTopOption={onToggleTopOption}
          open={priorityLevelOpened}
          setOpen={setPriorityLevelOpened}
        />
      )}
    </>
  );
}
