import styled from "styled-components";

export const ExportChartContainer = styled.div``;

export const MenuIcon = styled.img`
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 10px;
`;

export const ExportModalContainer = styled.div`
  position: absolute;
  ${(props) => (props.theme.dir === "rtl" ? `left: 22px;` : `right: 22px;`)}
  top: 0px;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: ${(props) => `solid 1px ${props.theme.colors.lightGray3}`};
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
  white-space: nowrap;
  min-width: 222px;
  padding: 12px 0px;
  cursor: pointer;

  & > * {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export const ExportOptionContainer = styled.div`
  display: flex;
  align-items: end;
  padding: 0px 8px;
`;

export const OptionIcon = styled.img`
  height: 20px;
  margin-inline-end: 12px;
`;

export const OptionLabel = styled.div`
  font-family: ProximaNova;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.black};
`;

export const Divider = styled.div`
  width: 100%;
  border-bottom: solid 1px #e4e7eb;
`;
