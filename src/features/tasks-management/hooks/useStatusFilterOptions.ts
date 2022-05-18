import { useEffect, useState } from "react";
import { OptionItem } from "../components/Filters/SectionOptionItem/SectionOptionItem";
import { Status } from "../ts";
import { useFilter } from "../context/useFilter";

export default function useStatusFilterOptions() {
  const [options, setOptions] = useState<OptionItem[] | undefined>(undefined);
  const { statuses } = useFilter();

  useEffect(() => {
    if (statuses) {
      const statusOptions = Object.keys(statuses).map((key) => {
        const statusName: string = Status[Number(key)];
        const status: Status = Status[statusName as keyof typeof Status];
        return {
          name: Status[Number(key)] as keyof typeof Status,
          isChecked: statuses[status],
        };
      });
      setOptions(statusOptions);
    }
  }, [statuses]);

  return { options };
}
