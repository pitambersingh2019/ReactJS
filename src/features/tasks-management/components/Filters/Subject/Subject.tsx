import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { useTaskObjects } from "../../../context/useTaskObjects";
import { Checked } from "../../../ts";
import { toggleAllFilterOptions, topOptionChecked } from "../../../utils";
import { OptionItem, TopOption } from "../SectionOptionItem/SectionOptionItem";
import Section from "../Section/Section";
import useSubjectFilterOptions from "../../../hooks/useSubjectFilterOptions";
import { useFilterDrawer } from "../../../context/useFilterDrawer";

export default function Subject() {
  const { subjects, setSubjects } = useFilter();
  const { activeSubjectItems } = useTaskObjects();
  const { options } = useSubjectFilterOptions();
  const { subjectOpened, setSubjectOpened } = useFilterDrawer();

  const { t } = useTranslation();

  const topOption: TopOption = {
    name: t(translations.TasksManagement.AllSubjects),
    isChecked: topOptionChecked(options?.map((o) => o.isChecked)),
  };

  const onSubjectChange = (optionItem: OptionItem) => {
    const subjectId =
      activeSubjectItems?.find((item) => item.label === optionItem.name)
        ?.value || 0;
    const updatedSubjects = {
      ...subjects,
      [subjectId]: optionItem.isChecked,
    };
    setSubjects(updatedSubjects);
  };

  const onToggleTopOption = () => {
    const { isChecked } = topOption;
    if (subjects) {
      if (isChecked === Checked.All) {
        const uncheckedAll = toggleAllFilterOptions({
          options: subjects,
          checked: false,
        });
        setSubjects(uncheckedAll);
        return;
      }

      if (isChecked === Checked.None || isChecked === Checked.Half) {
        const checkedAll = toggleAllFilterOptions({
          options: subjects,
          checked: true,
        });
        setSubjects(checkedAll);
      }
    }
  };

  return (
    <>
      {options && (
        <Section
          name={t(translations.TasksManagement.Subject)}
          options={options}
          topOption={topOption}
          onToggleCheckbox={onSubjectChange}
          onToggleTopOption={onToggleTopOption}
          open={subjectOpened}
          setOpen={setSubjectOpened}
          withSearch
        />
      )}
    </>
  );
}
