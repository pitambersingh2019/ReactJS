import { useRef, useState } from "react";
import {
  DashboardCreatorContainer,
  TooltipContainer,
  Tooltip,
} from "./dashboard-creator.styles";

type DashboardCreatorProps = {
  creator: string;
};

export default function DashboardCreator({ creator }: DashboardCreatorProps) {
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
    <div onMouseEnter={handleHover} onMouseLeave={hideTooltip}>
      <DashboardCreatorContainer ref={textRef} showCursor={isOverflowActive()}>
        {creator}
      </DashboardCreatorContainer>
      {showTooltip && (
        <TooltipContainer>
          <Tooltip>{creator}</Tooltip>
        </TooltipContainer>
      )}
    </div>
  );
}
