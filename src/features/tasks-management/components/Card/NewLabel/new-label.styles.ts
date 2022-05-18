import styled from "styled-components";

export const NewLabelContainer = styled.div`
  width: fit-content;
  height: 16px;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #01044d;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 7px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  scroll-margin: 200px;
`;

export const Text = styled.div`
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-family: ProximaNova;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.white};
  text-transform: uppercase;
`;
