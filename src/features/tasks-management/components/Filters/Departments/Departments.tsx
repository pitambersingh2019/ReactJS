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

export default function Departments() {
  const { t } = useTranslation();
  const { levelObjects, setLevelObjects } = useFilter();
  const { objects } = useTaskLevelObjects();
  const { departmentOptions } = useObjectsFilterOptions();
  const { departmentOpened, setDepartmentOpened } = useFilterDrawer();

  const topOption: TopOption = {
    name: t(translations.TasksManagement.AllDepartments),
    isChecked: topOptionChecked(departmentOptions?.map((o) => o.isChecked)),
  };

  const onDepartmentChange = (optionItem: OptionItem) => {
    const departmentId =
      objects?.Departments.find((item) => item.LName === optionItem.name)?.ID ||
      0;
    if (levelObjects) {
      const updatedLevelObjects = {
        ...levelObjects,
        [TaskLevel.Department]: {
          ...levelObjects[TaskLevel.Department],
          [departmentId]: optionItem.isChecked,
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
          options: levelObjects[TaskLevel.Department],
          checked: false,
        });
        setLevelObjects({
          ...levelObjects,
          [TaskLevel.Department]: uncheckedAll,
        });
        return;
      }

      if (isChecked === Checked.None || isChecked === Checked.Half) {
        const checkedAll = toggleAllFilterOptions({
          options: levelObjects[TaskLevel.Department],
          checked: true,
        });
        setLevelObjects({
          ...levelObjects,
          [TaskLevel.Department]: checkedAll,
        });
      }
    }
  };

  return (
    <>
      {departmentOptions && (
        <Section
          name={t(translations.TasksManagement.Departments)}
          options={departmentOptions}
          topOption={topOption}
          onToggleCheckbox={onDepartmentChange}
          onToggleTopOption={onToggleTopOption}
          open={departmentOpened}
          setOpen={setDepartmentOpened}
        />
      )}{" "}
    </>
  );
}
