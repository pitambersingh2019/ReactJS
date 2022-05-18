import styled from "styled-components";

export const BottomPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;

  & > {
    &:not(:last-child) {
      margin-inline-end: 16px;
    }
  }
`;

export const BottomPreviewItem = styled.img<{ isActive: boolean }>`
  height: 63px;
  width: 112px;
  filter: ${(props) => (props.isActive ? "opacity(0.9)" : "opacity(0.3)")};
`;
