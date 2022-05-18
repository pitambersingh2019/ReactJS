import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  margin-top: 16px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 8px;
  padding: 0 16px 17px;
  border-bottom: ${(props) => `solid 1px ${props.theme.colors.lightGray6}`};
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchIconContainer = styled.div`
  border: 1px solid #797e8d;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const SearchIcon = styled.img`
  height: 14px;
  cursor: pointer;
`;

export const SortIcon = styled.img`
  height: 28px;
  margin-inline-end: 6px;
  cursor: pointer;
`;

export const StackByIcon = styled.img`
  height: 22px;
  margin-inline-end: 8px;
  cursor: pointer;
`;

export const FilterIcon = styled.img`
  height: 22px;
  cursor: pointer;
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

export const StackByContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

export const FilterContainer = styled.div`
  position: relative;
`;

export const StackByModalContainer = styled.div`
  position: absolute;
  ${(props) => (props.theme.dir === "rtl" ? "left: 0px;" : "right: 0px;")}
  top: 25px;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f6f6f6;
  background-color: #fff;
  padding: 9px 16px;
  z-index: 100;
  white-space: nowrap;
  min-width: 90px;
`;

export const StackByModalItemContainer = styled.div<{ isSelected: boolean }>`
  font-size: 14px;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "normal")};
  color: ${(props) =>
    props.isSelected ? props.theme.colors.primaryBlue : "#000"};
  text-transform: capitalize;

  &:hover {
    color: ${(props) => props.theme.colors.primaryBlue};
    font-weight: 600;
  }
  &:not(:first-child) {
    margin-top: 17px;
  }
`;

const getPosition = (isRtl: boolean, isSearch?: boolean) => {
  if (isSearch) {
    return isRtl
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `;
  }

  return isRtl
    ? css`
        left: 0;
      `
    : css`
        right: 0;
      `;
};

export const ActionsTooltip = styled.div<{ isSearch?: boolean }>`
  width: fit-content;
  height: 32px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 2px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px ${(props) => props.theme.colors.lightGray4};
  position: absolute;
  z-index: 101;
  top: 20px;
  ${(props) => getPosition(props.theme.dir === "rtl", props.isSearch)}
  padding: 8px;

  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  white-space: nowrap;
`;
