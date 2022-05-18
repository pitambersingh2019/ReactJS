import styled from "styled-components";

export const DuplicateContainer = styled.div`
  position: relative;
`;

export const DuplicateIcon = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const Tooltip = styled.div`
  position: absolute;
  right: 0px;
  top: 20px;
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
