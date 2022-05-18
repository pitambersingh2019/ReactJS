import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DropDownSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import {
  DropDownMode,
  Item,
} from "../../../../Component/DesignSystem/DropDown/types";
import { translations } from "../../../../locales/translations";
import { useTaskForm } from "../../context/useTaskForm";
import { useTaskObjects } from "../../context/useTaskObjects";
import { useTasksPermissionsLevel } from "../../context/useTasksPermissionsLevel";
import SubSubject from "./SubSubject";
import { ErrorState } from "./TaskForm";

type SubjectRowProps = {
  errors: ErrorState | undefined;
  setErrors: (errors: ErrorState | undefined) => void;
};

export default function SubjectRow({ errors, setErrors }: SubjectRowProps) {
  const [subSubjectOptions, setSubSubjectOptions] = useState<
    Item[] | undefined
  >(undefined);

  const { subjectId, setSubjectId, creatorId, setSubSubjectId } = useTaskForm();
  const { activeSubjectItems, subSubjects } = useTaskObjects();
  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();
  const { t } = useTranslation();

  const handleSubjectChange = (item: Item | undefined) => {
    setSubjectId(item ? item.value : undefined);
    setErrors({
      ...errors,
      subjectError: !item?.value,
    });
    setSubSubjectOptions(undefined);
    setSubSubjectId(undefined);
  };

  const isCreator =
    creatorId || creatorId === 0 ? currentUserId === creatorId : true;

  const isDisabled = (level3 || level2) && !isCreator;

  useEffect(() => {
    if (subjectId) {
      const options = subSubjects
        ?.filter((subSubject) => subSubject.SubjectID === subjectId)
        .map((subSubject) => ({
          value: subSubject.ID,
          label: subSubject.DisplayName || "",
        }));
      setSubSubjectOptions(options);
    } else {
      setSubSubjectOptions(undefined);
    }
  }, [subSubjects, subjectId]);

  return (
    <>
      <Grid item xs={6}>
        {activeSubjectItems && (
          <DropDownSelect
            placeholder={t(translations.TasksManagement.SelectSubject)}
            required
            onSelect={handleSubjectChange}
            TitleText={t(translations.TasksManagement.Subject) + "*"}
            items={activeSubjectItems}
            selectedItem={activeSubjectItems.find(
              (sub) => sub.value === subjectId
            )}
            mode={isDisabled ? DropDownMode.readonly : DropDownMode.selectable}
            isError={errors?.subjectError}
            searchable={activeSubjectItems.length > 5}
          />
        )}
      </Grid>
      <Grid item xs={6}>
        <SubSubject
          subSubjectOptions={subSubjectOptions}
          isDisabled={isDisabled}
        />
      </Grid>
    </>
  );
}
