import styled from "styled-components";

export const FieldDescriptionContainer = styled.div`
  position: relative;
  margin-inline-start: 8px;
`;

export const InfoIcon = styled.img`
  height: 16px;
`;

export const InfoTooltip = styled.div`
  z-index: 10;
  position: absolute;
  top: 0px;
  left: 20px;
  background-color: ${(props) => props.theme.colors.white};
  padding: 12px;
  border-radius: 2px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border: ${(props) => `solid 1px ${props.theme.colors.lightGray4}`};
  /* max-width: 248px; */
  /* min-width: 120px; */
  /* overflow-wrap: break-word; */
  width: 248px;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;
