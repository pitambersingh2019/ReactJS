import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-inline-start: 24px;
`;

export const GroupByLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray4};
  margin-inline-start: 8px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StackByIcon = styled.img`
  height: 22px;
`;

export const StackByContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-inline-start: 4px;
`;

export const ModalContainer = styled.div`
  position: absolute;
  left: 0;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f6f6f6;
  background-color: #fff;
  padding: 9px 16px;
  z-index: 100;
  white-space: nowrap;
  min-width: 100px;
`;

export const ModalItemContainer = styled.div<{ isSelected: boolean }>`
  font-size: 14px;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "normal")};
  color: ${(props) => (props.isSelected ? props.theme.colors.purple : "#000")};
  text-transform: capitalize;

  &:hover {
    color: ${(props) => props.theme.colors.purple};
    font-weight: 600;
  }
  &:not(:first-child) {
    margin-top: 17px;
  }
`;
