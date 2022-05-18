import styled from "styled-components";

export const StyledSearchBar = styled.div`
  display: flex;
  padding: 10px 0 9px 16px;
  width: 40vw;
  max-width: 40vw;
  border-radius: 4px;
  border: solid 1px #d1d1d1;
  margin-inline-start: 28px;

  input {
    font-size: 16px;
    line-height: 1.19;
    color: #757575;
    border: none;
    margin-inline-start: 12px;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  img {
    height: 20px;
  }
`;
