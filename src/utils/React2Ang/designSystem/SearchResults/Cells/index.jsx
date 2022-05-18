import React from "react";
import Default from "./Default";
import LinkItemCell from "./LinkItem";
import { getService } from "../../../react-to-angular";
import SearchIcon from "../../../../../assets/icons/modalpopup.svg";
import styled from "styled-components";
export const IconStyled = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  //cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

const Cell = ({ cell }) => {
  const COGNOS = getService("COGNOS");
  if (cell.column.ExternalLink) {
    return (
      <span>
        <a href={COGNOS.url + cell.value} target="_blank" rel="noreferrer">
          <IconStyled src={SearchIcon} />
        </a>
      </span>
    );
  }

  const LinkItemValidate = cell.column.linkitem ?? false;
  if (LinkItemValidate) {
    return <LinkItemCell cell={cell} />;
  } else {
    return <Default cell={cell} />;
  }
};

export default Cell;
