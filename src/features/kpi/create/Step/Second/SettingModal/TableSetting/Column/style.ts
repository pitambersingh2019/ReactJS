import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 300px;
  width: auto;
  overflow: hidden;
`;

interface IHeaderColumn {
  isLast: boolean;
}

export const HeaderColumn = styled.div<IHeaderColumn>`
  height: 72px;
  padding: 12px;
  background-color: #ecf1f7;
  white-space: nowrap;
  border-bottom: solid 1px white;
  border-right: ${(props) => (props.isLast ? "unset" : "solid 1px white")};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 8px;
  margin-bottom: 5px;
`;

interface ISortWrapper {
  isABC: boolean;
}

export const SortWrapper = styled.div<ISortWrapper>`
  height: 16px;
  transform: ${({ isABC }) => (isABC ? "rotateZ(180deg)" : "unset")};
  & > img {
    height: 100%;
    width: auto;
  }
`;

export const Title = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #050709;
`;

interface IItem {
  isLast: boolean;
}
export const WrapperItem = styled.div<IItem>`
  border-right: ${(props) => (props.isLast ? "unset" : "solid 1px #e3e3e3;")};
`;

export const Itemcolumn = styled.div<IItem>`
  display: flex;
  align-items: center;
  height: 48px;
  white-space: nowrap;
  border-bottom: ${(props) => (props.isLast ? "unset" : "solid 1px #e3e3e3;")};
  padding: 0 12px;
  font-family: ProximaNova, sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #101010;
`;
