import styled from "styled-components";

export const CopyFromReferenceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-inline-start: 30px;
  cursor: pointer;
`;

export const CopyIcon = styled.img`
  height: 28px;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;
