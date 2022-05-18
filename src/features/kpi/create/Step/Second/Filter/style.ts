import styled from "styled-components";

export const FilterWrapper = styled.div`
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: calc(100% - 384px);
  min-width: 200px;
`;

interface IFilterButtonWrapper {
  disable: boolean;
}

export const FilterButtonWrapper = styled.div<IFilterButtonWrapper>`
  display: flex;
  width: fit-content;
  gap: 0 7px;
  margin-bottom: 12px;
  align-items: center;
  opacity: ${({ disable }) => (disable ? 0.5 : 1)};
  cursor: ${({ disable }) => (disable ? "unset" : "pointer")};
`;

export const FilterImgWrapper = styled.div`
  width: 20px;
  & > img {
    width: 100%;
    height: auto;
  }
`;

export const FilterText = styled.div`
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #5900d3;
`;

export const TabsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
