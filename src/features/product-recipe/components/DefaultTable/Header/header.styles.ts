import styled from "styled-components";

export const TableHeader = styled.thead``;

export const TableHeaderRow = styled.tr``;

export const TableHeaderTH = styled.th`
  text-align: left;
  vertical-align: baseline;
  background-color: #ecf1f7;
  border-top: 1px solid #d1d1d1;
  ${(props) =>
    props.theme.dir === "rtl"
      ? `border-left: 2px solid #ffffff;`
      : `border-right: 2px solid #ffffff;`}
  :last-child {
    ${(props) =>
      props.theme.dir === "rtl" ? `border-left: 0;` : `border-right: 0;`}
  }
`;

export const ColContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 13px 8px 10px 8px;
`;

export const SortTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 9px;
`;

export const ColTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #050709;
  line-height: 1.21;
  margin-bottom: 0;
  ${(props) =>
    props.theme.dir === "rtl" ? `margin-left: 5px;` : `margin-right: 5px;`}
`;

export const SortIconStyle = styled.img`
  width: 16px;
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
