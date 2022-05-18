import styled from "styled-components";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const ToolTipComp = styled(({ className, ...props }) => (
  <Tooltip
    PopperProps={{
      disablePortal: true,
    }}
    {...props}
    classes={{ popper: className }}
  />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
))(({ theme }) => ({
  [`& .${tooltipClasses.popper}`]: {
    zIndex: 99999999,
    background: "red",
  },
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
    zIndex: 999999999,
  },
}));
export default ToolTipComp;
