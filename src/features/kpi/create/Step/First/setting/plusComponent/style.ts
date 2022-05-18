import styled from "styled-components";

export const WrapperBox = styled.div`
  width: 80px;
  height: 32px;
  border-radius: 5px;
  border: 1px solid #1268fb;
  background-color: white;
  display: flex;
  align-items: center;
  margin-top: 18px;
`;

export const WrapperPlus = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  margin-top: 18px;
  cursor: pointer;
`;

export const PlusLine = styled.div`
  width: 14px;
  height: 2px;
  background-color: #eeeff1;
`;

export const Plus = styled.div`
  width: 32px;
  height: 32px;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
