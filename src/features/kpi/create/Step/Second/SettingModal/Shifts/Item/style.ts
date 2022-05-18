import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 16px;
`;

export const Shift = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

interface IShiftArrow {
  isOpen: boolean;
}

export const ShiftArrow = styled.div<IShiftArrow>`
  height: 16px;
  transform: ${(props) => {
    if (props.theme.dir === "rtl") {
      return props.isOpen ? "unset" : "rotateZ(90deg)";
    } else {
      return props.isOpen ? "unset" : "rotateZ(-90deg)";
    }
  }};
  margin: 0 8px;
  & > img {
    height: 100%;
    width: auto;
  }
`;

export const ShiftText = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #101010;
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const WrapperDays = styled.div`
  margin-left: 20px;
  & > div {
    margin-top: 12px;
  }
`;
