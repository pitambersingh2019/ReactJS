import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const ContainerInput = styled.div<{ size?: "lg" | "sm" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 360px; */
  height: ${(props) => (props.size === "lg" ? "40px" : "32px")};
  padding: ${(props) => (props.size === "lg" ? "12px 16px" : "2px 4px")};
  border-radius: 4px;

  border: solid 1px #d1d1d1;

  &:hover,
  &:focus-within {
    border: solid 1px #1268fb;
  }
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
   text-align: left;
   `}

  color: #404d61;
`;

export const IconStyled = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const InputFieldStyled = styled.input`
  outline: none;
  border: none;
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
   text-align: left;
   `}

  color: #050709;
  background-color: transparent;

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
  margin: 4px 0 0 16px;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  ${rtl`
   text-align: left;
   `}

  color: #6c7481;
`;
