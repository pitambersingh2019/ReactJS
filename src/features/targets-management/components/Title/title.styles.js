import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  margin-right: ${(props) => (props.theme.dir === "rtl" ? 0 : "16px")};
  margin-left: ${(props) => (props.theme.dir === "rtl" ? "16px" : 0)};
`;

export const StyledSubtitle = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #707070;
`;
