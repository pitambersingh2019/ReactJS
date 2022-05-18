import React from "react";
import {
  FooterStyled,
  CancelButton,
  ApplyButton,
  LimitText,
  FooterWrapper,
} from "./styles";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Footer = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addButtondisabled,
  handleApplyFilters,
  cancelHandler,
  firstTimeFilterApply,
}) => {
  return (
    <FooterWrapper>
      <LimitText>The table is limited to 10,000 items</LimitText>
      <FooterStyled>
        <CancelButton
          onClick={() => !firstTimeFilterApply && cancelHandler()}
          disabled={firstTimeFilterApply}
        >
          Cancel
        </CancelButton>
        <ApplyButton disabled={false} onClick={() => handleApplyFilters()}>
          Apply
        </ApplyButton>
      </FooterStyled>
    </FooterWrapper>
  );
};

export default Footer;
