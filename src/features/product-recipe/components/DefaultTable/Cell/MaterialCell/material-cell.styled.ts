import styled from "styled-components";

export const MaterialCellWrapper = styled.div<{ editing: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => (props.editing ? "#6c7481" : "#ffffff")};
  padding: 2px 2px 2px 8px;
  border-radius: 4px;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

export const SettingIcon = styled.img`
  width: 24px;
  padding: 6px 0;
  cursor: pointer;
`;

export const MaterialName = styled.p`
  color: #101010;
  font-size: 14px;
  margin-bottom: 0;
`;
