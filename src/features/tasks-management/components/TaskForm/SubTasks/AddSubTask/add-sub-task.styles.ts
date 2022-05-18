import styled from "styled-components";

export const StyledAddSubtask = styled.div<{
  hidden: boolean;
  isDisabled: boolean;
}>`
  .add-subtask-button {
    display: flex;
    align-items: center;
    background-color: #fbfbfb;
    visibility: ${(props) => (props.hidden ? "hidden" : "visible")};

    &:hover {
      cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
    }

    img {
      height: 20px;
    }

    span {
      font-size: 16px;
      font-weight: 600;
      color: ${(props) => props.theme.colors.purple};
      margin-inline-start: 8px;
    }
  }
`;
