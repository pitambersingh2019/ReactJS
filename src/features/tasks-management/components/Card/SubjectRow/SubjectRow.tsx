import { useState } from "react";
import SubSubject from "../SubSubject/SubSubject";
import { Subject, SubjectRowContainer, Tooltip } from "./subject-row.styles";

type SubjectRowProps = {
  subject: string;
  subSubject?: string;
  isSmallMargin: boolean;
};

export default function SubjectRow({
  subject,
  subSubject,
  isSmallMargin,
}: SubjectRowProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const isOverflowActive = (subject && subject.length > 30) || false;
  const subjectWithOverflow = isOverflowActive
    ? subject.substring(0, 30) + "..."
    : subject;

  const subjectAndSubsubject = subSubject
    ? `${subject} - ${subSubject}`
    : subject;

  const handleHover = () => {
    setShowTooltip(isOverflowActive);
  };

  const hideTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <SubjectRowContainer
      isSmallMargin={isSmallMargin}
      onMouseEnter={handleHover}
      onMouseLeave={hideTooltip}
      showCursor={isOverflowActive}
    >
      <Subject>{subjectWithOverflow}</Subject>
      {!isOverflowActive ? (
        <>
          {subSubject && " - "}
          <SubSubject subSubject={subSubject} />
        </>
      ) : (
        showTooltip && <Tooltip>{subjectAndSubsubject}</Tooltip>
      )}
    </SubjectRowContainer>
  );
}
