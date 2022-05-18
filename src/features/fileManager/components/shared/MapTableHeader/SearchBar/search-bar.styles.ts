import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px #d1d1d1;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0px 0px 4px 12px;

  &:hover,
  &:focus-within {
    border-bottom: solid 1px #1268fb;
  }
`;

export const InputFieldContainer = styled.div`
  display: inline-block;
`;

export const HiddenPlaceholder = styled.div`
  height: 0;
  visibility: hidden;
  font-size: 16px;
  padding-inline-end: 16px;
`;

export const SearchIcon = styled.img`
  height: 16px;
  margin-inline-end: 12px;
`;

export const InputField = styled.input`
  outline: none;
  border: none;
  display: inline;
  width: 100%;
  min-width: 224px;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  background-color: #ffffff;
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

export const CloseIcon = styled.img`
  height: 28px;
  cursor: pointer;
`;

export const CancelButton = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-start: 25px;
  cursor: pointer;
`;
