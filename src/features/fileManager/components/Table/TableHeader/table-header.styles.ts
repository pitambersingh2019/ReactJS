import styled from "styled-components";

export const TableHeaderCell = styled.th`
  vertical-align: baseline;
  text-align: ${(props) => (props.theme.dir === "ltr" ? "left" : "right")};
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  font-size: 14px;
  background-color: ${(props) => props.theme.colors.lightGray3};
  padding: 9px;
`;

export const Title = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.black};
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline-start: 4px;
`;

export const SortingIcon = styled.img`
  height: 16px;
`;
