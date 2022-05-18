import styled from "styled-components";

export const UploadPanelContainer = styled.div`
  width: 296px;
  height: 348px;
  padding: 33px 16px 16px 16px;
  box-shadow: -3px 0 10px 0 rgba(0, 0, 0, 0.08);
  border: ${(props) => `solid 1px ${props.theme.colors.lightGray2}`};
  background-color: ${(props) => props.theme.colors.white};
  position: absolute;
  top: 52px;
  ${(props) => (props.theme.dir === "rtl" ? `left: 0px;` : `right: 0px;`)}
  z-index: 20;
`;

export const Arrow = styled.div`
  position: absolute;
  top: -5px;
  ${(props) => (props.theme.dir === "rtl" ? `left: 25px;` : `right: 25px;`)}
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid white;
`;
