import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

export const FieldsWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  padding: 20px;
`;
export const SearchWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 40px;
`;
export const SearchButton = styled.div<{ disabled: boolean }>`
  position: absolute;
  right: 20px;
  top: 0;
  width: 98px;
  height: 32px;
  padding: 8px 24px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.disabled ? "#a8d4ff" : "#1268fb")};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${(p) => (p.disabled ? "#a8d4ff" : "#104fbc")};
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
`;
