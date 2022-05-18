import styled from "styled-components";

export const Wrapper = styled.div``;

interface IInput {
  backgroundColor: string;
  borderColor: string;
  colorText: string;
  isAble: boolean;
}

export const Input = styled.input<IInput>`
  width: 100%;
  min-width: 50px;
  height: 40px;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ color }) => color};
  padding: 12px 16px;
  border-radius: 4px;
  outline: unset;
  border: 1px solid;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-color: ${({ borderColor }) => borderColor};
  &:hover {
    border-color: ${({ isAble, borderColor }) =>
      isAble ? "#5900d3" : borderColor};
  }
  &:focus {
    border-color: ${({ isAble, borderColor }) =>
      isAble ? "#5900d3" : borderColor};
  }
`;
