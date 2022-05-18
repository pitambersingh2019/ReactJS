import styled from "styled-components";

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const SectionHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ArrowIcon = styled.img<{ opened: boolean }>`
  height: 16px;
  margin-inline-end: 8px;
  transform: ${(props) => (props.opened ? `rotate(0deg)` : `rotate(-90deg)`)};
  transition: all 0.3s ease-out;
  cursor: pointer;
`;
