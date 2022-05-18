import styled from "styled-components";

export const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 38px;
  right: ${({ theme: { dir } }) => (dir === "rtl" ? "unset" : "28px")};
  left: ${({ theme: { dir } }) => (dir === "rtl" ? "28px" : "unset")};
  z-index: 100;
  width: 230px;
  padding: 16px 27px 15px 16px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #efefef;
  background-color: #fff;
`;

export const ModalHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: ${({ theme: { dir } }) => (dir === "rtl" ? "right" : "left")};
  color: #000;
`;

export const ModalSubtitle = styled.div`
  margin: 6px 0 14px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: ${({ theme: { dir } }) => (dir === "rtl" ? "right" : "left")};
  color: #707070;
`;
