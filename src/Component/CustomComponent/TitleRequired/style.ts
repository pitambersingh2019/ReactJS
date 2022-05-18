import styled from "styled-components";

export const TitleErrorWrapper = styled.div`
  display: flex;
  gap: 0 10px;
`;

export const ErorrWrapper = styled.div`
  height: 16px;
  & > img {
    height: 100%;
    width: auto;
  }
`;

interface ITitle {
  color: string;
}

export const Title = styled.div<ITitle>`
  margin-bottom: 4px;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${({ color }) => color};
`;

interface IRequired {
  color: string;
}

export const Required = styled.div<IRequired>`
  margin-top: 4px;
  margin-left: 10px;
  font-family: ProximaNova;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${({ color }) => color}; ;
`;
