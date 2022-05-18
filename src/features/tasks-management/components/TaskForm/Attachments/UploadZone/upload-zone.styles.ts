import styled from "styled-components";

export const UploadZoneContainer = styled.div<{ isDragAccept: boolean }>`
  height: 72px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${(props) =>
    props.isDragAccept
      ? props.theme.colors.primaryBlue
      : props.theme.colors.gray2};
  border-style: dashed;
  background-color: ${(props) => props.theme.colors.white};
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const UploadZoneTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
`;

export const InfoText = styled.div`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.gray3};

  & .browse {
    color: ${(props) => props.theme.colors.purple};
    cursor: pointer;
  }
`;

export const FileSize = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.gray3};
  margin-top: 8px;
`;

export const UploadingContainer = styled.div`
  width: 250px;
  align-self: flex-start;
`;

export const Error = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.red};
`;
