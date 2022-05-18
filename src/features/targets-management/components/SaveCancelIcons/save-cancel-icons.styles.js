import styled from "styled-components";

export const StyledIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledActionIcon = styled.img`
  height: 24px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;
