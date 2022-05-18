import styled from "styled-components";

interface IStatusWrapper {
  color: string;
}

export const StatusWrapper = styled.div<IStatusWrapper>`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${({ color }) => color};
`;
