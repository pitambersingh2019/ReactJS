import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const HandleBorderColor = (disabled: boolean) => {
  if (disabled) {
    return `solid 1px #e4e7eb`;
  } else {
    return "solid 1px #6c7481";
  }
};

const handleBorderColor_Hover = (disabled: boolean) => {
  if (disabled) {
    return `solid 1px #e4e7eb`;
  } else {
    return "solid 1px #1268fb";
  }
};

export const ContainerInput = styled.div<{ disabledStyle: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 360px; */
  height: 40px;
  padding: 12px 16px;
  border-radius: 4px;

  border: solid 1px #6c7481;
  background-color: ${(p) => (p.disabledStyle ? `#fafafa` : "#ffffff")};

  border: ${(props) => HandleBorderColor(props.disabledStyle)};

  &:hover,
  &:focus-within {
    border: ${(props) => handleBorderColor_Hover(props.disabledStyle)};
  }
`;

export const Title = styled.div<{ disabled: boolean }>`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `}

  color: ${(p) => (p.disabled ? "#6c7481" : "#404d61")};
`;

export const IconStyled = styled.img<{ disabled: boolean }>`
  width: 20px;
  height: 20px;
  cursor: pointer;
  //cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

export const InputFieldStyled = styled.input<{ disabledStyle: boolean }>`
  outline: none;
  border: none;
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `}
  background-color: ${(p) => (p.disabledStyle ? `#fafafa` : "#ffffff")};
  color: ${(p) => (p.disabledStyle ? `#6c7481` : "#050709")};

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

export const TitleReq = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
    margin: 0 0 0 16px;
  `}
  color: #6c7481;
`;
