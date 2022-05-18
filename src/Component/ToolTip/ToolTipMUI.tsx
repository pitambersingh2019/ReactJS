import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import styled from "styled-components";

export const TooltipDate = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "5px",
    margin: "5px",
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: "16px",
    border: "1px solid #dadde9",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#dadde9",
  },
}));

export const TooltipDateCard = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "8px 5px 9px 5px",
    backgroundColor: "#ffffff",
    color: "#000000",
    maxWidth: 220,
    fontSize: "12px",
    border: "1px solid #efefef",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.25",
    letterSpacing: "normal",
  },
  [`& .${tooltipClasses.tooltipPlacementTop}`]: {
    position: "absolute",
    width: "110px",
    bottom: "-10px",
    right: `${theme.dir === "rtl" ? "-100px" : "unset"}`,
  },
  [`& .${tooltipClasses.tooltipPlacementBottom}`]: {
    position: "absolute",
    width: "110px",
    bottom: "-30px",
    right: `${theme.dir === "rtl" ? "-160px" : "unset"}`,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#dadde9",
  },
}));

export const TooltipNameCard = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "8px 5px 9px 5px",
    backgroundColor: "#ffffff",
    color: "#000000",
    maxWidth: 420,
    fontSize: "12px",
    border: "1px solid #efefef",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.25",
    letterSpacing: "normal",
  },
  [`& .${tooltipClasses.tooltipPlacementTop}`]: {
    position: "absolute",
    width: "220px",
    bottom: "-10px",
    right: `${theme.dir === "rtl" ? "-225px" : "unset"}`,
  },
  [`& .${tooltipClasses.tooltipPlacementBottom}`]: {
    position: "absolute",
    width: "220px",
    bottom: "-30px",
    right: `${theme.dir === "rtl" ? "-160px" : "unset"}`,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#dadde9",
  },
}));

export const TooltipDiscription = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "10px",
    margin: "5px",
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 500,
    fontSize: "16px",
    border: "1px solid #dadde9",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#dadde9",
  },
}));

export const ToolTipTitle = styled(({ className, ...props }) => (
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
