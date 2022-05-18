import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DropDownContainer = styled.div`
  position: relative;
  width: 48px;
  cursor: pointer;
`;

export const DropDownButton = styled.div<{
  isOpen: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  border: solid 1px #1580fc;
  border-bottom: ${(props) => props.isOpen && "none"};
  border-radius: 4px;
  border-bottom-right-radius: ${(props) => props.isOpen && "0px"};
  border-bottom-left-radius: ${(props) => props.isOpen && "0px"};
  padding: 0px 3px 0 8px;
  background-color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;

export const SelectedText = styled.div<{ selected?: boolean }>`
  width: 100%;
  color: ${(props) =>
    props.selected ? props.theme.colors.primaryBlue : props.theme.colors.black};
  font-family: ProximaNova;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

export const DropDownListContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  height: fit-content;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${(props) => props.theme.colors.white};
  border: solid 1px #1580fc;
  border-top: solid 2px #c5c9cf;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const ListItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  padding: 0px 3px 0 8px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  border-bottom: 1px solid #c5c9cf;
  cursor: pointer;
  color: ${(props) =>
    props.isSelected ? props.theme.colors.primaryBlue : "#101010 "};
  background-color: ${(props) => props.theme.colors.white};

  &:hover {
    background-color: ${(props) => props.theme.colors.lightBlue2};
  }
`;
