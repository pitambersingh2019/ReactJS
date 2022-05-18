import styled from "styled-components";

export const ProductRecipeModalContainer = styled.div`
  position: absolute;
  top: 25px;
  ${(props) => (props.theme.dir === "rtl" ? "left: 0px;" : "right: 0px;")};
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f6f6f6;
  background-color: ${(props) => props.theme.colors.white};
  padding: 12px 16px;
  min-width: 274px;
  max-width: 350px;
  z-index: 100;

  & > * {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export const ModalItemContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  font-weight: ${(props) => (props.isSelected ? "600" : "normal")};
  color: ${(props) =>
    props.isSelected ? props.theme.colors.purple : props.theme.colors.black};
  white-space: nowrap;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  cursor: pointer;
`;

export const ModalItem = styled.div<{ isAlternativeRecipe: boolean }>`
  padding-inline-start: ${(props) =>
    props.isAlternativeRecipe ? "4px" : "0px"};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const AlternativeRecipe = styled.div`
  font-weight: 600;
`;
