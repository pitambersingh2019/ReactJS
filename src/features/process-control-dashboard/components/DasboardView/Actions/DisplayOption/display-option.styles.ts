import styled from "styled-components";

export const DisplayOptionContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Icon = styled.img`
  height: 22px;
  cursor: pointer;
`;

export const Label = styled.div`
  margin-inline-start: 8px;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.black};
  cursor: default;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: 25px;
  left: -50%;
  min-width: 200px;
  border-radius: 2px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #e4e7eb;
  background-color: ${(props) => props.theme.colors.white};
  padding: 12px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  z-index: 100;
`;
