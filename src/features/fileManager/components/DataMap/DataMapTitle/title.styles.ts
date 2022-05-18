import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const TitleText = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-end: 20px;
`;

export const InfoIcon = styled.img`
  height: 16px;
`;

export const InfoModal = styled.div`
  position: absolute;
  left: 70px;
  bottom: 20px;
  border-radius: 2px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border: ${(props) => `1px solid ${props.theme.colors.lightGray4}`};
  background-color: ${(props) => props.theme.colors.white};
  min-height: 72px;
  width: 217px;
  padding: 12px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;
