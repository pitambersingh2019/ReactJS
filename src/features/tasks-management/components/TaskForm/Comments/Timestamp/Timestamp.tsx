import { useState } from "react";
import useFormattedTimestamp from "../../../../hooks/useFormattedTimestamp";
import { getTooltipFormattedDate } from "../../../../utils/date-time-helpers";
import TimeTooltip from "../../TimeTooltip/TimeTooltip";
import { StyledTimestamp, TimestampContainer } from "./timestamp.styles";

type TimestampProps = {
  createDate: string;
};

export default function Timestamp({ createDate }: TimestampProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const value = useFormattedTimestamp(createDate);
  const formattedDate = getTooltipFormattedDate(createDate);

  return (
    <TimestampContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StyledTimestamp>{value}</StyledTimestamp>
      {showTooltip && <TimeTooltip date={formattedDate} />}
    </TimestampContainer>
  );
}
