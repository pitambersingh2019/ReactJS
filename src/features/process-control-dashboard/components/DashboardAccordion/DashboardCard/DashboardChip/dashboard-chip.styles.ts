import styled from "styled-components";

export const ChipContainer = styled.div`
  width: fit-content;
  border-radius: 16px;
  background-color: #36129a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 7px;
  position: absolute;
  ${(props) => (props.theme.dir === "rtl" ? "left: 8px;" : "right: 8px;")}
  bottom: 9px;
`;

export const Text = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.white};
  text-transform: uppercase;
`;
