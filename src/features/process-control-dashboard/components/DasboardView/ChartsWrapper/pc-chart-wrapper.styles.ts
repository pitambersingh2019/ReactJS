import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 260px;
  border-radius: 8px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04);
  border: solid 1px #aad5fd;
  background-color: #fff;
  padding: 8px;
  width: 100%;
  position: relative;
`;

export const PCChartWrapperContainer = styled.div<{ isLoading: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.isLoading ? "0.3" : "1.0")};
`;
