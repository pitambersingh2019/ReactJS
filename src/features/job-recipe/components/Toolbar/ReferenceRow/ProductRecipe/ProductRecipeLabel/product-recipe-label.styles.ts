import styled from "styled-components";

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #000;
  margin-inline-end: 4px;
  cursor: pointer;
  max-width: 300px;
  white-space: nowrap;
`;

export const Label = styled.div<{ isAlternative: boolean }>`
  padding-inline-start: ${(props) => (props.isAlternative ? "4px" : "0px")};
  font-weight: ${(props) => (props.isAlternative ? "normal" : "600")};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const AlternativeRecipe = styled.div`
  font-weight: 600;
`;
