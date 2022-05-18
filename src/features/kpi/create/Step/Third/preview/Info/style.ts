import styled from "styled-components";

export const PreviewInfoWrapper = styled.div`
  width: 90%;
  margin: 30px auto 0;
`;

export const MarkWrapper = styled.div`
  padding: 10px;
  background-color: #fafafa;
`;

export const PreviewInfo = styled.div`
  color: #6c7481;
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: unset;
  }

  @media (max-width: 1400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const InfoHoverWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
`;

export const InfoHover = styled.div`
  width: 15px;
  & > img {
    width: 100%;
    height: auto;
  }
`;
