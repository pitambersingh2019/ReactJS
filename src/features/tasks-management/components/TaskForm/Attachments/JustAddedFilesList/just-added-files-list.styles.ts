import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AttachedItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

export const Preview = styled.img`
  width: 48px;
  height: 27px;
`;

export const Filename = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #050709;
  margin-inline-start: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 400px;
`;
