import styled from "styled-components";

export const FileUploadContainer = styled.div<{ isDragAccept: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  background-color: ${(props) =>
    props.isDragAccept ? props.theme.colors.lightBlue1 : "unset"};
  border: ${(props) =>
    props.isDragAccept && `1px dashed ${props.theme.colors.primaryBlue}`};
`;

export const Wrapper = styled.div`
  height: 60%;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const IconWrapper = styled.div`
  margin: 0 auto;
  width: 40px;
`;

export const UploadIcon = styled.img`
  height: 40px;
`;

export const DragDropInfo = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.gray3};
  & > span {
    font-weight: 600;
    color: ${(props) => props.theme.colors.purple};
    cursor: pointer;
  }
  margin-bottom: 4px;
`;

export const FileSizeInfo = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.gray2};
`;

export const Info = styled.div`
  border-top: solid 1px #404d60;
  padding-top: 20px;
  padding-bottom: 32px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.gray2};
`;
