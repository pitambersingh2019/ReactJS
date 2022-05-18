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
import useSaveFilterSet from "../../../hooks/useSaveFilterSet";
import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";
import { useSavedFilters } from "../../../context/useSavedFilters";
import { useSelectedFilterSet } from "../../../context/useSelectedFilterSet";

type SaveFilterModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onCancel: () => void;
};

export default function SaveFilterModal({
  isOpen,
  handleClose,
  onCancel,
}: SaveFilterModalProps) {
  const [name, setName] = useState("");

  const { saveFilterSet } = useSaveFilterSet();
  const { savedFilters, fetchSavedFilters } = useSavedFilters();
  const { setSelectedFilterSet } = useSelectedFilterSet();

  const { t } = useTranslation();

  const translatedFilterSet = t(translations.TasksManagement.FilterSet);

  const placeholder = `${translatedFilterSet}_${
    (savedFilters?.length || 0) + 1
  }`;

  const onSaveSuccess = async (filterId: number) => {
    fetchSavedFilters();
    setSelectedFilterSet({
      label: name.trim().length > 0 ? name.trim() : placeholder,
      value: filterId,
    });
    handleClose();
  };

  const onSave = () => {
    const filterSetName = name.trim().length > 0 ? name.trim() : placeholder;
    saveFilterSet(filterSetName, onSaveSuccess);
  };

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "272px",
        minHeight: "264px",
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
        placeholder={placeholder}
        required={false}
        TitleText={t(translations.TasksManagement.NewFilterSet)}
        value={name}
        onChange={setName}
        maxLength={40}
      />
      <ButtonContainer>
        <Button
          label={t(translations.TasksManagement.Cancel)}
          variant="secondary"
          onClick={onCancel}
          width="104px"
          size="md"
        />
        <Button
          label={t(translations.TasksManagement.Save)}
          onClick={onSave}
          width="104px"
          size="md"
        />
      </ButtonContainer>
    </CustomPopover>
  );
}
