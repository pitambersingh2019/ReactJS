import styled from "styled-components";

export const Wrapepr = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 25%;
`;
export const WrapperPrimaryKPI = styled.div`
  display: flex;
  font-family: ProximaNova;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #404d61;
`;

interface IWrapperPrimaryKPIImg {
  isActiveKPI: boolean;
}

export const WrapperPrimaryKPIImg = styled.div<IWrapperPrimaryKPIImg>`
  width: 15px;
  margin-left: 10px;
  opacity: ${({ isActiveKPI }) => (isActiveKPI ? 1 : 0.4)};
  cursor: ${({ isActiveKPI }) => (isActiveKPI ? "pointer" : "initial")};
  & > img {
    width: 100%;
    height: auto;
  }
`;

export const WrapperActiveLine = styled.div`
  display: flex;
`;

export const Title = styled.div`
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #404d61;
  margin-bottom: 8px;
  margin-right: 10px;
`;
