import styled from "styled-components";

export const DoneInDaysContainer = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  flex-wrap: wrap;
  padding: 16px 3.5px 12px;
  align-items: flex-end;
`;

export const DaysInput = styled.input<{ isValid: boolean }>`
  width: 40px;
  height: 20px;
  margin: 0 5px;
  outline: none;
  border-color: ${(props) => !props.isValid && "red"};

  /* removes arrows to change number */
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
