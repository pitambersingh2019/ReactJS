import styled, { DefaultTheme } from "styled-components";

export const EditableCellContainer = styled.div<{ isGreyBg: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.isGreyBg ? props.theme.colors.lightGray1 : props.theme.colors.white};
`;

const getBorder = ({
  isEditing,
  isFocused,
  colors,
}: {
  isEditing: boolean;
  isFocused: boolean;
  colors: DefaultTheme["colors"];
}) => {
  if (isFocused) {
    return `solid 1px #1d6df7`;
  }
  if (isEditing) {
    return `solid 1px ${colors.gray2}`;
  }
  return "none";
};

export const Value = styled.input<{
  isEditing: boolean;
  isFocused: boolean;
  isGreyBg: boolean;
}>`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  direction: ltr;
  text-align: ${(props) => (props.theme.dir === "ltr" ? "left" : "right")};
  color: ${(props) => props.theme.colors.black};
  height: 40px;
  display: flex;
  align-items: center;
  padding-inline-start: 9px;
  background-color: ${(props) =>
    props.isGreyBg ? props.theme.colors.lightGray1 : props.theme.colors.white};
  border-radius: 4px;
  border: ${(props) =>
    getBorder({
      isEditing: props.isEditing,
      isFocused: props.isFocused,
      colors: props.theme.colors,
    })};
  margin: 2px 0;

  &:focus {
    outline: none;
  }
`;

export const ReferenceValue = styled.div`
  background-color: ${(props) => props.theme.colors.lightGray4};
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
  height: 32px;
  display: flex;
  align-items: center;
  padding-inline-start: 9px;
`;
