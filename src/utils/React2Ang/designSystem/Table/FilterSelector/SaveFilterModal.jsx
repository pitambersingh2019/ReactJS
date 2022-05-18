import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import {
  ModalTitle,
  ModalTitleContainer,
  TitleIcon,
  ModalContent,
  ButtonContainer,
} from "./styles";
import filter from "../../../../../assets/icons/filter_new.svg";
import InputTextField from "../../../../../Component/DesignSystem/InputText";
import { useState } from "react";
import Button from "../../../../../Component/DesignSystem/Buttons";
import CustomPopover from "../Components/CustomModal/CustomPopover";

export default function SaveFilterModal({
  isOpen,
  handleClose,
  handleAddFilterSet,
  // filterSets,
  ListItems,
  hideFilterSaveButton,
}) {
  const [name, setName] = useState("");

  const { t } = useTranslation();

  // const translatedFilterSet = t(translations.TasksManagement.FilterSet);

  // const placeholder = `${translatedFilterSet}_${(filterSets.size || 0) + 1}`;

  const onSave = () => {
    const filterSetName = name.trim();
    if (filterSetName.length > 0) {
      handleAddFilterSet(filterSetName, ListItems);
      hideFilterSaveButton();
      handleClose();
    }
  };

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "272px",
        height: "264px",
        padding: "24px 24px 16px",
      }}
    >
      <ModalTitleContainer>
        <TitleIcon src={filter} alt="icon" />
        <ModalTitle>
          {t(translations.TasksManagement.SaveAsFilterSet)}
        </ModalTitle>
      </ModalTitleContainer>
      <ModalContent>
        {t(translations.TasksManagement.SaveFilterSetContent)}
      </ModalContent>
      <InputTextField
        placeholder={"Filter"}
        required={false}
        TitleText={t(translations.TasksManagement.NewFilterSet)}
        value={name}
        onChange={setName}
        maxLength={40}
      />
      <ButtonContainer>
        <Button
          label={t(translations.TasksManagement.Cancel)}
          variant="purple-secondary"
          onClick={handleClose}
          width="104px"
          size="md"
        />
        <Button
          label={t(translations.TasksManagement.Save)}
          onClick={onSave}
          width="104px"
          size="md"
          variant="purple"
        />
      </ButtonContainer>
    </CustomPopover>
  );
}
