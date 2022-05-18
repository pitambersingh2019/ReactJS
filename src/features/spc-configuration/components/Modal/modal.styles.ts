import styled from "styled-components";

export const StyledModalBackground = styled.div`
  position: fixed;
  z-index: 2002;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledModalContentWrapper = styled.div<{
  width: string;
  height: string;
}>`
  height: ${(props) => props.height || "80%"};
  width: ${(props) => props.width || "80%"};
  border-radius: 4px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f3f3f4;
  background: #ffffff;
`;

export const StyledModalContent = styled.div`
  padding: 32px 24px;
  height: calc(100% - 64px);
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const StyleModalHeaderTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 0.89;
  color: #101010;
  ${(props) =>
    props.theme.dir === "rtl" ? `margin-right: 8px;` : `margin-left: 8px;`}
  margin-bottom: 0;
`;

export const StyledModalDescription = styled.p`
  color: #101010;
  font-size: 14px;
  line-height: 1.43;
  margin-bottom: 16px;
`;

export const StyledTreeWrapper = styled.div`
  overflow: auto;
  height: calc(100% - 40px);
  ul {
    padding-inline-start: 16px;
    margin-top: 8px;
  }
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
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: ${(props) => props.justify || "right"};
  padding: 16px;
`;
