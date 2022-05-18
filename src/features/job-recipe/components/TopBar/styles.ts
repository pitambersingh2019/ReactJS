import styled from "styled-components";

export const TopBarTitleContainer = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.lightGray1};
  padding-inline-start: 24px;
`;

export const TopBarContainer = styled.div<{ isHidden: boolean }>`
  visibility: ${(props) => (props.isHidden ? "hidden" : "visible")};
  background-color: ${(props) => props.theme.colors.lightGray1};
  position: absolute;
  top: -50px;
  ${(props) =>
    props.theme.dir === "rtl" ? "right: -200px;" : "left: -200px;"};
  width: 100vw;
  display: flex;
  margin-top: -10px;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 10px;
`;

export const UpdatedContainer = styled.div`
  display: flex;
  align-items: center;
  margin-inline-end: 16px;
`;

export const UpdatedIcon = styled.img`
  height: 14px;
`;

export const UpdatedInfo = styled.div`
  margin-inline-start: 8px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
`;
