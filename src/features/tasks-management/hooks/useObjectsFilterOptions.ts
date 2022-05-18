import { useEffect, useState } from "react";
import { OptionItem } from "../components/Filters/SectionOptionItem/SectionOptionItem";
import { TaskLevel } from "../ts";
import { useFilter } from "../context/useFilter";
import { useTaskLevelObjects } from "../context/useTaskLevelObjects";

export default function useObjectsFilterOptions() {
  const [machineOptions, setMachineOptions] = useState<
    OptionItem[] | undefined
  >(undefined);
  const [departmentOptions, setDepartmentOptions] = useState<
    OptionItem[] | undefined
  >(undefined);
  const [userGroupOptions, setUserGroupOptions] = useState<
    OptionItem[] | undefined
  >(undefined);
  const { levelObjects } = useFilter();
  const { objects } = useTaskLevelObjects();

  useEffect(() => {
    if (objects && levelObjects) {
      const machines = objects.Machines.map((machine) => ({
        name: machine.MachineLName,
        isChecked: levelObjects[TaskLevel.Machine][machine.ID]
          ? levelObjects[TaskLevel.Machine][machine.ID]
          : false,
      }));
      setMachineOptions(machines);

      const departments = objects.Departments.map((department) => ({
        name: department.LName,
        isChecked: levelObjects[TaskLevel.Department][department.ID]
          ? levelObjects[TaskLevel.Department][department.ID]
          : false,
      }));
      setDepartmentOptions(departments);

      const userGroups = objects.UserDefinitions.map((userDef) => ({
        name: userDef.EName,
        isChecked: levelObjects[TaskLevel.UserGroup][userDef.ID]
          ? levelObjects[TaskLevel.UserGroup][userDef.ID]
          : false,
      }));
      setUserGroupOptions(userGroups);
    }
  }, [objects, levelObjects]);

  return { machineOptions, departmentOptions, userGroupOptions };
}
