import styled from "styled-components";

export const WrapperType = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  margin-top: 30px;
`;

export const WrapperTypeButton = styled.div`
  text-align: center;
`;

interface ITypeButtonText {
  isActive: boolean;
}

export const TypeButtonText = styled.div<ITypeButtonText>`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  font-size: 16px;
  color: ${({ isActive }) => (isActive ? "#5900d3" : "#404d61")};
`;

interface IDisplayTypeButton {
  isActive: boolean;
}

export const DisplayTypeButton = styled.div<IDisplayTypeButton>`
  position: relative;
  display: flex;
  justify-content: center;
  height: 144px;
  width: 216px;
  border: 1px solid #cecece;
  border-radius: 4px;
  background-color: #fafafa;
  box-shadow: 0 0 5px #ababab;
  cursor: pointer;
  border: ${({ isActive }) =>
    isActive ? "solid 3px #5900d3" : "solid 3px #fafafa "};
`;

interface IWrapperComponent {
  bottom: number;
}

export const WrapperComponent = styled.div<IWrapperComponent>`
  position: absolute;
  bottom: ${({ bottom }) => bottom + "px"};
  height: fit-content;
`;

export const DisplayTypeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  border-radius: 10px 10px 0 0;
  background-color: #5acb97;
  padding: 20px 20px;
`;
