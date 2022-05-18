import styled from "styled-components";

export const RadioButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 40px;
  justify-content: center;
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
    -fx-focus-traversable: false;
  }

  &[type="radio"]:checked {
    background-color: #6d6dc5;
    border-color: #6d6dc5;
  }
`;
