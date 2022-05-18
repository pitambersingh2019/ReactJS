import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Line = styled.div`
  width: 4px;
  height: 48px;
  border-radius: 2px;
  margin-right: 8px;
  background-color: #ff9900;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

const Title = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`;

const SubTitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #757575;
`;

interface ErrorToastProps {
  //send to RuleContainer
  TitleText: string;
  subTitleText: string;
}

const ErrorToast: React.FC<ErrorToastProps> = (props) => {
  const { TitleText, subTitleText } = props;
  return (
    <Container>
      <LeftSide>
        <Line />
        <CircularProgress
          style={{ color: "#ff9900", height: "24px", width: "24px" }}
        />
        <TextWrapper>
          <Title>{TitleText}</Title>
          <SubTitle>{subTitleText}</SubTitle>
        </TextWrapper>
      </LeftSide>
      {/* <RightSide>
                <CloseIcon  style={{  height: '24px', width: '24px' }} />
            </RightSide> */}
    </Container>
  );
};

export default ErrorToast;
