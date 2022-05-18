import styled from "styled-components";

export const SectionCardContainer = styled.div<{ isOverdue: boolean }>`
  width: 224px;
  height: 200px;
  background-color: ${(props) => props.theme.colors.white};
  position: relative;
  margin: 0 auto 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  border: ${(props) =>
    `1px solid ${props.isOverdue ? props.theme.colors.red : "#dfe1eb"}`};

  &:first-child {
    margin-top: 16px;
  }
`;
