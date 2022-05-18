import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import TextAreaField from "../../../../Component/DesignSystem/TextArea";
import { InputMode } from "../../../../Component/DesignSystem/TextArea/types";
import { translations } from "../../../../locales/translations";
import { useTaskForm } from "../../context/useTaskForm";
import { useTasksPermissionsLevel } from "../../context/useTasksPermissionsLevel";
import { ErrorState } from "./TaskForm";

type DescriptionProps = {
  errors: ErrorState | undefined;
  setErrors: (errors: ErrorState | undefined) => void;
};

export default function Description({ errors, setErrors }: DescriptionProps) {
  const { t } = useTranslation();
  const { description, setDescription, creatorId } = useTaskForm();
  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    setErrors({
      ...errors,
      descriptionError: !text.trim(),
    });
  };

  const isCreator =
    creatorId || creatorId === 0 ? currentUserId === creatorId : true;

  const isDisabled = (level3 || level2) && !isCreator;

  return (
    <Grid item xs={12}>
      <TextAreaField
        required
        placeholder=""
        value={description || ""}
        onChange={handleDescriptionChange}
        TitleText={t(translations.TasksManagement.Description) + "*"}
        mode={isDisabled ? InputMode.readonly : InputMode.editable}
        isError={errors?.descriptionError}
        maxLength={2000}
        withCounter
      />
    </Grid>
  );
}
