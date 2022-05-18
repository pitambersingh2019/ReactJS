import styled from "styled-components";

export const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Radio = styled.input`
  &[type="radio"] {
    /* remove standard background appearance */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    width: 16px;
    height: 16px;
    padding: 3px;
    background-clip: content-box;
    border: solid 1px #050709;
    border-radius: 50%;
    margin: 0 !important;
    top: 0px !important;
  }

  &[type="radio"]:checked {
    background-color: #6d6dc5;
    border-color: #6d6dc5;
  }
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-start: 8px;
`;
