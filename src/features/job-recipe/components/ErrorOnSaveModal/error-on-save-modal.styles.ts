import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  align-items: end;

  span {
    font-size: 18px;
    font-weight: 600;
    color: #101010;
    margin-inline-start: 8px;
  }
`;

export const WarningIcon = styled.img`
  height: 30px;
`;

export const Content = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.43;
  color: #101010;
  margin-top: 16px;
  margin-bottom: 41px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 16px;
  ${(props) => (props.theme.dir === "rtl" ? `left: 12px;` : `right: 12px;`)};
`;
