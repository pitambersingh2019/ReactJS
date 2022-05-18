import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";
import {
  ButtonsContainer,
  CheckboxWrapper,
  CloseIcon,
  Divider,
  Header,
  Title,
  Wrapper,
} from "./save-alternative-recipe-modal.styles";

import closeIcon from "../../../../../assets/icons/closeIcon.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import InputTextField from "../../../../../Component/DesignSystem/InputText";
import { useState } from "react";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { InputMode } from "../../../../../Component/DesignSystem/InputText/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Grid from "@mui/material/Grid";
import CheckboxComponent from "../../shared/Checkbox";
import DateTimePickerComponent from "../../shared/DateTimePicker";
import { UpsertRecordByFormParams } from "../../../ts";
import moment from "moment";
import { getProductRecipeJob, upsertRecordByForm } from "../../../redux/slice";

type SaveAlternativeRecipeModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSaveChanges: () => void;
};

export default function SaveAlternativeRecipeModal({
  isOpen,
  handleClose,
  onSaveChanges,
}: SaveAlternativeRecipeModalProps) {
  const [name, setName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [description, setDescription] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const isValid = name.trim().length > 0 && englishName.trim().length > 0;

  const dispatch = useAppDispatch();
  const jobId = useAppSelector((state) => state.jobRecipe.jobId);

  const { t } = useTranslation();

  const onSave = async () => {
    const params: UpsertRecordByFormParams = [
      {
        FieldName: "JobID",
        Eq: jobId,
        DataType: "num",
      },
      { FieldName: "LName", Eq: name, DataType: "text" },
      { FieldName: "EName", Eq: englishName, DataType: "text" },
      { FieldName: "Descr", Eq: description, DataType: "text" },
      { FieldName: "isDefault", Eq: isDefault ? 1 : 0, DataType: "True/False" },
      { FieldName: "isActive", Eq: isActive ? 1 : 0, DataType: "True/False" },
      {
        FieldName: "ExpirationStartDate",
        Eq: startDate ? moment(startDate).format("YYYY-MM-DD HH:mm:ss") : null,
        DataType: "Date",
      },
      {
        FieldName: "ExpirationEndDate",
        Eq: endDate ? moment(endDate).format("YYYY-MM-DD HH:mm:ss") : null,
        DataType: "Date",
      },
    ];
    onSaveChanges();
    await dispatch(upsertRecordByForm(params));
    dispatch(getProductRecipeJob(jobId));
    handleClose();
  };

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{
        width: "70%",
        minHeight: "50%",
        padding: "24px 24px 16px",
      }}
    >
      <Header>
        <Title>{t(translations.JobRecipe.SaveAsAlternativeRecipe)}</Title>
        <CloseIcon src={closeIcon} alt="close icon" onClick={handleClose} />
      </Header>
      <Divider />
      <Wrapper>
        <Grid container rowSpacing={6} columnSpacing={3}>
          <Grid item sm={6} md={4} lg={3}>
            <InputTextField
              mode={InputMode.readonly}
              TitleText={t(translations.JobRecipe.Job)}
              placeholder=""
              required={false}
              value={jobId}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={() => {}}
            />
          </Grid>
          <Grid item sm={6} md={4} lg={3}>
            <InputTextField
              placeholder=""
              required
              TitleText={t(translations.JobRecipe.Name)}
              value={name}
              onChange={setName}
            />
          </Grid>
          <Grid item sm={6} md={4} lg={3}>
            <InputTextField
              placeholder=""
              required
              TitleText={t(translations.JobRecipe.EnglishName)}
              value={englishName}
              onChange={setEnglishName}
            />
          </Grid>
          <Grid item sm={6} md={4} lg={3}>
            <InputTextField
              placeholder=""
              required={false}
              TitleText={t(translations.JobRecipe.Description)}
              value={description}
              onChange={setDescription}
            />
          </Grid>
          <Grid item sm={6} md={4} lg={3}>
            <CheckboxWrapper>
              <CheckboxComponent
                checked={isDefault}
                onToggle={() => setIsDefault((prev) => !prev)}
                label={t(translations.JobRecipe.Default)}
              />
            </CheckboxWrapper>
          </Grid>
          <Grid item sm={6} md={4} lg={3}>
            <CheckboxWrapper>
              <CheckboxComponent
                checked={isActive}
                onToggle={() => setIsActive((prev) => !prev)}
                label={t(translations.JobRecipe.IsActive)}
              />
            </CheckboxWrapper>
          </Grid>
          <Grid item sm={6} md={4} lg={3}>
            <DateTimePickerComponent
              label={t(translations.TasksManagement.StartDate)}
              onChange={setStartDate}
              date={startDate}
            />
          </Grid>
          <Grid item sm={6} md={4} lg={3}>
            <DateTimePickerComponent
              label={t(translations.JobRecipe.ExpirationDate)}
              onChange={setEndDate}
              date={endDate}
            />
          </Grid>
        </Grid>
      </Wrapper>
      <ButtonsContainer>
        <Button
          label={t(translations.TasksManagement.Cancel)}
          variant="purple-secondary"
          onClick={handleClose}
          width="104px"
          size="md"
        />
        <Button
          label={t(translations.TasksManagement.Save)}
          variant="purple"
          onClick={onSave}
          width="104px"
          size="md"
          disabled={!isValid}
        />
      </ButtonsContainer>
    </CustomPopover>
  );
}
