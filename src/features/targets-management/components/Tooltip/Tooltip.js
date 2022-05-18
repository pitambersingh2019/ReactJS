import React from "react";

import { StyledTooltipBox, StyledTooltipContainer } from "./tooltip.styles.js";

function Tooltip({ children, text, isWide, ...rest }) {
  const [show, setShow] = React.useState(false);

  return (
    <StyledTooltipContainer show={show}>
      <StyledTooltipBox isVisible={show} isWide={isWide}>
        {text}
      </StyledTooltipBox>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        {...rest}
      >
        {children}
      </div>
    </StyledTooltipContainer>
  );
}

export default Tooltip;
