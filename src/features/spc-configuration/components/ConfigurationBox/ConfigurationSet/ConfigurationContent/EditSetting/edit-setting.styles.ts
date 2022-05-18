import styled from "styled-components";

export const StyledEditContentWrapper = styled.div`
  padding: 16px;
  position: relative;
  > .MuiSvgIcon-root {
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 8px;
    color: gray;
    font-size: 20px;
  }
`;

export const StyledSPCTemplateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #ecf1f7;
`;

export const StyledSPCTemplateLabel = styled.p`
  color: #404d61;
  font-size: 16px;
  line-height: 1.19;
  font-weight: 600;
`;

export const StyledTestParamsWrapper = styled.div`
  padding: 16px 0;
`;

export const StyledTestParamsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledHeaderTitle = styled.p`
  color: #050709;
  font-weight: 600;
  font-size: 16px;
`;

export const StyledSaveAsTemplate = styled.p`
  font-size: 14px;
  color: #5900d3;
  line-height: 1.21;
  margin-bottom: 0;
  cursor: pointer;
  padding: 5px 9px;
  border-radius: 4px;
  background: #ecf3ff;
  font-weight: 600;
`;

export const StyledParametersRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
`;

export const StyledInputField = styled.input`
  width: 48px;
  height: 40px;
  outline: none;
  border: 1px solid #6c7481;
  color: #050709;
  border-radius: 4px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset; /* Change the color to your own background color */
  }

  &:disabled {
    border: 1px solid #b9bec6;
    color: #b9bec6;
  }
`;

export const StyledOthersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledOtherContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledOtherContentTitle = styled.div`
  color: #050709;
  font-weight: 600;
  font-size: 16px;
  padding: 16px 0;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0;
  justify-content: center;
  gap: 16px;
`;

export const StyledOtherInputField = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  border: 1px solid #6c7481;
  color: #6c7481;
  border-radius: 4px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  padding: 12px 16px;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset; /* Change the color to your own background color */
  }
`;

export const TitleReq = styled.p`
  font-size: 13px;
  line-height: 1.23;
  color: #6c7481;
  margin-bottom: 0;
  margin-top: 4px;
  padding-left: 16px;
`;

export const InputLabel = styled.p`
  font-size: 16px;
  color: #404d61;
  font-weight: 600;
  margin-bottom: 4px;
`;
