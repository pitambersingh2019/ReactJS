import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & img {
    height: 24px;
    width: 24px;
  }
`;

export const StyledTitle = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  line-height: 0.89;
  letter-spacing: normal;
  text-align: center;
  color: #101010;
`;

export const StyledText = styled.div`
  font-size: 14px;
  line-height: 1.43;
  color: #101010;
`;

export const StyledButtonsContainer = styled.div`
  margin-top: 25px;
  align-self: flex-end;
  display: flex;

  & > {
    &:first-child {
      margin-inline-end: 16px;
    }
  }
`;
