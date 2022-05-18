import {
  AccordionContainer,
  ArrowIcon,
  ContentContainer,
  ScrollWrapper,
  SummaryContainer,
  WhiteDiv,
} from "./accordion.styles";
import arrow from "../../../../../assets/icons/Arowdropdown.svg";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Collapse } from "@mui/material";
//@ts-ignore
import throttle from "lodash.throttle";

export type AccordionProps = {
  summaryComponent: ReactNode;
  contentComponent: ReactNode;
  expanded?: boolean;
  arrowCentered?: boolean;
  updateExpanded?: () => void;
  handleScroll?: (show: boolean) => void;
  changeBorderColor?: boolean;
};

export default function Accordion({
  summaryComponent,
  contentComponent,
  expanded: expandedInit = false,
  arrowCentered = false,
  updateExpanded,
  handleScroll,
  changeBorderColor = false,
}: AccordionProps) {
  const [expanded, setExpanded] = useState(expandedInit);
  const [scrollDir, setScrollDir] = useState<"UP" | "DOWN">("UP");

  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const scroll = scrollRef.current;

    if (scroll) {
      const threshold = 0;
      let lastScrollY = scroll.scrollTop;
      let ticking = false;

      const updateScrollDir = () => {
        const scrollY = scroll.scrollTop;

        if (Math.abs(scrollY - lastScrollY) < threshold) {
          ticking = false;
          return;
        }
        const diff = Math.abs(scrollY - lastScrollY);

        //the search bar height is between 33 and 34.5 px, thus flickering on scroll (the bar hides/shows)
        if (!inRange(diff, 33, 34.5)) {
          setScrollDir(scrollY > lastScrollY ? "DOWN" : "UP");
          handleScroll && handleScroll(scrollDir === "UP" && lastScrollY >= 0);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
        ticking = false;
      };

      const onScroll = throttle(() => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollDir);
          ticking = true;
        }
      }, 100);

      scroll.addEventListener("scroll", onScroll);

      return () => scroll.removeEventListener("scroll", onScroll);
    }
  }, [handleScroll, scrollDir]);

  return (
    <AccordionContainer
      expanded={expanded}
      changeBorderColor={changeBorderColor}
    >
      <SummaryContainer
        onClick={toggleExpanded}
        arrowCentered={arrowCentered}
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
        <ContentContainer expanded={expanded}>
          <WhiteDiv />
          <ScrollWrapper ref={scrollRef}>
            {expanded && contentComponent}
          </ScrollWrapper>
        </ContentContainer>
      </Collapse>
    </AccordionContainer>
  );
}

function inRange(x: number, min: number, max: number) {
  return (x - min) * (x - max) <= 0;
}
