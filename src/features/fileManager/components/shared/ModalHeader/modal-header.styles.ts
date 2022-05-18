import styled from "styled-components";

export const ModalHeaderContainer = styled.div`
  height: 56px;
  background: ${(props) => props.theme.colors.lightGray1};
  position: relative;
  display: flex;
  align-items: center;
  padding-inline-start: 24px;
`;

export const Icon = styled.img`
  height: 24px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.89;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-start: 8px;
`;

export const CloseIcon = styled.img`
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 12px;
  ${(props) => (props.theme.dir === "rtl" ? `left: 16px;` : `right: 16px;`)};
`;
