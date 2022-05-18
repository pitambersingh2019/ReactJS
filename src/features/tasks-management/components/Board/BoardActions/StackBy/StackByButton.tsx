import {
  Wrapper,
  StackByIcon,
  StackByContainer,
  Label,
  Container,
  GroupByLabel,
} from "./styles";
import icon from "../../../../../../assets/icons/tasks-management/stack-by.svg";
import StackByModal from "./StackByModal";
import { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { useStackBy } from "../../../../context/useStackBy";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";

export default function StackByButton() {
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();

  const { stackBySelectedOption, stackByOptions } = useStackBy();
  const selected = stackByOptions.find(
    (option) => option.name === stackBySelectedOption
  )?.value;

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Container>
      <StackByIcon src={icon} alt="stack by icon" />
      <GroupByLabel>{t(translations.TasksManagement.GroupBy)}:</GroupByLabel>
      <Wrapper onClick={toggleModal}>
        <StackByContainer>
          <Label>{selected}</Label>
          {showModal && (
            <ClickAwayListener onClickAway={toggleModal}>
              <div>
                <StackByModal />
              </div>
            </ClickAwayListener>
          )}
        </StackByContainer>
      </Wrapper>
    </Container>
  );
}
