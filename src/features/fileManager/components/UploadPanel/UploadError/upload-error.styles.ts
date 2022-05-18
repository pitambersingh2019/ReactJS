import styled from "styled-components";

export const UploadErrorContainer = styled.div`
  display: flex;
  height: 120px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: ${(props) => `dashed 1px ${props.theme.colors.red}`};
  border-radius: 4px;
`;

export const ErrorIcon = styled.img`
  height: 24px;
  margin-bottom: 8px;
`;

export const FileName = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.red};
  width: 250px;
  word-wrap: break-word;
`;

export const ErrorInfo = styled.div`
  margin-top: 16px;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.gray2};
`;
