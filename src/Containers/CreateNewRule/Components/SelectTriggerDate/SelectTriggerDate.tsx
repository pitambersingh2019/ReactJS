import React, { useEffect, useState } from "react";
import {
  DateTitle,
  SelectDateContainer,
  TriggerTitleContainer,
  TriggerTitle,
  Week,
  Month,
  Day,
  NoteContainer,
  Note,
  DoneButton,
  ButtonsContainer,
  TriggerTimeContainer,
  DailyBottomContainer,
  MonthForWeek,
} from "./styles";
import DropDown from "../../../../Component/DropDown/DropDown";
import { CancelEventButton } from "../SelectTriggerStopMachine/styles";
import { useSelector } from "../../../../utils/React2Ang/useCustoms";
import { selectRuleData } from "../../slice/index";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";

import ModalInfo from "../../../../Component/ModalInfo";
import { Scroll } from "../../../../Component/MainStyles";
import { ChangeActionContainer } from "../SelectAction/styles";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import DropDownSearchNotFilter from "../../../../Component/DropDownSearchNotFilter/DropDownSearchNotFlilter";
interface SelectTriggerDateProps {
  triggerSelected: string;
  handleClickDone: (
    type: string,
    time: string,
    days: string[],
    weekDays: string[]
  ) => void;
  handleClickCancel: () => void;
  handleClickChangeTrigger: () => void;
}

const SelectTriggerDate: React.FC<SelectTriggerDateProps> = (props) => {
  const { t } = useTranslation();

  const [showModal, setshowModal] = useState(false);
  const data = useSelector(selectRuleData);

  const typeList = [
    {
      label: t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.MONTHLY),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.WEEKLY),
      value: 1,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.DAILY),
      value: 2,
    },
  ];

  let timeList = [{ label: "00:00", value: 0 }];
  const [timeSelected, setTimeSelected] = useState("");
  const [timeValueSelected, setTimeValueSelected] = useState(0);
  const [daysSelected, setDaysSelected] = useState([""]);
  const [weekDaysSelected, setWeekDaysSelected] = useState([""]);
  const [itemSelected, setItemSelected] = useState(false);
  const [changeTriggerBtn, setChangeTriggerBtn] = useState(false);
  const [firstEnter, setFirstEnter] = useState(true);

  useEffect(() => {
    //number of 15 min at 24 hours
    let index = (24 * 60) / 15;
    for (let i = 1; i < index; i++) {
      let timeDisplay = minutesToHm(i * 15).toString();
      timeList.push({ label: timeDisplay, value: i });
    }

    //set current time at time dropDown
    if (firstEnter) {
      let today = new Date();
      /*
      let defaultHour = today.getHours();
      let hurFloor = Math.floor(defaultHour / 10);
      let hours = defaultHour.toString();
      if (hurFloor === 0) {
        hours = "0" + defaultHour;
      }

       */

      //For example if it's 13:05, next time frame that should be displayed is 13:15
      let indexClosestTime = 1;
      let todayTimeSeconds = (today.getHours() * 60 + today.getMinutes()) * 60;
      for (let i = 1; i < index; i++) {
        let checkTimeSeconds = i * 15 * 60;
        //if seconds number less than current seconds number then save until get bigger then it should be the selected time
        if (checkTimeSeconds < todayTimeSeconds) {
          indexClosestTime = i;
        }
      }

      // let time = hours + ":" + "00";

      //set the time one above the saved index
      setTimeSelected(timeList[indexClosestTime + 1].label);
      setFirstEnter(false);
    }

    timeList.forEach((element) => {
      if (element.label === timeSelected) {
        setTimeValueSelected(element.value);
      }
    });

    //if was data at state then display it
    if (
      data.intervalType !== "" &&
      data.intervalType !== undefined &&
      !itemSelected
    ) {
      // to show Change Trigger Button
      setChangeTriggerBtn(true);

      if (data.intervalType === "Monthly") {
        setTypeSelected(typeList[0].label);
      } else if (data.intervalType === "Weekly") {
        setTypeSelected(typeList[1].label);
      } else if (data.intervalType === "Daily") {
        setTypeSelected(typeList[2].label);
      }

      setTimeSelected(data.eventTime);

      //make mutable array
      const days = [...data.triggerDays];
      days.sort((a, b) => a.order - b.order);
      setDaysSelected(days);

      const weekDays = [...data.triggerWeekDays];
      weekDays.sort((a, b) => a.order - b.order);
      setWeekDaysSelected(weekDays);
      setItemSelected(true);
    }
  }, [timeList, data]);

  function minutesToHm(d: number) {
    d = Number(d);
    let h = Math.floor(d / 60);
    let m = Math.floor(d % 60);

    let hDisplay = h > 9 ? h : "0" + h;
    let mDisplay = m === 0 ? "0" + m : m;
    return hDisplay + ":" + mDisplay;
  }

  const [typeSelected, setTypeSelected] = useState(typeList[0].label);

  const handleDropDown = (item: string) => {
    setItemSelected(true);
    setTypeSelected(item);

    //if monthly selected then clean weekDaysSelected array
    if (item === typeList[0].label) {
      setWeekDaysSelected([""]);
    }
    //if weekly selected then clean setDaysSelected array
    else if (item === typeList[1].label) {
      setDaysSelected([""]);
    }
    //if daily selected then clean all day arrays
    else {
      setWeekDaysSelected([""]);
      setDaysSelected([""]);
    }
  };

  const handleTimeDropDown = (item: string, value: number | undefined) => {
    console.log("item ", item);
    setTimeSelected(item);
    if (value !== undefined) {
      setTimeValueSelected(value);
    }
  };

  const RenderMonthly = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemClicked, setItemClicked] = useState("");
    const [flag, setFlag] = useState(false);

    const week1 = [
      { label: "1", value: 0 },
      { label: "2", value: 1 },
      { label: "3", value: 2 },
      { label: "4", value: 3 },
      { label: "5", value: 4 },
      { label: "6", value: 5 },
      { label: "7", value: 6 },
    ];

    const week2 = [
      { label: "8", value: 7 },
      { label: "9", value: 8 },
      { label: "10", value: 9 },
      { label: "11", value: 10 },
      { label: "12", value: 11 },
      { label: "13", value: 12 },
      { label: "14", value: 13 },
    ];

    const week3 = [
      { label: "15", value: 14 },
      { label: "16", value: 15 },
      { label: "17", value: 16 },
      { label: "18", value: 17 },
      { label: "19", value: 18 },
      { label: "20", value: 19 },
      { label: "21", value: 20 },
    ];

    const week4 = [
      { label: "22", value: 21 },
      { label: "23", value: 22 },
      { label: "24", value: 23 },
      { label: "25", value: 24 },
      { label: "26", value: 25 },
      { label: "27", value: 26 },
      { label: "28", value: 27 },
    ];

    const week5 = [
      { label: "29", value: 28 },
      { label: "30", value: 29 },
      { label: "31", value: 30 },
    ];

    const daySelectedHandle = (day: string) => {
      setItemClicked(day);
      if (daysSelected.includes(day)) {
        let index = daysSelected.indexOf(day);
        if (index !== -1) {
          daysSelected.splice(index, 1);
          setItemClicked("");
          setFlag(true);
        }
      } else {
        daysSelected.push(day);
      }

      setDaysSelected(daysSelected);
      //to render again when click day was selected
      if (flag) {
        setFlag(false);
      }
    };

    return (
      <Month>
        <Week>
          {week1.map((option: { label: string; value: number }) => (
            <Day
              key={option.value}
              clicked={daysSelected.includes(option.label)}
              onClick={() => daySelectedHandle(option.label)}
            >
              {option.label}
            </Day>
          ))}
        </Week>
        <Week>
          {week2.map((option: { label: string; value: number }) => (
            <Day
              key={option.value}
              clicked={daysSelected.includes(option.label)}
              onClick={() => daySelectedHandle(option.label)}
            >
              {option.label}
            </Day>
          ))}
        </Week>
        <Week>
          {week3.map((option: { label: string; value: number }) => (
            <Day
              key={option.value}
              clicked={daysSelected.includes(option.label)}
              onClick={() => daySelectedHandle(option.label)}
            >
              {option.label}
            </Day>
          ))}
        </Week>
        <Week>
          {week4.map((option: { label: string; value: number }) => (
            <Day
              key={option.value}
              clicked={daysSelected.includes(option.label)}
              onClick={() => daySelectedHandle(option.label)}
            >
              {option.label}
            </Day>
          ))}
        </Week>
        <Week>
          {week5.map((option: { label: string; value: number }) => (
            <Day
              key={option.value}
              clicked={daysSelected.includes(option.label)}
              onClick={() => daySelectedHandle(option.label)}
            >
              {option.label}
            </Day>
          ))}
        </Week>
      </Month>
    );
  };

  const RenderWeekly = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemClicked, setItemClicked] = useState("");
    const [flag, setFlag] = useState(false);

    const week = [
      { label: t(translations.RulesContainer.CREATE_RULE.SUN), value: 0 },
      { label: t(translations.RulesContainer.CREATE_RULE.MON), value: 1 },
      { label: t(translations.RulesContainer.CREATE_RULE.TUE), value: 2 },
      { label: t(translations.RulesContainer.CREATE_RULE.WED), value: 3 },
      { label: t(translations.RulesContainer.CREATE_RULE.THU), value: 4 },
      { label: t(translations.RulesContainer.CREATE_RULE.FRI), value: 5 },
      { label: t(translations.RulesContainer.CREATE_RULE.SAT), value: 6 },
    ];

    const daySelectedHandle = (day: string) => {
      setItemClicked(day);
      if (weekDaysSelected.includes(day)) {
        let index = weekDaysSelected.indexOf(day);
        if (index !== -1) {
          weekDaysSelected.splice(index, 1);
          setItemClicked("");
          setFlag(true);
        }
      } else {
        weekDaysSelected.push(day);
      }

      setWeekDaysSelected(weekDaysSelected);
      //to render again when click day was selected
      if (flag) {
        setFlag(false);
      }
    };

    return (
      <MonthForWeek>
        <Week>
          {week.map((option: { label: string; value: number }) => (
            <Day
              key={option.value}
              clicked={weekDaysSelected.includes(option.value.toString())}
              onClick={() => daySelectedHandle(option.value.toString())}
            >
              {option.label}
            </Day>
          ))}
        </Week>
      </MonthForWeek>
    );
  };

  const handleDone = () => {
    //remove empty first item '' from array
    if (daysSelected[0] === "") {
      daysSelected.splice(0, 1);
    }

    //remove empty first item '' from array
    if (weekDaysSelected[0] === "") {
      weekDaysSelected.splice(0, 1);
    }

    let timeSelectedFormat = "";
    if (timeSelected.includes(":")) {
      let timeSelectedSplit = timeSelected.split(":");
      let hurFloor = Math.floor(Number(timeSelectedSplit[0]) / 10);
      let hours = timeSelectedSplit[0];
      if (hurFloor === 0) {
        if (timeSelectedSplit[0].length < 2) {
          hours = "0" + timeSelectedSplit[0];
        } else {
          hours = timeSelectedSplit[0];
        }
      }
      let minFloor = Math.floor(Number(timeSelectedSplit[1]) / 10);
      console.log("timeSelected ", timeSelected);
      console.log("timeSelectedSplit[1] ", timeSelectedSplit[1]);
      console.log("minFloor ", minFloor);
      console.log("timeSelectedSplit[1].length ", timeSelectedSplit[1].length);
      let minuts = timeSelectedSplit[1].toString();
      if (minFloor === 0) {
        if (timeSelectedSplit[1].length < 2) {
          minuts = "0" + timeSelectedSplit[1];
        } else {
          minuts = timeSelectedSplit[1];
        }
      }
      timeSelectedFormat = hours + ":" + minuts;
    }

    console.log("timeSelectedFormat ", timeSelectedFormat);

    //enable click done only when select days at monthly
    if (daysSelected.length >= 1 && typeSelected === typeList[0].label) {
      props.handleClickDone(
        typeSelected,
        timeSelectedFormat,
        daysSelected,
        weekDaysSelected
      );
    }
    //enable click done only when select days at weekly
    else if (
      weekDaysSelected.length >= 1 &&
      typeSelected === typeList[1].label
    ) {
      props.handleClickDone(
        typeSelected,
        timeSelectedFormat,
        daysSelected,
        weekDaysSelected
      );
    }
    //enable click done when type is daily
    else if (typeSelected === typeList[2].label) {
      props.handleClickDone(
        typeSelected,
        timeSelectedFormat,
        daysSelected,
        weekDaysSelected
      );
    } else {
      setshowModal(true);
    }
  };

  return (
    <SelectDateContainer>
      <DateTitle>
        {props.triggerSelected}
        {changeTriggerBtn ? (
          <ChangeActionContainer
            onClick={() => {
              props.handleClickChangeTrigger();
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
        <Scroll>
          {/*<TriggerTitleContainer>*/}
          {/*    <TriggerTitle>*/}
          {/*        {t(translations.RulesContainer.CREATE_RULE.SELECTED_TRIGGER)}*/}
          {/*    </TriggerTitle>*/}
          {/*    <TriggerSelectedBox>*/}
          {/*        {props.triggerSelected}*/}
          {/*    </TriggerSelectedBox>*/}
          {/*</TriggerTitleContainer>*/}
          <TriggerTitleContainer>
            <TriggerTitle>
              {t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.INTERVAL)}
            </TriggerTitle>

            <DropDown
              id={"Interval type"}
              data={typeList}
              marginTop={0}
              marginRight={0}
              marginBottom={0}
              marginLeft={0}
              width={356}
              height={40}
              top={38}
              itemSelected={typeSelected}
              disableShadow={true}
              nonPaddingTop={true}
              nonPaddingBottom={true}
              dropDownScrolling={"false"}
              handleSelectItem={(getItemSelected: string) =>
                handleDropDown(getItemSelected)
              }
            />
          </TriggerTitleContainer>

          <TriggerTimeContainer>
            <TriggerTitle>
              {t(
                translations.RulesContainer.CREATE_RULE.SELECT_SCHED.EVERY_DATE
              )}{" "}
              {typeSelected === typeList[0].label
                ? t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.MONTH)
                : typeSelected === typeList[1].label
                ? t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.WEEK)
                : t(
                    translations.RulesContainer.CREATE_RULE.SELECT_SCHED.DAY
                  )}{" "}
              {t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.AT)}
            </TriggerTitle>

            <DropDownSearchNotFilter
              id={"Time"}
              data={timeList}
              handleItemClicked={(label, value) => {
                if (label !== undefined) {
                  handleTimeDropDown(label, value);
                } else {
                  //setTimeSelected("");
                  // setTimeValueSelected(0);
                  console.log("label ", label);
                  console.log("value ", value);
                }
              }}
              selected={{ label: timeSelected, value: timeValueSelected }}
              PlaceHolder={""}
              marginTop={15}
              marginRight={16}
              marginLeft={15}
              width={104}
              height={38}
            />
            {typeSelected === typeList[2].label ? (
              <></>
            ) : (
              <TriggerTitle>
                {t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.ON)}
              </TriggerTitle>
            )}
          </TriggerTimeContainer>

          <div>
            {typeSelected === typeList[0].label ? (
              <RenderMonthly />
            ) : (
              <div>
                {typeSelected === typeList[1].label ? (
                  <RenderWeekly />
                ) : (
                  <DailyBottomContainer></DailyBottomContainer>
                )}
              </div>
            )}
          </div>
        </Scroll>
      }
      <NoteContainer>
        <div>
          {typeSelected === typeList[0].label ? (
            <Note>
              {t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.NOTE)}
            </Note>
          ) : (
            <div></div>
          )}
        </div>

        <ButtonsContainer>
          <CancelEventButton onClick={props.handleClickCancel}>
            {t(translations.RulesContainer.CREATE_RULE.CANCEL)}
          </CancelEventButton>
          <ModalInfo
            TitleText={t(
              translations.RulesContainer.InfoModals.TITLE_SELECT_TIME
            )}
            ContentText={t(
              translations.RulesContainer.InfoModals.CONTENT_SELECT_TIME
            )}
            showModal={showModal}
            setshowModal={setshowModal}
          >
            <DoneButton onClick={() => handleDone()}>
              {t(translations.RulesContainer.CREATE_RULE.DONE)}
            </DoneButton>
          </ModalInfo>
        </ButtonsContainer>
      </NoteContainer>
    </SelectDateContainer>
  );
};

export default SelectTriggerDate;
