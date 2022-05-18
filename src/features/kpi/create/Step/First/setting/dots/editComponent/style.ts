import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 4px;
  border: 1px solid #eeeff1;
  background-color: white;
  & > div {
    border-bottom: 1px solid #eeeff1;
  }
  & > div:first-child {
    border-bottom: solid 1px #afafaf;
  }
  & > div:last-child {
    border-bottom: unset;
  }
`;

export const WrapperTitle = styled.div`
  margin: 0 2px;
`;

export const SearchWrapper = styled.div`
  padding: 5px 10px;
`;

export const WrapperPoint = styled.div`
  max-height: 200px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
  & > div:last-child {
    border-radius: 0 0 5px 5px;
  }
`;

export const Title = styled.div`
  height: 39.5px;
  min-width: 150px;
  padding: 0 14px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-family: ProximaNova, sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #050709;
  cursor: initial;
  border-radius: 5px 5px 0 0;
`;

interface IPointWrapper {
  isActive: boolean;
}
export const PointContainer = styled.div`
  padding: 0 2px;
  gap: 0 10px;
  &:hover {
    background-color: #f4f2ff;
  }
`;

export const PointWrapper = styled.div<IPointWrapper>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  gap: 0 10px;
  border-bottom: 1px solid #eeeff1;
  color: ${({ isActive }) => (isActive ? "#5900d3" : "#4a4a4a")};
  &:active {
    color: white;
    background-color: #5900d3;
  }
`;

export const Point = styled(Title)`
  color: inherit;
  padding: unset;
  border-bottom: unset;
  border-radius: unset;
  cursor: pointer;
`;

export const PointImg = styled.div`
  height: 14px;
  transform: translateY(-20%);
  & > img {
    height: 100%;
    width: auto;
  }
`;
