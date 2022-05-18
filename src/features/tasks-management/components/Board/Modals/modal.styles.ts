import styled from "styled-components";

export const StyledTitle = styled.div`
  display: flex;
  align-items: end;

  img {
    height: 30px;
  }

  span {
    font-size: 18px;
    font-weight: 600;
    color: #101010;
    margin-inline-start: 8px;
  }
`;

export const StyledContent = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.43;
  color: #101010;
  margin-top: 16px;
  margin-bottom: 41px;
`;

export const StyledShowAgain = styled.div`
  display: flex;
  align-items: end;

  img {
    height: 16px;
  }

  span {
    font-size: 12px;
    font-weight: normal;
    line-height: 1.33;
    color: #575757;
    margin-inline-start: 4px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
`;
