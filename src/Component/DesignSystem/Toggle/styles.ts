import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  ${(props) => (props.theme.dir === "rtl" ? `right: 0;` : `left: 0;`)}
  width: 32px;
  height: 16px;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.lightGray7};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin: 2px;
    background: #ffffff;
    transition: 0.2s;
  }
`;
export const CheckBox = styled.input<{ variant: "primary" | "purple" }>`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 32px;
  height: 16px;
  &:checked + ${CheckBoxLabel} {
    background: ${(props) =>
      props.variant === "purple"
        ? "#6d6dc5"
        : props.theme.colors.secondaryBlue};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin-inline-start: 18px;
      transition: 0.2s;
    }
  }
`;
