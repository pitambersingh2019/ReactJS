// import { useEffect, useState } from "react";
import styled from "styled-components";
const LinkItemContainer = styled.a`
  &:link,
  &:visited {
    color: blue;
  }
  &:hover {
    color: red;
  }
`;

const LinkItem = ({ cell }) => {
  const handleClickItem = () => {
    let linkitem = cell.column.linkitem;
    if (linkitem == "SystemReport") {
      window.open(
        `/leaderWeb/#/report/${cell.value}/false`,
        "LEADERMES_" + linkitem,
        "",
        true
      );
    } else {
      if (cell.column.CustomLinkItem) {
        linkitem += cell.value;
      }
      window.open(
        `/leaderWeb/#/appObjectFullView/${linkitem}/${cell.value}/?firstTime=true`,
        "LEADERMES_" + linkitem,
        "",
        true
      );
    }
  };
  return (
    <>
      {cell.value ? (
        <LinkItemContainer onClick={handleClickItem}>
          {String(cell.value)}
        </LinkItemContainer>
      ) : null}
    </>
  );
};
export default LinkItem;
