import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DataItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldName = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const FirstRowContainer = styled.div`
  display: flex;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
`;

export const ArrowIcon = styled.img`
  height: 16px;
`;

export const Required = styled.div`
  align-self: flex-start;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray1};
  margin-inline-end: 32px;
`;
