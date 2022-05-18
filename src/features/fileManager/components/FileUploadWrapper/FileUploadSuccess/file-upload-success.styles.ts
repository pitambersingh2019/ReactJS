import styled from "styled-components";

export const FileUploadSuccessContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SuccessIcon = styled.img`
  height: 48px;
`;

export const SuccessInfo = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
  margin-top: 16px;
`;

export const FileName = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-top: 16px;
`;

export const RemoveContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  cursor: pointer;
`;

export const DeleteIcon = styled.img`
  height: 24px;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.purple};
`;
