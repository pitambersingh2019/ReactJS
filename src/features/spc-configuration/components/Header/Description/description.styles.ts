import styled from "styled-components";

export const StyledDescription = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.19;
  color: #6c7481;
  ${(props) =>
    props.theme.dir === "rtl"
      ? `border-right: 3px solid #6c7481;`
      : `border-left: 3px solid #6c7481;`}
  padding: 4px 12px;
  margin-bottom: 14px;
`;
