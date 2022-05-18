import styled from "styled-components";

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 38px;
  margin-top: auto;
  ${(props) => (props.theme.dir === "rtl" ? "left: 0px;" : "right: 0px;")}

  & > * {
    &:first-child {
      margin-inline-end: 24px;
    }
  }
`;
