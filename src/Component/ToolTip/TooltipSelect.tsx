import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    maxWidth: "250px",
    width: "auto",
    border: "solid 1px #e4e7eb",
    boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.16)",
    borderRadius: "4px",
    color: "#000",
    fontSize: "14px",
    fontFamily: "ProximaNova, sans-serif",
    padding:
      document.body.dir === "rtl" ? "12px 16px 12px 9px" : "12px 9px 12px 16px",
    margin: "0",
  },
}));

export default HtmlTooltip;
