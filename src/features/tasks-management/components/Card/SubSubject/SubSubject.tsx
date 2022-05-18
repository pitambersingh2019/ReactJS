import { useRef, useState } from "react";
import {
  SubSubjectContainer,
  SubSubjectTooltip,
  SubSubjectWrapper,
  TooltipContainer,
} from "./subsubject.styles";

type SubSubjectProps = {
  subSubject?: string;
  withTopMargin?: boolean;
};

export default function SubSubject({
  subSubject,
  withTopMargin = false,
}: SubSubjectProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  const isOverflowActive = () => {
    if (textRef.current) {
      return (
        textRef.current.offsetHeight < textRef.current.scrollHeight ||
        textRef.current.offsetWidth < textRef.current.scrollWidth
      );
    }
    return false;
  };

  const handleHover = () => {
    setShowTooltip(isOverflowActive());
  };

  const hideTooltip = () => {
    setShowTooltip(false);
  };

  return (
    <SubSubjectWrapper onMouseEnter={handleHover} onMouseLeave={hideTooltip}>
      <SubSubjectContainer
        withTopMargin={withTopMargin}
        ref={textRef}
        showCursor={isOverflowActive()}
      >
        {subSubject}
      </SubSubjectContainer>
      {showTooltip && (
        <TooltipContainer>
          <SubSubjectTooltip>{subSubject}</SubSubjectTooltip>
        </TooltipContainer>
      )}
    </SubSubjectWrapper>
  );
}
