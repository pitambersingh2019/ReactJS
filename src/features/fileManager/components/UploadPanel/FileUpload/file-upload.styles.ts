import styled from "styled-components";

export const UploadZoneContainer = styled.div<{ isDragAccept: boolean }>`
  height: 120px;
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
  background-color: ${(props) =>
    props.isDragAccept ? props.theme.colors.lightBlue1 : "unset"};
  outline: none;
  transition: border 0.24s ease-in-out;
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
