import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FileName = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #050709;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
`;

export const AbortIcon = styled.img`
  height: 12px;
  margin-inline-start: 16px;
  cursor: pointer;
`;

export const Progress = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.gray4};
`;
