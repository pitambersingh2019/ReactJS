import styled from "styled-components";

export const AccordionContainer = styled.div<{
  expanded: boolean;
  changeBorderColor: boolean;
}>`
  border-radius: 6px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  background-color: #f0edfe;
  border: ${(props) =>
    `solid 1px ${
      props.changeBorderColor ? "#1d6df7" : props.theme.colors.lightGray4
    }`};
`;

export const SummaryContainer = styled.div<{
  arrowCentered: boolean;
  expanded: boolean;
}>`
  display: flex;
  align-items: ${(props) => (props.arrowCentered ? "center" : "flex-start")};
  cursor: pointer;
  padding: 15px 0px 15px;
`;

export const ArrowIcon = styled.img<{
  expanded: boolean;
  arrowCentered: boolean;
}>`
  height: 16px;
  transition: all 0.3s ease-out;
  transform: ${(props) => (props.expanded ? `rotate(0deg)` : `rotate(-90deg)`)};
  margin-inline-end: 8px;
  margin-top: ${(props) => (props.arrowCentered ? "0px" : "2px")};
  margin-inline-start: 24px;
`;

//to hide the table content on scroll at the top of the sticky header
export const WhiteDiv = styled.div`
  height: 8px;
  background-color: white;
  z-index: 1000;
  width: 100%;
`;

export const ContentContainer = styled.div<{
  expanded: boolean;
}>`
  background-color: ${(props) => props.theme.colors.white};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const ScrollWrapper = styled.div`
  max-height: calc(100vh - 80px - 85px - 80px - 60px);
  overflow: overlay;
  padding: 0px 16px 8px;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
`;
