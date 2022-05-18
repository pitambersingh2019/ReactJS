import styled from "styled-components";

export const TextBoxContainer = styled.div`
  border-radius: 4px;
  border: solid 1px ${(props) => props.theme.colors.gray2};
  background-color: ${(props) => props.theme.colors.white};
  overflow: hidden;
  margin-bottom: 16px;

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primaryBlue};
  }
`;

export const TextInput = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  padding: 16px 16px 0 18px;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};

  &::placeholder {
    font-family: ProximaNova;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: left;
    color: ${(props) => props.theme.colors.gray2};
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0 8px 8px;
`;
