import styled from "styled-components";

const Button = styled.button<{ active: boolean }>`
  padding: 12px 20px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#1268fb" : "#a8d4ff")};
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  align-items: center;
  text-align: center;
  border: none;
  color: white;
  &:hover {
    background-color: ${(props) => (props.active ? "#104fbc" : "#a8d4ff")};
  }
`;

export default Button;
