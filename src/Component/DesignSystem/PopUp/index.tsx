import React from "react";
import {
  Container,
  Title,
  Wrapper,
  CloseIconStyled,
  Icon,
  ContentTextStyled,
  CloseButtonContainer,
  ContentWrapper,
  ApplyButton,
  ContentWrapperSubTitle,
} from "./styles";
import { PopUpInterface } from "./types";
import Info from "../../../assets/icons/tasks-management/warning.svg";
// import Button from "../Buttons";
const PopUp: React.FC<PopUpInterface> = (props) => {
  const { TitleText, ContentText, onClosePopUp, ButtonLabel, width } = props;

  return (
    <Container>
      <Wrapper width={width}>
        <CloseIconStyled onClick={onClosePopUp} />
        <Icon src={Info} />
        <ContentWrapper width={width}>
          <Title>{TitleText}</Title>
        </ContentWrapper>
        <ContentWrapperSubTitle>
          <ContentTextStyled>{ContentText}</ContentTextStyled>
        </ContentWrapperSubTitle>
        <CloseButtonContainer>
          <ApplyButton onClick={onClosePopUp} disabled={false}>
            {ButtonLabel}
          </ApplyButton>
          {/* <button onClick={onClosePopUp}>{ButtonLabel}</button> */}
        </CloseButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default PopUp;
