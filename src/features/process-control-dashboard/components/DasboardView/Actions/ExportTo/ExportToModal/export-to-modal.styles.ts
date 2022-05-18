import styled from "styled-components";

export const ExportToModalContainer = styled.div`
  position: absolute;
  ${(props) => (props.theme.dir === "rtl" ? `left: 0px;` : `right: 0px;`)}
  top: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  border: ${(props) => `solid 1px ${props.theme.colors.lightGray3}`};
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
  white-space: nowrap;
  min-width: 120px;
  padding: 6px 0;
  cursor: pointer;
`;

export const ExportOption = styled.div`
  height: 32px;
  padding: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => props.theme.colors.lightBlue2};
  }

  & a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.black};
  }
`;
