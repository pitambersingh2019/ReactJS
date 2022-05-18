import styled, { DefaultTheme } from "styled-components";
import { InputMode } from "./types";
// @ts-ignore
import rtl from "styled-components-rtl";

const handleBorderColor_Hover = (
  mode: InputMode,
  error: boolean,
  colors: DefaultTheme["colors"]
) => {
  switch (mode) {
    case InputMode.disabled:
      return `solid 1px #e4e7eb`;
    case InputMode.readonly:
      return `solid 1px #e4e7eb`;
    case InputMode.editable:
      if (error) return "solid 1px #c73431";
      return `solid 1px ${colors.purple}`;
  }
};

const HandleBorderColor = (mode: InputMode, error: boolean) => {
  switch (mode) {
    case InputMode.disabled:
      return `solid 1px #e4e7eb`;
    case InputMode.readonly:
      return `solid 1px #e4e7eb`;
    case InputMode.editable:
      if (error) return "solid 1px #c73431";
      return "solid 1px #6c7481";
  }
};

const handleBackground = (mode: InputMode) => {
  switch (mode) {
    case InputMode.disabled:
      return `#ffffff`;
    case InputMode.readonly:
      return `#fafafa`;
    case InputMode.editable:
      return "#ffffff";
  }
};

const HandleTitleColor = (mode: InputMode, error: boolean) => {
  switch (mode) {
    case InputMode.disabled:
      return `#b9bec6`;
    case InputMode.readonly:
      return `#6c7481`;
    case InputMode.editable:
      if (error) return "#c73431";
      return "#404d61";
  }
};

const HandleInputColor = (mode: InputMode) => {
  switch (mode) {
    case InputMode.disabled:
      return `#b9bec6;`;
    case InputMode.readonly:
      return `#6c7481;`;
    case InputMode.editable:
      return "#050709;";
  }
};

const HandlePlaceholderColor = (mode: InputMode) => {
  switch (mode) {
    case InputMode.disabled:
      return `#b9bec6; `;
    case InputMode.readonly:
      return `#6c7481;`;
    case InputMode.editable:
      return "#6c7481;";
  }
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const ContainerInput = styled.div<{ mode: InputMode; error: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 360px; */
  height: 40px;
  padding: 12px 16px;
  border-radius: 4px;

  border: ${(props) => HandleBorderColor(props.mode, props.error)};
  background-color: ${(props) => handleBackground(props.mode)};

  &:hover,
  &:focus-within {
    border: ${(props) =>
      handleBorderColor_Hover(props.mode, props.error, props.theme.colors)};
  }
`;

export const Title = styled.div<{ mode: InputMode; error: boolean }>`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  ${rtl`
         text-align: left; 
  `}

  -webkit-line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;

  -webkit-box-orient: vertical;
  color: ${(props) => HandleTitleColor(props.mode, props.error)};
`;
export const InputFieldStyled = styled.input<{ mode: InputMode }>`
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
  background-color: ${(props) => handleBackground(props.mode)};
  color: ${(props) => HandleInputColor(props.mode)};

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset; /* Change the color to your own background color */
  }

  &::placeholder {
    color: ${(props) => HandlePlaceholderColor(props.mode)};
  }
`;

export const TitleReq = styled.div<{ error: boolean }>`
  ${rtl`
       margin: 0 0 0 16px;
       text-align: left;
  `}

  font-family: ProximaNova;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  color: ${(props) => (props.error ? "#c73431" : "#6c7481")};
`;
