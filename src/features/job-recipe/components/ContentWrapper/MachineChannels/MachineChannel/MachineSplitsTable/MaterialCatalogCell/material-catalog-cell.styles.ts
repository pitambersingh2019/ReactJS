import styled from "styled-components";

export const MaterialCatalogCellContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ValuesContainer = styled.div<{ isEditing: boolean }>`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline-start: 8px;
  border-radius: 4px;
  border: ${(props) =>
    props.isEditing ? `solid 1px ${props.theme.colors.gray2}` : "none"};
  margin: 2px 0;
`;

export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Material = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const Catalog = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray2};
`;

export const RefContainer = styled.div`
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.lightGray4};
  padding-inline-start: 8px;
`;

export const MaterialRef = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
`;

export const CatalogRef = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
`;

export const OpenIcon = styled.img`
  height: 24px;
  cursor: pointer;
`;
