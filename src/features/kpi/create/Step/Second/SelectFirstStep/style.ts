import styled from "styled-components";

interface IKPISelect {
  color?: "#a7a7a7" | "unset";
}

export const KPISelect = styled.div<IKPISelect>`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 0;
  background-color: #e2e4e7;
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #101010;
  border: 1px solid #6c7481;
  border-radius: 5px;
  color: ${(props) => props.color};
`;

export const WrapperOption = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  z-index: 99;
  & > div:last-child {
    border-radius: 0 0 4px 4px;
  }
`;

export const Option = styled.div`
  height: 50px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
`;

interface ISelectValue {
  active: boolean;
  disable: boolean;
}
export const SelectValue = styled(Option)<ISelectValue>`
  justify-content: space-between;
  border-radius: ${(props) => (props.active ? "4px 4px 0 0" : "4px")};
  cursor: ${({ disable }) => (disable ? "unset" : "pointer")};
`;

export const ArrowWrapper = styled.div`
  width: 20px;
  & > img {
    width: 100%;
    height: auto;
  }
`;
