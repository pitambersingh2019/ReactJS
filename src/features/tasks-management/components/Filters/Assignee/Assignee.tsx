import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import useAssigneeFilterOptions from "../../../hooks/useAssigneeFilterOptions";
import { useFilter } from "../../../context/useFilter";
import { useFilterDrawer } from "../../../context/useFilterDrawer";
import { Checked } from "../../../ts";
import { toggleAllFilterOptions, topOptionChecked } from "../../../utils";
import Section from "../Section/Section";
import { OptionItem, TopOption } from "../SectionOptionItem/SectionOptionItem";

export default function Assignee() {
  const { assigneeDisplayName, setAssigneeDisplayName } = useFilter();
  const { options } = useAssigneeFilterOptions();
  const { assigneeOpened, setAssigneeOpened } = useFilterDrawer();

  const { t } = useTranslation();

  const topOption: TopOption = {
    name: t(translations.TasksManagement.AllAssignees),
    isChecked: topOptionChecked(options?.map((o) => o.isChecked)),
  };

  const onAssigneeChange = (optionItem: OptionItem) => {
    const updatedAssignees = {
      ...assigneeDisplayName,
      [optionItem.name]: optionItem.isChecked,
    };
    setAssigneeDisplayName(updatedAssignees);
  };

  const onToggleTopOption = () => {
    const { isChecked } = topOption;

    if (assigneeDisplayName) {
      if (isChecked === Checked.All) {
        const uncheckedAll = toggleAllFilterOptions({
          options: assigneeDisplayName,
          checked: false,
        });
        setAssigneeDisplayName(uncheckedAll);
        return;
      }

      if (isChecked === Checked.None || isChecked === Checked.Half) {
        const checkedAll = toggleAllFilterOptions({
          options: assigneeDisplayName,
          checked: true,
        });
        setAssigneeDisplayName(checkedAll);
      }
    }
  };

  return (
    <>
      {options && (
        <Section
          name={t(translations.TasksManagement.Assignee)}
          options={options}
          topOption={topOption}
          onToggleCheckbox={onAssigneeChange}
          onToggleTopOption={onToggleTopOption}
          open={assigneeOpened}
          setOpen={setAssigneeOpened}
          withSearch
        />
      )}
    </>
  );
}
