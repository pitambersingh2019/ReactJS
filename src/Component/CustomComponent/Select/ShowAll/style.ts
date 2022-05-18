import styled from "styled-components";

interface IShowAllText {
  color: string;
  cursor: boolean;
}

export const ShowAllText = styled.div<IShowAllText>`
  position: relative;
  z-index: 99;
  display: flex;
  justify-content: end;
  font-family: ProximaNova;
  padding: 7.5px 16px;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  cursor: ${({ cursor }) => (cursor ? "pointer" : "initial")};
  color: ${({ color }) => color};
`;
