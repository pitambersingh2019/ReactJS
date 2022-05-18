import React, { useEffect, useState } from "react";
import {
  AddDurationConditionContainer,
  ConditionTitle,
  ConditionDropDownStyle,
  ConditionDropDownContainer,
  ConditionInputContainer,
  ConditionRadioButton,
  ConditionRadioTitle,
  DoneDurationContainer,
} from "./styles";
import { translations } from "../../../../locales/translations";
import { useTranslation } from "react-i18next";
import {
  ButtonsContainer,
  CancelEventButton,
  DoneEventButton,
  EventSelection,
} from "../SelectTriggerStopMachine/styles";
import ModalInfo from "../../../../Component/ModalInfo";
import RadioButton from "../../../../Component/DesignSystem/RadioButton";
import { DropDownMode } from "../../../../Component/DesignSystem/DropDown/types";
import SingleSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import {
  DropDownDeviationContainerNew,
  SelectDeviationLeft,
  SelectDeviationRight,
  SelectTitle,
} from "../Deviation/styles";
import InputTextField from "../../../../Component/DesignSystem/InputText";
import { InputType } from "../../../../utils/React2Ang/designSystem/editableTable/Cells/Components/InputText/types";

interface AddDurationConditionProps {
  conditionSelected: string;
  handleClickCancel: () => void;
  handleDoneAddDurationCondition: (
    amount: string,
    sign: string,
    interval: string
  ) => void;
  radioButton: string;
  inputText: string;
  interval: string;
}

const AddDurationCondition: React.FC<AddDurationConditionProps> = (props) => {
  const { t } = useTranslation();
  const [showModal, setshowModal] = useState(false);
  const [inputTextEdited, setInputTextEdited] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [radioButtonCondition, setRadioButtonCondition] = useState("");
  const [radioButtonClicked, setRadioButtonClicked] = useState(true);

  const intervalType = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.SELECT_INTERVAL.HOURS),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SELECT_INTERVAL.MINUTES),
      value: 1,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SELECT_INTERVAL.SECONDS),
      value: 2,
    },
  ];

  const [timeClicked, setTimeClicked] = useState(intervalType[1].label);
  const [timeClickedValue, setTimeClickedValue] = useState(
    intervalType[1].value
  );
  const timeIntervalPlaceHolder = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
          .TIME_INTERVAL_PLACEHOLDER
      ),
      value: 0,
    },
  ];

  useEffect(() => {
    let minutes = 0;

    //set edit data
    if (props.inputText !== "") {
      setRadioButtonCondition(props.radioButton);

      console.log("props.interval ", props.interval);

      if (props.interval === "Hours") {
        setTimeClicked(intervalType[0].label);
        setTimeClickedValue(intervalType[0].value);
        minutes = Number(props.inputText) / 60;
      } else if (props.interval === "Minutes") {
        setTimeClicked(intervalType[1].label);
        setTimeClickedValue(intervalType[1].value);
        minutes = Number(props.inputText);
      } else if (props.interval === "Seconds") {
        setTimeClicked(intervalType[2].label);
        setTimeClickedValue(intervalType[2].value);
        minutes = Number(props.inputText) * 60;
      }
      //edit from created Card if was null
      else {
        setTimeClicked(intervalType[1].label);
        minutes = Number(props.inputText);
      }

      setInputTextEdited(minutes.toString());

      setSelectedValue(props.radioButton);
      if (props.radioButton === ">") {
        setRadioButtonClicked(true);
      } else {
        setRadioButtonClicked(false);
      }
    }
  }, []);

  const handleAddConditionDropDown = (item: string, value: number) => {
    setTimeClicked(item);
    setTimeClickedValue(value);
  };

  // This function is called when the input changes
  //event: React.ChangeEvent<HTMLInputElement>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.value ", event.target.value);
    const enterText = event.target.value;
    setInputTextEdited(enterText);
  };

  const [selectedValue, setSelectedValue] = React.useState(">");
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value);
  //   setRadioButtonClicked(!radioButtonClicked);
  // };
  const handleRadioClick = (value: string) => {
    setSelectedValue(value);
    setRadioButtonClicked(!radioButtonClicked);
  };

  const handleDone = () => {
    console.log("selectedValue ", selectedValue);

    if (inputTextEdited) {
      let minutes = 0;
      //hour
      if (timeClicked === intervalType[0].label) {
        minutes = Number(inputTextEdited) * 60;
      }
      //minute
      if (timeClicked === intervalType[1].label) {
        minutes = Number(inputTextEdited);
      }
      //seconds
      if (timeClicked === intervalType[2].label) {
        minutes = Number(inputTextEdited) / 60;
      }

      props.handleDoneAddDurationCondition(
        minutes.toString(),
        selectedValue,
        timeClicked
      );
    }
  };

  return (
    <AddDurationConditionContainer>
      <ConditionTitle>{props.conditionSelected}</ConditionTitle>

      <ConditionInputContainer>
        <ConditionRadioButton
          clicked={radioButtonClicked}
          onClick={() => handleRadioClick(">")}
        >
          <RadioButton IsActive={radioButtonClicked}></RadioButton>
          {/*<input*/}
          {/*  style={{ width: "20px", height: "20px" }}*/}
          {/*  type="radio"*/}
          {/*  id="over"*/}
          {/*  name="drone"*/}
          {/*  value=">"*/}
          {/*  checked={radioButtonClicked}*/}
          {/*  onChange={(e) => handleChange(e)}*/}
          {/*/>*/}
          <ConditionRadioTitle>
            {t(translations.RulesContainer.CREATE_RULE.OVER)}
          </ConditionRadioTitle>
        </ConditionRadioButton>

        <ConditionRadioButton
          clicked={!radioButtonClicked}
          onClick={() => handleRadioClick("<")}
        >
          <RadioButton IsActive={!radioButtonClicked}></RadioButton>
          <ConditionRadioTitle>
            {t(translations.RulesContainer.CREATE_RULE.UNDER)}
          </ConditionRadioTitle>
        </ConditionRadioButton>
      </ConditionInputContainer>

      <ConditionDropDownStyle>
        <ConditionDropDownContainer>
          <SelectDeviationLeft>
            <SelectTitle>
              {t(translations.RulesContainer.CREATE_RULE.ADD_CONDITION_AMOUNT)}
            </SelectTitle>
            <DropDownDeviationContainerNew>
              <InputTextField
                placeholder={t(
                  translations.RulesContainer.CREATE_RULE
                    .ADD_CONDITION_AMOUNT_PLACE_HOLDER
                )}
                required={false}
                TitleText={""}
                value={inputTextEdited}
                onChange={setInputTextEdited}
                maxLength={40}
                type={InputType.number}
                disableCopyPaste={true}
              />
            </DropDownDeviationContainerNew>
            {/*<InputAmount*/}
            {/*  placeholder={t(*/}
            {/*    translations.RulesContainer.CREATE_RULE*/}
            {/*      .ADD_CONDITION_AMOUNT_PLACE_HOLDER*/}
            {/*  )}*/}
            {/*  onKeyPress={(event) => {*/}
            {/*    if (!/[0-9]/.test(event.key)) {*/}
            {/*      event.preventDefault();*/}
            {/*    }*/}
            {/*  }}*/}
            {/*  defaultValue={editSubTaskItem}*/}
            {/*  onChange={inputHandler}*/}
            {/*  onPaste={(e) => {*/}
            {/*    e.preventDefault();*/}
            {/*    return false;*/}
            {/*  }}*/}
            {/*  onCopy={(e) => {*/}
            {/*    e.preventDefault();*/}
            {/*    return false;*/}
            {/*  }}*/}
            {/*  type="number"*/}
            {/*/>*/}
          </SelectDeviationLeft>

          <SelectDeviationRight>
            <SelectTitle>
              {t(
                translations.RulesContainer.CREATE_RULE.CONDITION_DURATION_TIME
              )}
            </SelectTitle>
            <DropDownDeviationContainerNew>
              <SingleSelect
                placeholder={
                  timeClicked === "" ? timeIntervalPlaceHolder[0].label : ""
                }
                required={false}
                selectedItem={
                  timeClicked !== ""
                    ? {
                        label: timeClicked,
                        value: timeClickedValue,
                      }
                    : undefined
                }
                onSelect={function (
                  item:
                    | {
                        value: number;
                        label: string;
                      }
                    | undefined
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                ): void {
                  if (item !== undefined) {
                    handleAddConditionDropDown(item.label, item.value);
                  } else {
                    setTimeClicked("");
                    setTimeClickedValue(0);
                  }
                }}
                TitleText={""}
                items={intervalType}
                mode={DropDownMode.selectable}
              />
            </DropDownDeviationContainerNew>
          </SelectDeviationRight>
        </ConditionDropDownContainer>
      </ConditionDropDownStyle>
      <DoneDurationContainer>
        <EventSelection></EventSelection>

        <ButtonsContainer>
          <CancelEventButton onClick={props.handleClickCancel}>
            {t(translations.RulesContainer.CREATE_RULE.CANCEL)}
          </CancelEventButton>

          <ModalInfo
            TitleText={t(
              translations.RulesContainer.InfoModals.TITLE_MACHINE_STOP
            )}
            ContentText={t(
              translations.RulesContainer.InfoModals.CONTENT_MACHINE_STOP
            )}
            showModal={showModal}
            setshowModal={setshowModal}
          >
            <DoneEventButton onClick={() => handleDone()}>
              {t(translations.RulesContainer.CREATE_RULE.DONE)}
            </DoneEventButton>
          </ModalInfo>
        </ButtonsContainer>
      </DoneDurationContainer>
    </AddDurationConditionContainer>
  );
};

export default AddDurationCondition;
