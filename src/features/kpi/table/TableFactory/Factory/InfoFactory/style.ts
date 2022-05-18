import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const FirstColumn = styled.div`
  height: 50px;
  padding-top: 7px;
  display: flex;
  justify-content: flex-start;
`;

export const KPIName = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: normal;
  color: #101010;
`;

export const KPICount = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 14px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #666;
`;

export const KPINameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IArrowWrapper {
  open: boolean;
}

export const ArrowWrapper = styled.div<IArrowWrapper>`
  height: 100%;
  width: 20px;
  ${rtl`
    margin-right: 5px;
  `};
  margin-top: 5px;
  display: flex;
  align-items: flex-start;
  cursor: pointer;

  & > img {
    transition: 0.3s;
    transform: ${(props) => {
      if (props.theme.dir === "rtl") {
        return props.open ? "unset" : "rotate(90deg)";
      } else {
        return props.open ? "unset" : "rotate(-90deg)";
      }
    }};
  }
`;
