import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #fbfbfb;
  align-items: center;
  margin-bottom: 13px;
`;

export const CheckBox = styled.img`
  height: 16px;
  width: 16px;
`;

export const StyledInput = styled.input`
  width: 75%;
  border: none;
  border-bottom: 1px solid #b5b5b5;
  margin-inline-start: 8px;
  font-family: "ProximaNova";
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: #101010;

  &:focus {
    outline: none;
  }
`;

export const StyledSave = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #1580fc;
  margin-inline-start: 14px;

  &:hover {
    cursor: pointer;
  }
`;

export const DeleteIcon = styled.img`
  width: 20px;
  margin-inline-start: 15px;

  &:hover {
    cursor: pointer;
  }
`;
