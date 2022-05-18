import styled from "styled-components";
export const TableContainer = styled.div``;
export const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 10px;
`;

export const FooterWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 40px;
  padding: 8px 24px;
`;

export const ActiviateJobButton = styled.div<{ disabled: boolean }>`
  position: absolute;
  right: 0px;
  top: 0;
  width: 120px;
  height: 40px;
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
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  user-select: none;

  &:hover {
    background-color: ${(p) => (p.disabled ? "#a8d4ff" : "#104fbc")};
  }
`;
