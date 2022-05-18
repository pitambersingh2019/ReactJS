import styled from "styled-components";

export const AddDisplayContainer = styled.div<{ withPadding: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 24px;
  margin-bottom: 24px;
  padding-inline-start: ${(props) => (props.withPadding ? "16px" : "0px")};
  cursor: pointer;
  width: 760px;
`;

export const PlusIcon = styled.img`
  height: 20px;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.purple};
  padding-inline-start: 4px;
`;
