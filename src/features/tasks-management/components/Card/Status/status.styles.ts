import styled from "styled-components";

export const StatusContainer = styled.div<{ noMargin: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => (props.noMargin ? "0px" : "9px")};
`;

export const Icon = styled.img`
  height: 18px;
`;

export const Label = styled.div`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.black};
`;
