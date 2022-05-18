import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} followCursor />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    maxWidth: 220,
    border: "solid 1px #e4e7eb",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.16)",
    borderRadius: 2,
    color: "#000",
    fontSize: 14,
  },
}));

export default HtmlTooltip;
