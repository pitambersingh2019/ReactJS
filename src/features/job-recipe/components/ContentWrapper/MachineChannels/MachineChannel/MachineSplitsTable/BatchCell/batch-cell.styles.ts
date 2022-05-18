import styled, { DefaultTheme } from "styled-components";

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

export const BatchCellContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ValueContainer = styled.div<{
  isEditing: boolean;
  isFocused: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-radius: 4px;
  border: ${(props) =>
    getBorder({
      isEditing: props.isEditing,
      isFocused: props.isFocused,
      colors: props.theme.colors,
    })};
  margin: 2px 0;
`;

export const Value = styled.input<{
  isEmpty: boolean;
}>`
  height: 100%;
  width: 100%;
  padding-inline-start: 8px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) =>
    props.isEmpty ? props.theme.colors.gray1 : props.theme.colors.black};
  display: flex;
  align-items: center;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const RefValue = styled.div`
  height: 48px;
  background-color: ${(props) => props.theme.colors.lightGray4};
  padding-inline-start: 8px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
  display: flex;
  align-items: center;
`;

export const OpenIcon = styled.img`
  height: 24px;
  cursor: pointer;
`;
