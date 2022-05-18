/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  ItemsContainer,
  ItemWrapper,
  ItemContent,
  CloseIconStyled,
  RightSideWrapper,
  EditIconStyledHeader,
} from "./styles";

function FilterHeader({
  width,
  FilterItems,
  handleRemoveFilterFromItems,
  handleClearFilterItems,
  handleEditFilterItem,
}) {
  const [limit, setlimit] = useState(0);
  useEffect(() => {
    const maxWidth = 2 * width - 100;
    let stoppingIndex = 0;
    let stoppingIndexFlag = 1;
    let sum = 0;
    FilterItems.forEach((elem, index) => {
      if (stoppingIndexFlag) {
        const item = document.createElement("div");
        item.style.cssText = `  display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        text-align: left;
        color: #101010;
        overflow-wrap: break-word;
        width: max-content;
        user-select: none;`;
        item.innerText = elem.text;
        document.body.appendChild(item);
        const itemWidth = item.getBoundingClientRect().width + 36;
        console.log("itemWidth", itemWidth);
        document.body.removeChild(item);
        if (itemWidth + sum <= width) sum = sum + itemWidth;
        else if (itemWidth + sum >= width && sum <= width)
          sum = sum + itemWidth + (width - sum);
        else if (itemWidth + sum >= width && itemWidth + sum <= maxWidth)
          sum = sum + itemWidth;
        else {
          stoppingIndex = index - 1;
          stoppingIndexFlag = 0;
        }
      }
    });
    setlimit(stoppingIndex > 0 ? stoppingIndex : FilterItems.length);
    console.log("INDEX", stoppingIndex);
  }, [FilterItems]);

  return (
    <Container width={width}>
      <ItemsContainer>
        {FilterItems.slice(0, limit).map((elem) => (
          <ItemWrapper key={elem.id} className={"FilterItemTable"}>
            <ItemContent>{elem.text}</ItemContent>
            <CloseIconStyled
              onClick={() => handleRemoveFilterFromItems(elem.id)}
            />
            <EditIconStyledHeader
              onClick={() => handleEditFilterItem(elem.id)}
            />
          </ItemWrapper>
        ))}
      </ItemsContainer>
      <RightSideWrapper onClick={handleClearFilterItems}>
        Clear All
      </RightSideWrapper>
    </Container>
  );
}

export default FilterHeader;
