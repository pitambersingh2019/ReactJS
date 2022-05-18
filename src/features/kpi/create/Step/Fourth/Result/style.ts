import styled from "styled-components";

export const ResultEdit = styled.div`
  width: 16px;
  cursor: pointer;
  & > img {
    width: 100%;
    height: auto;
  }
`;

export const Wrapper = styled.div`
  min-height: 25%;
  padding-top: 16px;
`;

interface IWrapperContent {
  gap: number;
}

export const WrapperContent = styled.div<IWrapperContent>`
  margin-top: ${({ gap }) => gap + "px"};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleWrapepr = styled.div`
  display: flex;
  align-items: center;
  height: 16px;
`;

export const Title = styled.div`
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #404d61;
`;

export const TitleImg = styled.div`
  height: 16px;
  & > img {
    height: 100%;
    width: auto;
  }
`;
