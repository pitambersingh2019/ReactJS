import styled from "styled-components";

export const StyledModalBackground = styled.div`
  position: fixed;
  z-index: 2002;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledModalContentWrapper = styled.div<{
  width?: string;
  height?: string;
}>`
  height: ${(props) => props.height || "80%"};
  width: ${(props) => props.width || "80%"};
  border-radius: 4px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f3f3f4;
  background: #ffffff;
  position: relative;
`;

export const StyledModalHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e4e7eb;
`;

export const StyleModalHeaderTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.21;
  color: #050709;
  margin-bottom: 0;
`;

export const StyledModalDescription = styled.p`
  color: #6c7481;
  font-size: 16px;
  line-height: 1.25;
  margin-bottom: 0;
`;

export const StyledModalContent = styled.div<{ headerHeight: number }>`
  padding: 0 24px;
  margin-top: 16px;
  height: ${(props) => `calc(100% - 72px - ${props.headerHeight}px)`};
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
    margin: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(5, 7, 9, 0.38);
  }
`;

export const StyledButtonGroup = styled.div<{ justify: string }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: ${(props) => props.justify || "right"};
  padding: 16px 24px;
`;

export const StlyledCloseIcon = styled.img`
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  ${(props) => (props.theme.dir === "rtl" ? "left: 16px;" : "right: 16px;")}
`;
