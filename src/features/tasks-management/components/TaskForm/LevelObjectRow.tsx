import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DropDownSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import {
  DropDownMode,
  Item,
} from "../../../../Component/DesignSystem/DropDown/types";
import { translations } from "../../../../locales/translations";
import { useDepartmentMachine } from "../../context/useDepartmentMachine";
import { useTaskForm } from "../../context/useTaskForm";
import { useTaskLevelObjects } from "../../context/useTaskLevelObjects";
import { useTaskObjects } from "../../context/useTaskObjects";
import { useTasksPermissionsLevel } from "../../context/useTasksPermissionsLevel";
import { getObjectOptions } from "../../utils";

export default function LevelObjectRow() {
  const [objectOptions, setObjectOptions] = useState<Item[] | undefined>(
    undefined
  );

  const { levelId, setLevelId, objectId, setObjectId, creatorId } =
    useTaskForm();
  const { levelItems } = useTaskObjects();
  const { objects } = useTaskLevelObjects();
  const { departmentMachines } = useDepartmentMachine();

  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();

  const isCreator =
    creatorId || creatorId === 0 ? currentUserId === creatorId : true;

  const isDisabled = (level3 || level2) && !isCreator;

  const { t } = useTranslation();

  const handleLevelChange = (item: Item | undefined) => {
    setLevelId(item ? item.value : undefined);
    setObjectId(undefined);
  };

  const handleObjectChange = (item: Item | undefined) => {
    setObjectId(item ? item.value : undefined);
  };

  useEffect(() => {
    if (levelId) {
      const options = getObjectOptions({
        level: levelId,
        objects,
        departmentMachines,
      });
      setObjectOptions(options);
    }
  }, [departmentMachines, levelId, objects]);

  return (
    <>
      <Grid item xs={6}>
        {levelItems && (
          <DropDownSelect
            placeholder={t(translations.TasksManagement.SelectLevel)}
            required={false}
            onSelect={handleLevelChange}
            TitleText={t(translations.TasksManagement.TaskLevel)}
            items={levelItems}
            selectedItem={levelItems.find((lev) => lev.value === levelId)}
            mode={isDisabled ? DropDownMode.readonly : DropDownMode.selectable}
            searchable={levelItems.length > 5}
          />
        )}
      </Grid>
      <Grid item xs={6}>
        {objectOptions && (
          <DropDownSelect
            placeholder={t(translations.TasksManagement.SelectObject)}
            required={false}
            onSelect={handleObjectChange}
            TitleText={t(translations.TasksManagement.TaskObject)}
            items={objectOptions}
            selectedItem={objectOptions.find((obj) => obj.value === objectId)}
            mode={isDisabled ? DropDownMode.readonly : DropDownMode.selectable}
            searchable={objectOptions.length > 5}
          />
        )}
      </Grid>
    </>
  );
}
