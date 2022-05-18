// import React, { useRef, useEffect, useState } from "react";
// import { TooltipCard, TooltipContainer, TooltipBox } from "./styles";
import styled from "styled-components";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// export const positionTypes = { LEFT: "left", RIGHT: "right" };
// const ToolTip = ({ Text, children, position, disabled }) => {
//   const ref = useRef(null);
//   const [width, setwidth] = useState(0);
//   useEffect(() => {
//     if (ref.current) {
//       const fullWidth = ref.current.getBoundingClientRect().width + 20;
//       setwidth(fullWidth);
//     }
//   }, []);
//   return (
//     <TooltipCard>
//       <TooltipContainer>{children}</TooltipContainer>
//       {!disabled && (
//         <TooltipBox ref={ref} width={width} position={position}>
//           {Text}
//         </TooltipBox>
//       )}
//     </TooltipCard>
//   );
// };

export const ToolTipComp = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "5px",
    margin: "5px",
    backgroundColor: "#ffffff",
    color: "#101010",
    maxWidth: 220,
    fontSize: "14px",
    borderRadius: "2px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.16)",
    border: "1px solid #e4e7eb",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
}));
export default ToolTipComp;
