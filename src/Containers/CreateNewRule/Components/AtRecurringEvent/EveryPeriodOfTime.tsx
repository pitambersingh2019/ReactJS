import React, { useEffect, useState } from "react";
import {
  DeviationBodyContainer,
  DeviationContainer,
  SelectContainer,
  DropDownDeviationContainer,
  SelectPeriodRight,
  SelectPeriodLeft,
  DatePickerContainer,
} from "./styles";

import { translations } from "../../../../locales/translations";
import ModalInfo from "../../../../Component/ModalInfo";
import { useTranslation } from "react-i18next";
import {
  ButtonsContainer,
  DateTitle,
  DoneButton,
  NoteContainer,
} from "../SelectTriggerDate/styles";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import { ChangeActionContainer } from "../SelectAction/styles";
import { CancelEventButton } from "../SelectTriggerStopMachine/styles";
import { SelectTitle } from "../Deviation/styles";
import SingleSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../../../Component/DesignSystem/DropDown/types";
import DatePicker from "../../../../Component/DesignSystem/DatePicker/index";
import {
  DateFormat,
  DateReturned,
  SelectedDate,
} from "../../../../Component/DesignSystem/DatePicker/types";
import moment from "moment-timezone";
import InputTextField from "../../../../Component/DesignSystem/InputText";
import { InputType } from "../../../../utils/React2Ang/designSystem/editableTable/Cells/Components/InputText/types";
import { DropDownDeviationContainerNew } from "../Deviation/styles";

interface EveryPeriodOfTimeProps {
  triggerSelected: string;
  editRow: boolean;
  amountTimeEdit: string;
  timeIntervalEdit: string;
  eventTypeEdit: string;
  eventValueEdit: string;
  handleDoneActionClicked: (
    amountTime: string,
    timeInterval: string,
    eventType: string,
    eventValue: string
  ) => void;
  handleClickCancel: () => void;
  handleClickChangePeriod: () => void;
}

const EveryPeriodOfTime: React.FC<EveryPeriodOfTimeProps> = (props) => {
  const { t } = useTranslation();

  const [showModal, setshowModal] = useState(false);
  const [title_content_modal, setTitle_content_modal] = useState({
    Title: "",
    Content: "",
  });
  const [changeTriggerBtn, setChangeTriggerBtn] = useState(false);
  const [amountTime, setAmountTime] = useState("");
  const [dateClicked, setDateClicked] = useState(false);

  const timeIntervalList = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
          .TIME_INTERVAL_HOURS
      ),
      value: 0,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
          .TIME_INTERVAL_DAYS
      ),
      value: 1,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
          .TIME_INTERVAL_WEEKS
      ),
      value: 2,
    },
    // {
    //   label: t(
    //     translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
    //       .TIME_INTERVAL_MONTHS
    //   ),
    //   value: 3,
    // },
  ];

  const [timeIntervalClicked, setTimeIntervalClicked] = useState(
    timeIntervalList[0].label
  );
  const [timeIntervalValueClicked, setTimeIntervalValueClicked] = useState(
    timeIntervalList[0].value
  );

  const eventTypeList = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
          .SPECIFIC_TIME
      ),
      value: 0,
    },
  ];

  const [eventTypeClicked, setEventTypeClicked] = useState(
    eventTypeList.length === 1 ? eventTypeList[0].label : ""
  );
  const [eventTypeValueClicked, setEventTypeValueClicked] = useState(
    eventTypeList.length === 1 ? eventTypeList[0].value : 0
  );

  const [date, setDate] = useState<SelectedDate>({
    format: DateFormat.DD_MM_YY_HH_MM,
    inputString: moment(new Date()).format("DD/MM/YY HH:mm"),
  });

  const timeIntervalPlaceHolder = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
          .TIME_INTERVAL_PLACEHOLDER
      ),
      value: 0,
    },
  ];

  const eventTypePlaceHolder = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
          .EVENT_TYPE_PLACEHOLDER
      ),
      value: 0,
    },
  ];

  useEffect(() => {
    //if was data then display it
    // to show Change Trigger Button
    if (props.editRow) {
      setChangeTriggerBtn(true);
      setTimeIntervalValueClicked(Number(props.timeIntervalEdit));
      setTimeIntervalClicked(
        timeIntervalList[Number(props.timeIntervalEdit)].label
      );
      setAmountTime(props.amountTimeEdit);
      let date = moment(props.eventValueEdit, "DD/MM/YYYY HH:mm").format(
        "DD/MM/YY HH:mm"
      );
      if (date.includes("Invalid date")) {
        date = moment(props.eventValueEdit, "DD/MM/YYYY hh:mm").format(
          "DD/MM/YY HH:mm"
        );
      }
      setDate((prev) => ({
        ...prev,
        inputString: date,
      }));
      // let durationHour = Math.floor(Number(props.timeIntervalEdit) / 60);
    }
  }, []);

  const handleClickDone = () => {
    console.log("date ", date.inputString);
    console.log("dateClicked ", dateClicked);
    let validation = moment(date.inputString, "DD/MM/YY HH:mm").isValid();
    console.log("validation ", validation);
    const isValidInput = /^[0-9/: ]*$/.test(date.inputString);
    console.log("isValidInput ", isValidInput);
    if (
      timeIntervalClicked !== "" &&
      amountTime !== "" &&
      date.inputString !== "Invalid date" &&
      date.inputString !== "" &&
      validation &&
      isValidInput
    ) {
      let dateFormat = date.inputString;
      //if wasn't clicked date and it wasn't edited then change current date this format
      if (!dateClicked && !props.editRow) {
        dateFormat = moment(new Date()).format("DD/MM/YYYY HH:mm");
      }
      props.handleDoneActionClicked(
        amountTime,
        timeIntervalValueClicked.toString(),
        eventTypeClicked,
        dateFormat
      );
    } else {
      setTitle_content_modal({
        Title: t(translations.RulesContainer.InfoModals.TITLE_MESSAGE6),
        Content: t(translations.RulesContainer.InfoModals.CONTENT_MESSAGE),
      });
      setshowModal(true);
      return;
    }
  };

  // This function is called when the input changes
  //event: React.ChangeEvent<HTMLInputElement>
  const inputTimeHandler = (enterText: string) => {
    // const enterText = event.target.value;
    // const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
    // if (rx_live.test(enterText)) {
    //   console.log("true");
    // }

    if (Number(enterText) > 0 && !enterText.includes(".")) {
      setAmountTime(enterText);
    } else {
      setAmountTime("");
    }
  };

  const handleSelectTimeInterval = (item: string, value: number) => {
    setTimeIntervalClicked(item);
    setTimeIntervalValueClicked(value);
  };

  const handleSelectEventType = (item: string, value: number) => {
    setEventTypeClicked(item);
    setEventTypeValueClicked(value);
  };

  return (
    <DeviationContainer>
      <DateTitle>
        {props.triggerSelected}
        {changeTriggerBtn ? (
          <ChangeActionContainer
            onClick={() => {
              props.handleClickChangePeriod();
            }}
          >
            <ShuffleIcon />
            {t(translations.RulesContainer.CREATE_RULE.CHANGE_TRIGGER)}
          </ChangeActionContainer>
        ) : (
          <></>
        )}
      </DateTitle>
      {
        <DeviationBodyContainer>
          <SelectContainer>
            <SelectPeriodLeft>
              <SelectTitle>
                {t(
                  translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
                    .AMOUNT_OF_TIME
                )}
              </SelectTitle>
              <DropDownDeviationContainerNew>
                <InputTextField
                  placeholder={t(
                    translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
                      .AMOUNT_OF_TIME_PLACEHOLDER
                  )}
                  required={false}
                  TitleText={""}
                  value={amountTime}
                  onChange={inputTimeHandler}
                  maxLength={40}
                  type={InputType.number}
                  disableCopyPaste={true}
                />
              </DropDownDeviationContainerNew>
              {/*<AmountOfTimeInput*/}
              {/*  placeholder={t(*/}
              {/*    translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME*/}
              {/*      .AMOUNT_OF_TIME_PLACEHOLDER*/}
              {/*  )}*/}
              {/*  onKeyPress={(event) => {*/}
              {/*    if (!/[0-9]/.test(event.key)) {*/}
              {/*      event.preventDefault();*/}
              {/*    }*/}
              {/*  }}*/}
              {/*  value={amountTime}*/}
              {/*  onChange={inputTimeHandler}*/}
              {/*  onPaste={(e) => {*/}
              {/*    e.preventDefault();*/}
              {/*    return false;*/}
              {/*  }}*/}
              {/*  onCopy={(e) => {*/}
              {/*    e.preventDefault();*/}
              {/*    return false;*/}
              {/*  }}*/}
              {/*/>*/}
            </SelectPeriodLeft>
            <SelectPeriodRight>
              <SelectTitle>
                {t(
                  translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
                    .TIME_INTERVAL
                )}
              </SelectTitle>
              <DropDownDeviationContainer>
                <SingleSelect
                  placeholder={
                    timeIntervalClicked === ""
                      ? timeIntervalPlaceHolder[0].label
                      : ""
                  }
                  required={false}
                  selectedItem={
                    timeIntervalClicked !== ""
                      ? {
                          label: timeIntervalClicked,
                          value: timeIntervalValueClicked,
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
                      handleSelectTimeInterval(item.label, item.value);
                    } else {
                      setTimeIntervalClicked("");
                      setTimeIntervalValueClicked(0);
                    }
                  }}
                  TitleText={""}
                  items={timeIntervalList}
                  mode={DropDownMode.selectable}
                />
              </DropDownDeviationContainer>
            </SelectPeriodRight>
          </SelectContainer>
          <SelectContainer>
            <SelectPeriodLeft>
              <SelectTitle>
                {t(
                  translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
                    .FROM_EVENT_TYPE
                )}
              </SelectTitle>
              <DropDownDeviationContainer>
                <SingleSelect
                  placeholder={
                    eventTypeClicked === "" ? eventTypePlaceHolder[0].label : ""
                  }
                  required={false}
                  selectedItem={
                    eventTypeClicked !== ""
                      ? {
                          label: eventTypeClicked,
                          value: eventTypeValueClicked,
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
                      handleSelectEventType(item.label, item.value);
                    } else {
                      setEventTypeClicked("");
                      setEventTypeValueClicked(0);
                    }
                  }}
                  TitleText={""}
                  items={eventTypeList}
                  mode={DropDownMode.selectable}
                />
              </DropDownDeviationContainer>
            </SelectPeriodLeft>
            <SelectPeriodRight>
              {eventTypeClicked === eventTypeList[0].label ? (
                <DatePickerContainer>
                  <SelectTitle>
                    {t(
                      translations.RulesContainer.CREATE_RULE
                        .EVERY_PERIOD_OF_TIME.DATE
                    )}
                  </SelectTitle>
                  <DatePicker
                    onDateChange={function (
                      dateobj: DateReturned | string
                    ): void {
                      console.log("date clicked", dateobj);
                      setDateClicked(true);
                      if (typeof dateobj === "object") {
                        setDate((prev) => ({
                          ...prev,
                          inputString: dateobj.dateString,
                        }));
                      } else {
                        setDate((prev) => ({
                          ...prev,
                          inputString: dateobj,
                        }));
                      }
                    }}
                    required={false}
                    selected={date}
                  />
                </DatePickerContainer>
              ) : (
                <></>
              )}
            </SelectPeriodRight>
          </SelectContainer>
        </DeviationBodyContainer>
      }
      <NoteContainer>
        <div></div>
        <ButtonsContainer>
          <CancelEventButton onClick={() => props.handleClickCancel()}>
            {t(translations.RulesContainer.CREATE_RULE.CANCEL)}
          </CancelEventButton>

          <ModalInfo
            TitleText={title_content_modal.Title}
            ContentText={title_content_modal.Content}
            showModal={showModal}
            setshowModal={setshowModal}
          >
            <DoneButton onClick={handleClickDone}>
              {t(translations.RulesContainer.CREATE_RULE.DONE)}
            </DoneButton>
          </ModalInfo>
        </ButtonsContainer>
      </NoteContainer>
    </DeviationContainer>
  );
};

export default EveryPeriodOfTime;
