import styled from "styled-components";

export const UploadErrorContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ErrorIcon = styled.img`
  height: 48px;
  margin-bottom: 16px;
`;

export const FileName = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.red};
`;

export const ErrorInfo = styled.div`
  margin-top: 16px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
`;
