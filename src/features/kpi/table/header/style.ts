import styled from "styled-components";

export const HeaderTableWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 18px;
  padding-bottom: 16px;
`;

export const FirstColunmHeader = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 700;
`;

export const TimePeriodButton = styled.div`
  position: relative;
`;

export const CurrentTimePeriod = styled.div`
  cursor: pointer;
  display: flex;
`;

export const SearchWrapper = styled.div`
  max-width: 400px;
  min-width: 300px;
  width: 100%;
  @media (max-width: 600px) {
    margin-top: 15px;
    margin-left: unset;
  }
`;
