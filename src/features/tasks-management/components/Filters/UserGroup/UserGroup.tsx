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

export default function UserGroup() {
  const { t } = useTranslation();

  const { levelObjects, setLevelObjects } = useFilter();
  const { objects } = useTaskLevelObjects();
  const { userGroupOptions } = useObjectsFilterOptions();
  const { userGroupOpened, setUserGroupOpened } = useFilterDrawer();

  const topOption: TopOption = {
    name: t(translations.TasksManagement.AllUserGroups),
    isChecked: topOptionChecked(userGroupOptions?.map((o) => o.isChecked)),
  };

  const onUserGroupChange = (optionItem: OptionItem) => {
    const userGroupId =
      objects?.UserDefinitions.find((item) => item.EName === optionItem.name)
        ?.ID || 0;
    if (levelObjects) {
      const updatedLevelObjects = {
        ...levelObjects,
        [TaskLevel.UserGroup]: {
          ...levelObjects[TaskLevel.UserGroup],
          [userGroupId]: optionItem.isChecked,
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
          options: levelObjects[TaskLevel.UserGroup],
          checked: false,
        });
        setLevelObjects({
          ...levelObjects,
          [TaskLevel.UserGroup]: uncheckedAll,
        });
        return;
      }

      if (isChecked === Checked.None || isChecked === Checked.Half) {
        const checkedAll = toggleAllFilterOptions({
          options: levelObjects[TaskLevel.UserGroup],
          checked: true,
        });
        setLevelObjects({
          ...levelObjects,
          [TaskLevel.UserGroup]: checkedAll,
        });
      }
    }
  };

  return (
    <>
      {userGroupOptions && (
        <Section
          name={t(translations.TasksManagement.UserGroup)}
          options={userGroupOptions}
          topOption={topOption}
          onToggleCheckbox={onUserGroupChange}
          onToggleTopOption={onToggleTopOption}
          open={userGroupOpened}
          setOpen={setUserGroupOpened}
        />
      )}{" "}
    </>
  );
}
