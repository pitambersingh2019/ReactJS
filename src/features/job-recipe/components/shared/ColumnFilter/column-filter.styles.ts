import styled from "styled-components";

export const ColumnFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  padding: 6px 8px;
  border-radius: 4px;
  border: solid 1px #d1d1d1;
  background-color: ${(props) => props.theme.colors.lightGray3};
  margin-top: 10px;

  &:hover,
  &:focus-within {
    border: solid 1px #1268fb;
  }
`;

export const SearchIcon = styled.img`
  height: 18px;
`;

export const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;

  background-color: ${(props) => props.theme.colors.lightGray3};
  color: #050709;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset; /* Change the color to your own background color */
  }
  &:focus {
    outline: none;
  }
`;
