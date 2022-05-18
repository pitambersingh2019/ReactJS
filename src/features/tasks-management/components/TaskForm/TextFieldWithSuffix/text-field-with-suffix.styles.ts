import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #404d61;
  margin-bottom: 0;
`;

export const ContainerInput = styled.div<{
  disabled?: boolean;
  error?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 12px 16px;
  border-radius: 4px;
  border: ${(props) =>
    `solid 1px ${props.error ? props.theme.colors.red : "#6c7481"}`};
  background-color: #ffffff;

  &:hover,
  &:focus-within {
    border: ${(props) =>
      `solid 1px ${
        props.error
          ? props.theme.colors.red
          : props.disabled
          ? props.theme.colors.gray2
          : props.theme.colors.purple
      }`};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "inherit")};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Suffix = styled.span`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #050709;
  margin-inline-start: 8px;
`;

export const InputFieldStyled = styled.input`
  outline: none;
  border: none;
  width: 100%;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  background-color: #ffffff;
  color: #050709;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset;
  }

  &::placeholder {
    color: #6c7481;
  }
`;
