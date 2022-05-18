import styled from "styled-components";
import { EditableInputProps } from ".";

export const EditableInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InputContainer = styled.div<{
  variant: EditableInputProps["variant"];
  disabledInput: boolean;
}>`
  align-items: center;
  height: ${(props) => (props.variant === "sm" ? "30px" : "38px")};
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;

  &:hover {
    border: ${(props) => !props.disabledInput && `solid 1px #6c7481`};
  }

  &:focus-within {
    border: solid 1px #1268fb;
  }
`;

export const HiddenSpan = styled.span<{
  variant: EditableInputProps["variant"];
}>`
  position: absolute;
  opacity: 0;
  z-index: -100;
  white-space: pre;
  font-size: ${(props) => (props.variant === "sm" ? "16px" : "24px")};
`;

export const InputField = styled.input<{
  width: number;
  variant: EditableInputProps["variant"];
  disabledInput: boolean;
}>`
  width: ${(props) => `${props.width}px`};
  outline: none;
  border: none;
  background: inherit;
  padding: ${(props) =>
    props.variant === "lg" ? "2px 8px 2px 0px" : "0px 8px"};
  font-size: ${(props) => (props.variant === "sm" ? "16px" : "24px")};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  text-overflow: ellipsis;
  overflow: hidden;

  &::placeholder {
    color: #6c7481;
  }

  //hide placeholder on focus
  &:focus::placeholder {
    color: transparent;
  }

  &:hover {
    cursor: ${(props) => props.disabledInput && `pointer`};
  }
`;

export const PencilIcon = styled.img`
  height: 16px;
  cursor: pointer;
  margin-inline-start: 8px;
`;
