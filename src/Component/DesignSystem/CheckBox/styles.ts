import styled from "styled-components";

const handleBorderColor = (checked: boolean, disabled: boolean) => {
  if (checked && disabled === false) {
    return "solid 0.5px #6d6dc5";
  } else if (disabled) {
    return "solid 0.5px #afafaf";
  } else {
    return "solid 0.5px #000000";
  }
};

const handleBackgroundColor = (checked: boolean) => {
  if (checked) {
    return "#6d6dc5";
  } else {
    return "#fafafa";
  }
};

export const CheckBoxContainer = styled.div<{ height?: number }>`
  display: flex;
  height: ${(p) => `${p.height}px` ?? "100%"};
  margin: 5px;
  align-items: center;
`;

export const Container = styled.div`
  height: 100%;
  overflow: hidden;

  overflow-y: auto;
  margin: 10px;
  &::-webkit-scrollbar {
    width: 4px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(5, 7, 9, 0.38);
  }
`;

export const Wrapper = styled.div<{ selected: boolean; disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: ${(p) => handleBorderColor(p.selected, p.disabled)};
  background-color: ${(p) => handleBackgroundColor(p.selected)};
  border-radius: 2px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

export const OptContainer = styled.div`
  display: flex;
  align-items: center;
  .MuiSvgIcon-root {
    cursor: pointer;
    color: "#4a4a4a";
  }
`;

export const Title = styled.div<{ disabled: boolean }>`
  margin-right: 10px;
  margin-left: 10px;
  // width: 65%;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #050709;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;
