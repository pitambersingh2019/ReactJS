import { useEffect, useState } from "react";
import { OptionItem } from "../components/Filters/SectionOptionItem/SectionOptionItem";
import { TaskPriority } from "../ts";
import { useFilter } from "../context/useFilter";

export default function usePriorityLevelsFilterOptions() {
  const [options, setOptions] = useState<OptionItem[] | undefined>(undefined);
  const { priorityLevels } = useFilter();

  useEffect(() => {
    if (priorityLevels) {
      const levels = Object.keys(priorityLevels).map((key) => {
        const priority: string = TaskPriority[Number(key)];
        const level: TaskPriority =
          TaskPriority[priority as keyof typeof TaskPriority];
        return {
          name: TaskPriority[Number(key)] as keyof typeof TaskPriority,
          isChecked: priorityLevels[level],
        };
      });
      setOptions(levels);
    }
  }, [priorityLevels]);

  return { options };
}
