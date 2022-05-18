import {
  AccordionContainer,
  ArrowIcon,
  ContentContainer,
  SummaryContainer,
} from "./styles";
import arrow from "../../../../../assets/icons/Arowdropdown.svg";
import { ReactNode, useEffect, useState } from "react";
import { Collapse } from "@mui/material";

export type AccordionProps = {
  summaryComponent: ReactNode;
  contentComponent: ReactNode;
  expanded?: boolean;
  arrowCentered?: boolean;
  variant?: "form" | "dashboard";
  updateExpanded?: () => void;
};

export default function Accordion({
  summaryComponent,
  contentComponent,
  expanded: expandedInit = false,
  arrowCentered = false,
  variant = "dashboard",
  updateExpanded,
}: AccordionProps) {
  const [expanded, setExpanded] = useState(expandedInit);

  const toggleExpanded = () => {
    if (updateExpanded) {
      updateExpanded();
    } else {
      setExpanded((prev) => !prev);
    }
  };

  useEffect(() => {
    setExpanded(expandedInit);
  }, [expandedInit]);

  return (
    <AccordionContainer variant={variant} expanded={expanded}>
      <SummaryContainer
        onClick={toggleExpanded}
        arrowCentered={arrowCentered}
        variant={variant}
        expanded={expanded}
      >
        <ArrowIcon
          src={arrow}
          alt="arrow icon"
          expanded={expanded}
          arrowCentered={arrowCentered}
        />
        {summaryComponent}
      </SummaryContainer>
      <Collapse in={expanded}>
        <ContentContainer expanded={expanded} variant={variant}>
          {expanded && contentComponent}
        </ContentContainer>
      </Collapse>
    </AccordionContainer>
  );
}
