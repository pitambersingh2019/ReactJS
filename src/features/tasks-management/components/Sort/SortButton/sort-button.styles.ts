import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray4};
  margin-inline-start: 5px;
`;

export const StyledSortButton = styled.div`
  position: relative;

  &:hover {
    cursor: pointer;
  }

  .selected {
    font-size: 14px;
    font-weight: 600;
    color: #000;
    margin-inline-start: 4px;
  }
`;
