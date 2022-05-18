import styled from "styled-components";

export const PeriodSelectorContainer = styled.div`
  display: flex;
  margin-top: 24px;
  align-items: center;
`;

export const Icon = styled.img`
  height: 20px;
  margin-inline-end: 8px;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-end: 8px;
`;

export const ArrowIcon = styled.img`
  height: 20px;
`;

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  z-index: 3;
`;

export const PeriodSelectorModalContainer = styled.div`
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f6f6f6;
  background-color: ${(props) => props.theme.colors.white};
  min-width: 140px;
  padding: 12px 16px;
  position: absolute;
  top: 25px;

  & > {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export const ModalItem = styled.div<{ isSelected: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => (props.isSelected ? "600" : "normal")};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) =>
    props.isSelected ? props.theme.colors.purple : props.theme.colors.black};
`;
