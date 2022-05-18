import React from "react";
import styled from "styled-components";
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
// import CheckCircleOutlineIcon from '@mui/icons-material/EuroSymbolSharp';
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";

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
  background-color: #1ec740;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  margin-left: ${({ theme: { dir } }) => (dir === "rtl" ? "0px" : "12px")};
  margin-right: ${({ theme: { dir } }) => (dir === "rtl" ? "12px" : "0px")};
`;

const Title = styled.div`
  text-align: ${({ theme: { dir } }) => (dir === "rtl" ? "right" : "left")};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #000;
`;

const SubTitle = styled.div`
  text-align: ${({ theme: { dir } }) => (dir === "rtl" ? "right" : "left")};
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;

  color: #757575;
`;

interface SuccessToastProps {
  //send to RuleContainer
  TitleText: string;
  subTitleText: string;
}

const SuccessToast: React.FC<SuccessToastProps> = (props) => {
  const { TitleText, subTitleText } = props;
  return (
    <Container>
      <LeftSide>
        <Line />
        <CheckCircleRoundedIcon
          style={{ color: "#1ec740", height: "24px", width: "24px" }}
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

export default SuccessToast;
