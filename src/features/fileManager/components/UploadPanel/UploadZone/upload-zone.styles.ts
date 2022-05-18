import styled from "styled-components";

export const UploadZoneWrapper = styled.div`
  margin-top: 32px;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
`;

export const BorderWrapper = styled.div`
  height: 120px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${(props) => props.theme.colors.gray2};
  border-style: dashed;
`;
