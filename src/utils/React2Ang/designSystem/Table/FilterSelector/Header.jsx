import React from "react";
import { HeaderStyled, Title, CloseIconStyled } from "./styles";
const Header = ({ onClickHandler, firstTimeFilterApply }) => {
  return (
    <HeaderStyled>
      <Title>Filters</Title>
      {!firstTimeFilterApply && <CloseIconStyled onClick={onClickHandler} />}
    </HeaderStyled>
  );
};

export default Header;
