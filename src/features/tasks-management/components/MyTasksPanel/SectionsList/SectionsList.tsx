import { useState } from "react";
import useColumnHeaders from "../../../hooks/useColumnHeaders";
import { GroupedTasks } from "../../../ts";
import Section from "../Section/Section";
import { SectionsListContainer } from "./sections-list.styles";

type SectionsListProps = {
  groupedTasks: GroupedTasks;
};

export default function SectionsList({ groupedTasks }: SectionsListProps) {
  const [activeSectionIdx, setActiveSectionIdx] = useState(-1);

  const { headers } = useColumnHeaders(groupedTasks);

  const handleToggle = (idx: number) => {
    setActiveSectionIdx(idx === activeSectionIdx ? -1 : idx);
  };
  return (
    <SectionsListContainer>
      {headers
        .filter((h) => h !== "Unassigned")
        .map((header, idx) => (
          <Section
            key={idx}
            name={header}
            tasks={groupedTasks[header] || []}
            onToggleSection={() => handleToggle(idx)}
            isActiveSection={activeSectionIdx === idx}
          />
        ))}
    </SectionsListContainer>
  );
}
