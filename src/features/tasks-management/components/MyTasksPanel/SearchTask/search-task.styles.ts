import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 8px;
  padding: 0 8px 17px;
  border-bottom: ${(props) => `solid 1px ${props.theme.colors.lightGray6}`};
`;

export const SearchTasksContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  border-bottom: ${(props) => `solid 1px ${props.theme.colors.lightGray6}`};
  background-color: ${(props) => props.theme.colors.white};
  width: 200px;

  &:hover,
  &:focus-within {
    border-bottom: ${(props) => `solid 1px ${props.theme.colors.primaryBlue}`};
  }
`;

export const SearchIcon = styled.img`
  height: 20px;
  margin-inline-end: 8px;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 50px white inset;
  }
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #6c7481;
  }
`;

export const CloseIcon = styled.img`
  height: 12px;
  cursor: pointer;
`;

export const DeleteIcon = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const DisabledDeleteIcon = styled.img`
  height: 20px;
`;
