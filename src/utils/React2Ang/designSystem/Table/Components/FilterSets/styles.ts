import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  margin-top: 2px;
`;

const disabledStyles = css`
  background-color: #ecf3ff;
  color: #a8d4fe;
  border: solid 1px #ecf3ff;
`;

const defaultStyles = css`
  background-color: #ecf3ff;
  color: #1362e8;

  &:hover {
    background-color: ${(props) => props.theme.colors.lightBlue3};
    color: ${(props) => props.theme.colors.blue4};
  }
`;

const getButtonStyles = (disabled: boolean) => {
  return disabled ? disabledStyles : defaultStyles;
};

export const FilterSetsButton = styled.div<{ disabled: boolean }>`
  border-radius: 4px;
  text-align: center;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 6px 11px 5px 5px;
  cursor: pointer;
  gap: 5px;
  ${(props) => getButtonStyles(props.disabled)}
`;

export const FiltersIcon = styled.img`
  height: 25px;
  margin: -5px 0 -2px;
`;

export const Label = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.92;
  letter-spacing: normal;
  text-align: left;
`;

export const FilterSetsModalContainer = styled.div`
  width: 120px;
  max-height: 176px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  position: absolute;
  left: 0;
  top: 28px;
  padding: 0px 12px 9px;
  z-index: 100;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f6f6f6;
  background-color: ${(props) => props.theme.colors.white};

  &::-webkit-scrollbar {
    display: none;
  }

  input {
    position: sticky;
    top: 0;
    background-color: #fff;
    border: none;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: #798290;
    width: 100%;
    margin-bottom: 1px;
    padding-top: 8px;

    &:focus {
      outline: none;
    }
  }
`;

export const FilterSetItem = styled.div<{ isSelected: boolean }>`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "normal")};
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primaryBlue
      : props.theme.colors.black};
  cursor: pointer;
  margin-top: 17px;
  overflow-wrap: break-word;

  &:hover {
    color: ${(props) => props.theme.colors.primaryBlue};
    font-weight: 600;
  }
`;

export const InfoModalContainer = styled.div`
  min-width: 168px;
  min-height: 64px;
  position: absolute;
  left: -30%;
  top: 48px;
  padding: 10px 9px 14px 10px;
  z-index: 100;
  border-radius: 2px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  border: ${(props) => `solid 1px ${props.theme.colors.lightGray4}`};
  background-color: ${(props) => props.theme.colors.white};

  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.black};
`;
