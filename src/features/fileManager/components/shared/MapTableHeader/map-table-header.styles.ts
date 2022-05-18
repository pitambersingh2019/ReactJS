import styled from "styled-components";

export const MapTableHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 40px;
  height: 32px;
`;

export const FirstColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline-end: 32px;
  margin-bottom: 8px;
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const SearchIcon = styled.img`
  height: 22px;
`;

export const ColumnTitle = styled.div`
  padding-top: 8px;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;
