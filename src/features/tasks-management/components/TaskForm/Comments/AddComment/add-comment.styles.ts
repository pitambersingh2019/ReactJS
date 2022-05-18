import styled from "styled-components";

export const AddCommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

export const PlusIcon = styled.img`
  height: 20px;
`;

export const Text = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.purple};
  margin-inline-start: 8px;
`;
