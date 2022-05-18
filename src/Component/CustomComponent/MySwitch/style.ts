import styled from "styled-components";

interface IWrapper {
  isActive: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  width: 32px;
  height: 16px;
  padding: 0 2px;
  border-radius: 10px;
  background-color: ${(props) => (props.isActive ? "#6d6dc5" : "grey")};
  display: flex;
  align-items: center;
  cursor: ${({ onClick }) => (!onClick ? "initial" : "pointer")};
`;

export const Circle = styled.div<IWrapper>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: white;
  transition: 0.3s;
  position: relative;
  transform: ${(props) => {
    if (props.theme.dir === "rtl") {
      return props.isActive ? "translate(0, 0)" : "translate(-16px, 0)";
    } else {
      return props.isActive ? "translate(16px, 0)" : "unset";
    }
  }};
`;
