import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { useFilterDrawer } from "../../../context/useFilterDrawer";
import useObjectsFilterOptions from "../../../hooks/useObjectsFilterOptions";
import { useTaskLevelObjects } from "../../../context/useTaskLevelObjects";
import { Checked, TaskLevel } from "../../../ts";
import { toggleAllFilterOptions, topOptionChecked } from "../../../utils";
import Section from "../Section/Section";
import { OptionItem, TopOption } from "../SectionOptionItem/SectionOptionItem";

export default function Machines() {
  const { t } = useTranslation();
  const { levelObjects, setLevelObjects } = useFilter();
  const { objects } = useTaskLevelObjects();
  const { machineOptions } = useObjectsFilterOptions();
  const { machinesOpened, setMachinesOpened } = useFilterDrawer();

  const topOption: TopOption = {
    name: t(translations.TasksManagement.AllMachines),
    isChecked: topOptionChecked(machineOptions?.map((o) => o.isChecked)),
  };

  const onMachineChange = (optionItem: OptionItem) => {
    const machineId =
      objects?.Machines.find((item) => item.MachineLName === optionItem.name)
        ?.ID || 0;
    if (levelObjects) {
      const updatedLevelObjects = {
        ...levelObjects,
        [TaskLevel.Machine]: {
          ...levelObjects[TaskLevel.Machine],
          [machineId]: optionItem.isChecked,
        },
      };
      setLevelObjects(updatedLevelObjects);
    }
  };

  const onToggleTopOption = () => {
    const { isChecked } = topOption;
    if (levelObjects) {
      if (isChecked === Checked.All) {
        const uncheckedAll = toggleAllFilterOptions({
          options: levelObjects[TaskLevel.Machine],
          checked: false,
        });
        setLevelObjects({
          ...levelObjects,
          [TaskLevel.Machine]: uncheckedAll,
        });
        return;
      }

      if (isChecked === Checked.None || isChecked === Checked.Half) {
        const checkedAll = toggleAllFilterOptions({
          options: levelObjects[TaskLevel.Machine],
          checked: true,
        });
        setLevelObjects({
          ...levelObjects,
          [TaskLevel.Machine]: checkedAll,
        });
      }
    }
  };

  return (
    <>
      {machineOptions && (
        <Section
          name={t(translations.TasksManagement.Machines)}
          options={machineOptions}
          topOption={topOption}
          onToggleCheckbox={onMachineChange}
          onToggleTopOption={onToggleTopOption}
          open={machinesOpened}
          setOpen={setMachinesOpened}
          withSearch
        />
      )}
    </>
  );
}
