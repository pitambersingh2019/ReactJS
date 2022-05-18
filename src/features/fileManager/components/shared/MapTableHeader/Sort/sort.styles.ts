import styled from "styled-components";

export const SortContainer = styled.div`
  position: relative;
  margin-inline-end: 8px;
  display: flex;
  align-items: center;
`;

export const SortIcon = styled.img`
  height: 22px;
`;

export const SortModal = styled.div`
  position: absolute;
  top: 25px;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f6f6f6;
  background-color: ${(props) => props.theme.colors.white};
  min-width: 120px;
  z-index: 10;
  padding: 12px 16px;

  & > * {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export const SortModalItem = styled.div<{ isSelected: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => (props.isSelected ? "600" : "normal")};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) =>
    props.isSelected ? props.theme.colors.purple : props.theme.colors.black};

  &:hover {
    color: ${(props) => props.theme.colors.purple};
  }
`;
