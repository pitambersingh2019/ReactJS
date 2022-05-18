import React from "react";
import empty_state from "../../../../assets/icons/empty_stat.svg";
import {
  StyledIconMenu,
  Body,
  InfoText,
  CardTapet,
  CardsContainer,
  EmptyCardContainer,
} from "./styles";
import { translations } from "../../../../locales/translations";
import { useTranslation } from "react-i18next";

const EmptyCards = () => {
  const { t } = useTranslation();

  return (
    <EmptyCardContainer>
      <Body>
        <CardsContainer>
          <CardTapet></CardTapet>
          <CardTapet></CardTapet>
          <CardTapet></CardTapet>
        </CardsContainer>
        <StyledIconMenu width={38} height={38} src={empty_state} />
        <InfoText>
          {t(translations.RulesContainer.CREATE_RULE.EMPTY_INFO1)}
          <br></br>
          {t(translations.RulesContainer.CREATE_RULE.EMPTY_INFO2)}
        </InfoText>
      </Body>
    </EmptyCardContainer>
  );
};

export default EmptyCards;
