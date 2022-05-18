import styled from "styled-components";

export const DashboardCardContainer = styled.div`
  width: 160px;
  height: 200px;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
  background-color: #fff;
  margin-top: 24px;
  padding: 8px 4px 8px 12px;
  cursor: pointer;
  position: relative;
`;

export const ChipsRow = styled.div`
  display: flex;
  justify-content: space-between;

  > * {
    &:first-child {
      margin-inline-end: 8px;
    }
  }
`;

export const ContentContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 125px;
`;

export const Creator = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #707071;
  overflow-wrap: break-word;
`;
