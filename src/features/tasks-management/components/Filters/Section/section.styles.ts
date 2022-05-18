import styled from "styled-components";

export const ArrowDownIcon = styled.img`
  height: 16px;
  cursor: pointer;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.lightGray6}`};
`;

export const SectionNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 3.5px 12px;
`;
