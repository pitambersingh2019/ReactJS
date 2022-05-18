import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.div`
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.gray3};
`;

export const DropDownContainer = styled.div<{
  isOpen: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  border: solid 1px ${(props) => props.theme.colors.gray2};
  border-bottom: ${(props) =>
    props.isOpen ? "none" : `solid 1px ${props.theme.colors.gray2}`};
  border-radius: 4px;

  &:hover {
    border: solid 1px ${(props) => props.theme.colors.primaryBlue};
    border-bottom: ${(props) =>
      props.isOpen ? "none" : `solid 1px ${props.theme.colors.primaryBlue}`};
  }
`;

export const DropDownHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  padding: 12px 16px 12px 16px;
  background-color: ${(props) => props.theme.colors.white};
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #575757;
  overflow: hidden;
  cursor: pointer;
`;

const handleTextColor = (isPlaceholder?: boolean, isSelected?: boolean) => {
  if (isPlaceholder) {
    return `#b9bec6;`;
  }
  if (isSelected) {
    return "#1268fb";
  }

  return "#050709";
};

export const DropDownText = styled.div<{
  isPlaceholder?: boolean;
  selected?: boolean;
}>`
  outline: none;
  border: none;
  width: 100%;
  color: ${(props) => handleTextColor(props.isPlaceholder, props.selected)};
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;

  //max 2 lines, ellipsis if more
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const DropDownListContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: -1px;
  top: 39px;
  width: calc(100% + 2px);
  z-index: 2;
  height: fit-content;
  max-height: 335px;
  overflow-y: auto;
  overflow-x: hidden;

  border: solid 1px #6c7481;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.38);
  }
`;

export const DropDownList = styled.div`
  padding: 0;
  margin: 0;
  background: ${(props) => props.theme.colors.white};
  font-weight: 500;
  border-top: none;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  max-height: 300px;
`;

export const ListItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 12px 16px 12px 16px;
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  border-bottom: 1px solid rgba(112, 112, 112, 0.1);
  cursor: pointer;
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primaryBlue
      : props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};

  &:hover {
    background-color: ${(props) => props.theme.colors.lightBlue2};
    color: ${(props) => props.theme.colors.lightBlue2};
  }
`;
