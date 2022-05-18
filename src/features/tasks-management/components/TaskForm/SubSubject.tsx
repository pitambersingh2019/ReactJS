import { useTranslation } from "react-i18next";
import DropDownSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import {
  DropDownMode,
  Item,
} from "../../../../Component/DesignSystem/DropDown/types";
import { translations } from "../../../../locales/translations";
import { useTaskForm } from "../../context/useTaskForm";

type SubSubjectProps = {
  subSubjectOptions: Item[] | undefined;
  isDisabled: boolean;
};

export default function SubSubject({
  subSubjectOptions,
  isDisabled,
}: SubSubjectProps) {
  const { subSubjectId, setSubSubjectId } = useTaskForm();
  const { t } = useTranslation();

  const selectedSubSubject =
    subSubjectOptions &&
    subSubjectOptions.find((subSubj) => subSubj.value === subSubjectId);

  const handleSubSubjectChange = (item: Item | undefined) => {
    setSubSubjectId(item ? item.value : undefined);
  };

  if (isDisabled && !selectedSubSubject) {
    return null;
  }

  if (subSubjectOptions && subSubjectOptions.length > 0) {
    return (
      <DropDownSelect
        placeholder={t(translations.TasksManagement.SelectSubSubject)}
        required={false}
        onSelect={handleSubSubjectChange}
        TitleText={t(translations.TasksManagement.SubSubject)}
        items={subSubjectOptions}
        selectedItem={selectedSubSubject}
        searchable={subSubjectOptions.length > 7}
        mode={isDisabled ? DropDownMode.readonly : DropDownMode.selectable}
      />
    );
  }

  return null;
}
