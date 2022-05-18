/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Container,
  Header,
  Wrapper,
  CloseIconStyled,
  Title,
  SubTitle,
  FooterStyled,
  CheckBoxTitle,
  CheckBoxContainer,
  Body,
  WarningIconStyled,
} from "./styles";
import CheckBox from "../../../../../Component/DesignSystem/CheckBox";
import warning from "../../../../../assets/icons/tasks-management/warning.svg";
import Button from "../../../../../Component/DesignSystem/Buttons";

const ShaereTable = ({
  onClose,
  handleRestoreDefaults,
  handleRestoreSorting,
  handleRestoreFilter,
  handleRestoreHiddenCols,
}) => {
  const [checked, setchecked] = useState(false);
  const stopBubbling = { onClick: (e) => e.stopPropagation() };

  const handleRestoreClick = () => {
    handleRestoreDefaults && handleRestoreDefaults(checked);
    handleRestoreSorting();
    handleRestoreFilter();
    handleRestoreHiddenCols();
    onClose && onClose();
  };
  return (
    <Container onClick={onClose}>
      <Wrapper {...stopBubbling}>
        <Header>
          <WarningIconStyled src={warning} />
          <Title>Restore Settings</Title>
        </Header>
        <Body>
          <SubTitle>
            Are you sure you want to restore to the default settings? You can’t
            undo this action.
          </SubTitle>
          <CheckBoxContainer>
            <CheckBox
              checked={checked}
              onChange={() => setchecked((prev) => !prev)}
            />
            <CheckBoxTitle>Don’t show this message again</CheckBoxTitle>
          </CheckBoxContainer>
        </Body>
        <FooterStyled>
          <Button
            label={"Cancel"}
            variant="purple-secondary"
            onClick={onClose}
            width="104px"
            size="md"
          />
          <Button
            label={"Restore"}
            onClick={handleRestoreClick}
            width="104px"
            size="md"
            variant="purple"
          />
        </FooterStyled>
      </Wrapper>
    </Container>
  );
};

export default ShaereTable;
