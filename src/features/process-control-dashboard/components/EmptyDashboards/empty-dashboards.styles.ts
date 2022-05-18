import styled from "styled-components";

export const EmptyDashboardsContainer = styled.div`
  margin-top: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BoxesRow = styled.div`
  display: flex;

  & > {
    &:not(:last-child) {
      margin-inline-end: 16px;
    }
  }
`;

export const EmptyBox = styled.div`
  width: 178px;
  height: 168px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.lightGray2};
`;

export const EmptyIcon = styled.img`
  height: 37px;
  margin-bottom: 30px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 137px;
`;

export const Content = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.gray1};
`;
