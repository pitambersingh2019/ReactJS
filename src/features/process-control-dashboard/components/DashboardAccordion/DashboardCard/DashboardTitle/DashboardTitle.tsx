import { useRef, useState } from "react";
import {
  DashboardTitleContainer,
  Tooltip,
  TooltipContainer,
} from "./dashboard-title.styles";

type DashboardTitleProps = {
  title: string;
};

export default function DashboardTitle({ title }: DashboardTitleProps) {
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
      <DashboardTitleContainer ref={textRef} showCursor={isOverflowActive()}>
        {title}
      </DashboardTitleContainer>
      {showTooltip && (
        <TooltipContainer>
          <Tooltip>{title}</Tooltip>
        </TooltipContainer>
      )}
    </div>
  );
}
