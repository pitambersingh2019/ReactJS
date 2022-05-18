import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCollapsStatus, selectProductID } from "../../slice/selectors";
import { Channel } from "../../slice/types";
import { removeEmptyLines } from "../../utils/utils";
import Collapse from "@mui/material/Collapse";
import DefaultTable from "../DefaultTable/DefaultTable";
import CollapseHeader from "./CollapsHeader/CollpasHeader";
import { ContentWrapper, TableContainer } from "./collaps-table-box.styles";
import useLocalStorage from "../../utils/hooks/useLocalStorage";
import { getCurrentUserId } from "../../utils/utils";

interface CollpasTableBoxProps {
  channelData?: Channel;
  index: number;
}

const CollapsTableBox: React.FC<CollpasTableBoxProps> = ({
  channelData,
  index,
}) => {
  const collapsStatus = useSelector(selectCollapsStatus);
  const productID = useSelector(selectProductID);

  const key = `${getCurrentUserId()}-${productID}-${
    channelData?.ChannelNumber
  }-hideEmptyLines`;
  const [hideEmptyLines, setHideEmptyLines] = useLocalStorage(key, true);

  const [originChannelData, setOriginChannelData] = useState(channelData);

  const handleHideEmpty = () => {
    setHideEmptyLines(!hideEmptyLines);
  };

  useEffect(() => {
    if (hideEmptyLines && channelData?.ChannelNumber != 0) {
      setOriginChannelData(removeEmptyLines(channelData));
    } else {
      setOriginChannelData(channelData);
    }
  }, [channelData, hideEmptyLines]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [scrollDir, setScrollDir] = useState<"UP" | "DOWN">("UP");

  useEffect(() => {
    const scroll = scrollRef.current;
    if (scroll) {
      const threshold = 25;
      let lastScrollY = scroll.scrollTop;
      let ticking = false;

      const updateScrollDir = () => {
        const scrollY = scroll.scrollTop;

        if (Math.abs(scrollY - lastScrollY) < threshold) {
          ticking = false;
          return;
        }
        setScrollDir(scrollY > lastScrollY ? "DOWN" : "UP");
        lastScrollY = scrollY > 0 ? scrollY : 0;
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollDir);
          ticking = true;
        }
      };

      scroll.addEventListener("scroll", onScroll);

      return () => scroll.removeEventListener("scroll", onScroll);
    }
  }, [scrollDir]);

  return (
    <ContentWrapper>
      <CollapseHeader
        channelData={channelData}
        expanded={collapsStatus[index]}
        index={index}
        onHideEmpty={handleHideEmpty}
        hideEmptyLines={hideEmptyLines}
      />
      <Collapse in={collapsStatus[index]}>
        <TableContainer ref={scrollRef}>
          <DefaultTable
            originalChannelData={channelData}
            channelData={originChannelData}
            showBarOnScroll={scrollDir === "UP" ? true : false}
          />
        </TableContainer>
      </Collapse>
    </ContentWrapper>
  );
};

export default CollapsTableBox;
