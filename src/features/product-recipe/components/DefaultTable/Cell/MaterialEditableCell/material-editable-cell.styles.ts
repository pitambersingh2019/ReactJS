import styled from "styled-components";

export const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 12px 8px;
  color: #101010;
  font-size: 14px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #6c7481;
  &:focus {
    border: 1px solid #1d6df7;
  }
  &:disabled {
    border: 1px solid #ffffff;
  }
`;
