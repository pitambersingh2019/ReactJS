import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: relative;
  padding: 16px 24px 0px;
`;

export const HeaderTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const HeaderSubtitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray2};
  margin-top: 6px;
`;

export const CloseIcon = styled.img`
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  ${(props) => (props.theme.dir === "rtl" ? "left: 16px;" : "right: 16px;")}
`;
