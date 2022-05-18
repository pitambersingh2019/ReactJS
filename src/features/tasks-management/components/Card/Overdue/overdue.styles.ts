import styled from "styled-components";

export const StyledOverdue = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black};
  display: flex;
  align-items: center;
  position: absolute;
  left: 8px;
  bottom: 10px;

  img {
    height: 18px;
  }
`;
