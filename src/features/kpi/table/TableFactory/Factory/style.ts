import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0 0 6px rgb(0, 0, 0, 0.16);
  padding: 11px 48px;
  @media (max-width: 1400px) {
    padding: 18px 24px;
  }
`;

export const PreviewKPI = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const KPIWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 10px;
  gap: 20px;
  padding: 4px;
`;
