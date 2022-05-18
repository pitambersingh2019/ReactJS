import styled from "styled-components";

export const ContainerInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  border-radius: 4px;
  gap: 12px;
  border: solid 1px #d1d1d1;
  background-color: #ecf1f7;

  &:hover,
  &:focus-within {
    border: solid 1px #1d6df7;
  }
`;

export const IconStyled = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const InputFieldStyled = styled.input`
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;

  background-color: #ecf1f7;
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

  &::placeholder {
    color: #6c7481;
  }
`;
