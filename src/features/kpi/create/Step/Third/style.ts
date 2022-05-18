import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const DisplayTypeText = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #f6f7fc;
`;

export const ImgWrapper = styled.div`
  width: 30px;
  margin-right: 10px;
  & img {
    width: 100%;
    font-family: ProximaNova;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    color: #f6f7fc;
  }
`;
