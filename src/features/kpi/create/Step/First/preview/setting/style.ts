import styled from "styled-components";

export const PreviewSetting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin: 10px 0;
  padding: 0 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
`;

interface IButtonCancelSave {
  backgroundColor: string;
  color: string;
}

export const ButtonCancelSave = styled.button<IButtonCancelSave>`
  border: 2px solid #5900d3;
  border-radius: 5px;
  width: 100px;
  height: 35px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  &:first-child {
    margin-left: unset;
  }

  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
`;

export const PreviewFormulaHeaderButton = styled.div`
  display: flex;
  align-items: center;
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #5900d3;
  cursor: pointer;
`;
