// import { useEffect, useState } from "react";
import styled from "styled-components";
const LinkItemContainer = styled.a`
  cursor: pointer;
  &:link,
  &:visited {
    color: blue;
  }
  &:hover {
    color: red;
  }
`;

const LinkItem = ({ cell }) => {
  const record = cell.value;
  const handleClickItem = () => {
    window.open(
      `/leaderWeb/#/appObjectFullView/${record.LinkTarget}/${record.value}/?firstTime=true`,
      "LEADERMES_" + record.LinkTarget,
      "",
      true
    );
  };
  return (
    <LinkItemContainer onClick={handleClickItem}>
      {String(record.value)}
    </LinkItemContainer>
  );
};
export default LinkItem;
