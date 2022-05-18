import styled from "styled-components";

export const FormContentContainer = styled.div`
  padding: 18px 12px 0 24px;
  height: 345px;
  max-height: 520px;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
`;

export const ButtonsContainer = styled.div`
  padding: 0 24px 18px;
  display: flex;
  margin-top: 30px;
  justify-content: end;
`;
