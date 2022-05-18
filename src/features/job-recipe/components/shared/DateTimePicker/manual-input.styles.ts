import NumberFormat from "react-number-format";
import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 12px 16px;
  border-radius: 4px;
  border: solid 1px #6c7481;
  background-color: ${(props) => props.theme.colors.white};

  &:hover,
  &:focus-within {
    border-color: ${(props) => props.theme.colors.purple};
  }
`;

export const InputField = styled(NumberFormat)`
  outline: none;
  border: none;
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset;
  }
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #6c7481;
  }
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ClearIcon = styled.img`
  height: 16px;
  cursor: pointer;
  margin-inline-end: 12px;
`;

export const CalendarIcon = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
  margin-bottom: 4px;
`;
