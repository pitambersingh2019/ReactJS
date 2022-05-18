import styled from "styled-components";

export const CommentContainer = styled.div`
  height: 84px;
  padding: 12px 18px 6px 16px;
  border-radius: 4px;
  border: solid 1px ${(props) => props.theme.colors.gray2};
  background-color: ${(props) => props.theme.colors.white};
  overflow-y: auto;
`;

export const AuthorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const PersonIcon = styled.img`
  height: 18px;
  align-self: center;
`;

export const Author = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-start: 8px;
`;

export const Text = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.black};
  padding-top: 6px;
`;
