import { useEffect, useState } from "react";
import { OptionItem } from "../components/Filters/SectionOptionItem/SectionOptionItem";
import { useFilter } from "../context/useFilter";
import { useTaskObjects } from "../context/useTaskObjects";

export default function useSubjectFilterOptions() {
  const [options, setOptions] = useState<OptionItem[] | undefined>(undefined);
  const { subjects } = useFilter();
  const { activeSubjectItems } = useTaskObjects();

  useEffect(() => {
    if (subjects && activeSubjectItems) {
      const subs = Object.keys(subjects).map((key) => ({
        name:
          activeSubjectItems.find((sub) => sub.value.toString() === key)
            ?.label || "",
        isChecked: subjects[Number(key)],
      }));
      setOptions(subs);
    }
  }, [subjects, activeSubjectItems]);

  return { options };
}
