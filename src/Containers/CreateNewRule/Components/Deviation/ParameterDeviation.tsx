import React, { useEffect, useState } from "react";
import {
  DeviationBodyContainer,
  DeviationContainer,
  SelectContainer,
  DropDownDeviationContainerNew,
  SelectDeviationRight,
  SelectDeviationLeft,
  Info,
  InfoRecommend,
  InfoContainer,
  ContainerMinimal,
  SelectTitle,
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
import SingleSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../../../Component/DesignSystem/DropDown/types";
import { RulesContainerSlice } from "../../../RuleContainer/slice/types";
import { useSelector } from "react-redux";
import {
  selectAllDepartmentMachine,
  selectParametersMachine,
} from "../../../RuleContainer/slice/selectors";
import { Scroll } from "../../../../Component/MainStyles";
import {
  SelectPeriodLeft,
  SelectPeriodRight,
} from "../AtRecurringEvent/styles";
import InputTextField from "../../../../Component/DesignSystem/InputText";
import { InputType } from "../../../../utils/React2Ang/designSystem/editableTable/Cells/Components/InputText/types";

interface ParameterDeviationProps {
  triggerSelected: string;
  addAnotherOne: boolean;
  editRow: boolean;
  machineIDEdit: string;
  parameterIDEdit: string;
  timeIntervalEdit: string;
  timeElapsedEdit: string;
  handleDoneActionClicked: (
    machineID: string,
    parameterID: string,
    machine: string,
    parameter: string,
    timeInterval: string,
    timeElapsed: string
  ) => void;
  handleClickCancel: () => void;
  handleClickChangeDeviation: () => void;
}

const ParameterDeviation: React.FC<ParameterDeviationProps> = (props) => {
  const { t } = useTranslation();

  const [showModal, setshowModal] = useState(false);
  const [title_content_modal, setTitle_content_modal] = useState({
    Title: "",
    Content: "",
  });
  const [changeTriggerBtn, setChangeTriggerBtn] = useState(false);
  const [estimatedHour, setEstimatedHour] = useState("");
  let [machineClicked, setMachineClicked] = useState("");
  let [machineName, setMachineName] = useState("");
  const [machineValueClicked, setMachineValueClicked] = useState(0);
  let [parameterClicked, setParameterClicked] = useState("");
  const [parameterValueClicked, setParameterValueClicked] = useState(0);
  const [elapsedHour, setElapsedHour] = useState("");

  //const data = useSelector(selectRuleData);
  const groups: RulesContainerSlice["DepartmentMachine"] = useSelector(
    selectAllDepartmentMachine
  );
  //: RulesContainerSlice["ParametersMachine"]
  const parametersMachines = useSelector(selectParametersMachine);
  // const dispatch = useDispatch();

  const [dataDepartments, setDataDepartments]: any = useState([]);
  const [machineList, setMachineList] = useState([{ label: "", value: 0 }]);
  const [departmentMachine, setDepartmentMachine] = useState([
    { label: "", value: 0 },
  ]);
  const [parametersMachineList, setParametersMachineList]: any = useState([]);
  let [userParameterList, setUserParameterList] = useState([
    { label: "", value: 0 },
  ]);

  const deviationListPlaceHolder = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE
          .SELECT_DEVIATION_MACHINE_PLACEHOLDER
      ),
      value: 0,
    },
  ];

  const deviationParameterPlaceHolder = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE
          .SELECT_DEVIATION_PARAMETER_PLACEHOLDER
      ),
      value: 0,
    },
  ];

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

  const [minimalIntervalClicked, setMinimalIntervalClicked] = useState(
    timeIntervalList[0].label
  );
  const [minimalIntervalValueClicked, setMinimalIntervalValueClicked] =
    useState(timeIntervalList[0].value);

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
    //if was data then display it
    if (!props.addAnotherOne) {
      // to show Change Trigger Button
      // setChangeTriggerBtn(true);
      // setMachineValueClicked(Number(data.machineIDDeviation));
      // setParameterValueClicked(Number(data.parameterIDDeviation));
      //
      // let durationHour = Math.floor(Number(data.timeIntervalDeviation) / 60);
      // setEstimatedHour(durationHour.toString());
      // let durationMin = Number(data.timeIntervalDeviation) - durationHour * 60;
      // setEstimatedMinutes(durationMin.toString());
      //
      // let elapsedHour = Math.floor(Number(data.timeElapsedDeviation) / 60);
      // setElapsedHour(elapsedHour.toString());
      // let elapsedMin = Number(data.timeElapsedDeviation) - elapsedHour * 60;
      // setElapsedMinutes(elapsedMin.toString());
    }
    //if was edit then display data
    else if (props.editRow) {
      // to show Change Trigger Button
      setChangeTriggerBtn(true);
      setMachineValueClicked(Number(props.machineIDEdit));
      setParameterValueClicked(Number(props.parameterIDEdit));

      setEstimatedHour(props.timeIntervalEdit);
      setElapsedHour(props.timeElapsedEdit);
    }
  }, []);

  useEffect(() => {
    let index = 9999;
    const data: any = [];
    groups.data.DepartmentMachine?.forEach((elem) => {
      const subOptions: any[] = [];
      elem.Value.forEach((elem2) => {
        subOptions.push({
          id: elem2.Id,
          name: elem2.MachineLName,
          subOptions: [],
        });
      });
      data.push({
        id: index,
        name: elem.Key.EName,
        subOptions: subOptions,
      });
      index += 1;
    });
    setDataDepartments(data);
    data?.forEach(
      (departments: { id: number; name: string; subOptions: any[] }) => {
        departments.subOptions.forEach((department: any) => {
          departmentMachine.push({
            label: department.name,
            value: department.id,
          });
        });
      }
    );
    //remove empty first item '' from array
    if (departmentMachine[0]?.label === "") {
      departmentMachine.splice(0, 1);
    }
    setDepartmentMachine(departmentMachine);
    console.log("machineList 2");
  }, [groups.data.DepartmentMachine]);

  useEffect(() => {
    if (departmentMachine.length > 0) {
      // to show list data
      setMachineList(departmentMachine);
      //if was data then display it
      if (!props.addAnotherOne) {
        /*
        const machineIDDeviation = Number(data.machineIDDeviation);
        userList.forEach((element) => {
          if (element.value === machineIDDeviation) {
            setMachineName(element.label);
            setMachineClicked(element.label);
            console.log("element machineList", element);
          }
        });

        // dataDepartments?.forEach(
        //   (departments: { id: number; name: string; subOptions: any[] }) => {
        //     departments.subOptions.forEach((department: any) => {
        //       if (machineIDDeviation === department.id) {
        //         console.log("department ", departments.name);
        //         setMachineClicked(departments.name + ": " + machineNameEdit);
        //       }
        //     });
        //   }
        // );

        Object.keys(
          parametersMachines.data.ResponseDictionaryValues ?? {}
        ).forEach((key) => {
          const array = parametersMachines?.data?.ResponseDictionaryValues[key];
          (array || []).forEach((element: any) => {
            if (element.id === Number(data.parameterIDDeviation)) {
              setParameterClicked(element.name);
            }
          });
        });

         */
      }
      //if was edit then display data
      else if (props.editRow) {
        const machineIDDeviation = Number(props.machineIDEdit);
        departmentMachine.forEach((element) => {
          if (element.value === machineIDDeviation) {
            setMachineName(element.label);
            setMachineClicked(element.label);
            console.log("element machineList", element);
          }
        });

        Object.keys(
          parametersMachines.data.ResponseDictionaryValues ?? {}
        ).forEach((key) => {
          const array = parametersMachines?.data?.ResponseDictionaryValues[key];
          (array || []).forEach((element: any) => {
            if (element.id === Number(props.parameterIDEdit)) {
              setParameterClicked(element.name);
            }
          });
        });

        console.log("parametersMachineList ", parametersMachineList);
        getParameterMachine();
      }
    }
  }, []);

  const getParameterMachine = () => {
    //reset array
    userParameterList = [{ label: "", value: 0 }];

    Object.keys(parametersMachines.data.ResponseDictionaryValues ?? {}).forEach(
      (key) => {
        // console.log(`${key} :`);
        const array = parametersMachines?.data?.ResponseDictionaryValues[key];
        (array || []).forEach((element: any) => {
          if (element.machineid === Number(props.machineIDEdit)) {
            //console.log("element ", element);
            userParameterList.push({
              label: element.name,
              value: element.id,
            });
          }
        });
        //remove empty first item '' from array
        if (userParameterList[0]?.label === "") {
          userParameterList.splice(0, 1);
        }
        setUserParameterList(userParameterList);
        setParametersMachineList(userParameterList);
      }
    );
    if (userParameterList.length > 0) {
      // to show list data
      setParametersMachineList(userParameterList);
    }
  };

  useEffect(() => {
    if (userParameterList.length > 1) {
      // to show list data
      setParametersMachineList(userParameterList);
    }
  }, []);

  const handleClickDone = () => {
    console.log("EstimatedHour ", estimatedHour);
    if (machineClicked !== "" && parameterClicked !== "") {
      let deviationDuration = 0;
      if (timeIntervalValueClicked === 0) {
        deviationDuration = Number(estimatedHour);
      } else if (timeIntervalValueClicked === 1) {
        deviationDuration = Number(estimatedHour) * 24;
      } else if (timeIntervalValueClicked === 2) {
        deviationDuration = Number(estimatedHour) * 168;
      }

      let deviationElapesd = 0;
      if (minimalIntervalValueClicked === 0) {
        deviationElapesd = Number(elapsedHour);
      } else if (minimalIntervalValueClicked === 1) {
        deviationElapesd = Number(elapsedHour) * 24;
      } else if (minimalIntervalValueClicked === 2) {
        deviationElapesd = Number(elapsedHour) * 168;
      }
      props.handleDoneActionClicked(
        machineValueClicked.toString(),
        parameterValueClicked.toString(),
        machineName,
        parameterClicked,
        deviationDuration.toString(),
        deviationElapesd.toString()
      );
    } else {
      setTitle_content_modal({
        Title: t(translations.RulesContainer.InfoModals.TITLE_MESSAGE5),
        Content: t(translations.RulesContainer.InfoModals.CONTENT_MESSAGE),
      });
      setshowModal(true);
      return;
    }
  };

  // This function is called when the input changes
  //event: React.ChangeEvent<HTMLInputElement>
  const inputEstimatedHandler = (enterText: string) => {
    // const enterText = event.target.value;
    //if (Number(enterText) < 25) {
    setEstimatedHour(enterText);
    //}
  };

  // // This function is called when the input changes
  // const inputEstimatedMinutesHandler = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const enterText = event.target.value;
  //   if (Number(enterText) < 61) {
  //     setEstimatedMinutes(enterText);
  //   }
  // };

  // This function is called when the input changes
  //event: React.ChangeEvent<HTMLInputElement>
  const inputElapsedHandler = (enterText: string) => {
    //const enterText = event.target.value;
    // if (Number(enterText) < 25) {
    setElapsedHour(enterText);
    // }
  };

  // // This function is called when the input changes
  // const inputElapsedMinutesHandler = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const enterText = event.target.value;
  //   if (Number(enterText) < 61) {
  //     setElapsedMinutes(enterText);
  //   }
  // };

  const handleSelectMachine = (item: string, value: number) => {
    console.log("item ", item);
    console.log("value ", value);
    dataDepartments?.forEach(
      (departments: { id: number; name: string; subOptions: any[] }) => {
        departments.subOptions.forEach((department: any) => {
          if (item === department.name) {
            console.log("department ", departments.name);
            setMachineClicked(departments.name + ": " + item);
            setMachineName(item);
          }
        });
      }
    );
    setMachineValueClicked(value);
    //reset array
    userParameterList = [{ label: "", value: 0 }];
    //reset parameters
    setParameterClicked("");
    setParameterValueClicked(0);

    Object.keys(parametersMachines.data.ResponseDictionaryValues ?? {}).forEach(
      (key) => {
        console.log(`${key} :`);
        const array = parametersMachines?.data?.ResponseDictionaryValues[key];
        (array || []).forEach((element: any) => {
          if (element.machineid === value) {
            console.log("element ", element);
            userParameterList.push({
              label: element.name,
              value: element.id,
            });
          }
        });
        //remove empty first item '' from array
        if (userParameterList[0]?.label === "") {
          userParameterList.splice(0, 1);
        }
        setUserParameterList(userParameterList);
        setParametersMachineList(userParameterList);
      }
    );
    if (userParameterList.length > 0) {
      // to show list data
      setParametersMachineList(userParameterList);
    }
    console.log("userParameterList.length ", userParameterList.length);
  };

  const handleSelectParameter = (item: string, value: number) => {
    console.log("item Parameter ", item);
    console.log("value Parameter ", value);
    //if (item !== "" && value !== 0) {
    setParameterClicked(item);
    setParameterValueClicked(value);
    //}
  };

  const handleSelectTimeInterval = (item: string, value: number) => {
    setTimeIntervalClicked(item);
    setTimeIntervalValueClicked(value);
  };

  const handleSelectMinimalInterval = (item: string, value: number) => {
    setMinimalIntervalClicked(item);
    setMinimalIntervalValueClicked(value);
  };

  return (
    <DeviationContainer>
      <DateTitle>
        {props.triggerSelected}
        {changeTriggerBtn ? (
          <ChangeActionContainer
            onClick={() => {
              props.handleClickChangeDeviation();
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
          <DeviationBodyContainer>
            <SelectContainer>
              <SelectDeviationLeft>
                <SelectTitle>
                  {t(
                    translations.RulesContainer.CREATE_RULE
                      .SELECT_DEVIATION_MACHINE
                  )}
                </SelectTitle>
                <DropDownDeviationContainerNew>
                  <SingleSelect
                    placeholder={
                      machineClicked === ""
                        ? deviationListPlaceHolder[0].label
                        : ""
                    }
                    required={false}
                    selectedItem={
                      machineClicked !== ""
                        ? {
                            label: machineClicked,
                            value: machineValueClicked,
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
                        handleSelectMachine(item.label, item.value);
                      } else {
                        console.log("clicked same ");
                        setMachineClicked("");
                        setMachineValueClicked(0);
                        //reset array
                        userParameterList = [{ label: "", value: 0 }];
                        setUserParameterList(userParameterList);
                        setParametersMachineList([]);
                        //reset parameters
                        setParameterClicked("");
                        setParameterValueClicked(0);
                      }
                    }}
                    TitleText={""}
                    items={machineList}
                    mode={DropDownMode.selectable}
                  />
                </DropDownDeviationContainerNew>
              </SelectDeviationLeft>
              <SelectDeviationRight>
                <SelectTitle>
                  {t(
                    translations.RulesContainer.CREATE_RULE
                      .SELECT_DEVIATION_PARAMETER
                  )}
                </SelectTitle>
                <DropDownDeviationContainerNew>
                  <SingleSelect
                    placeholder={
                      parameterClicked === ""
                        ? deviationParameterPlaceHolder[0].label
                        : ""
                    }
                    required={false}
                    selectedItem={
                      parameterClicked !== ""
                        ? {
                            label: parameterClicked,
                            value: parameterValueClicked,
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
                        handleSelectParameter(item.label, item.value);
                      } else {
                        setParameterClicked("");
                        setParameterValueClicked(0);
                      }
                    }}
                    TitleText={""}
                    items={parametersMachineList}
                    mode={DropDownMode.selectable}
                  />
                </DropDownDeviationContainerNew>
              </SelectDeviationRight>
            </SelectContainer>
            <InfoContainer>
              <Info>
                {t(translations.RulesContainer.CREATE_RULE.DEVIATION_INFO)}
              </Info>
              <InfoRecommend>
                {t(
                  translations.RulesContainer.CREATE_RULE
                    .DEVIATION_INFO_RECOMMEND
                )}
              </InfoRecommend>
            </InfoContainer>
            <SelectContainer>
              <SelectPeriodLeft>
                <SelectTitle>
                  {t(
                    translations.RulesContainer.CREATE_RULE.DEVIATION_PERSISTS
                  )}
                </SelectTitle>
                <DropDownDeviationContainerNew>
                  <InputTextField
                    placeholder={t(
                      translations.RulesContainer.CREATE_RULE
                        .DEVIATION_TRIGGER_PLACEHOLDER
                    )}
                    required={false}
                    TitleText={""}
                    value={estimatedHour}
                    onChange={inputEstimatedHandler}
                    maxLength={40}
                    type={InputType.number}
                    disableCopyPaste={true}
                  />
                </DropDownDeviationContainerNew>
                {/*<AmountOfTimeInput*/}
                {/*  placeholder={t(*/}
                {/*    translations.RulesContainer.CREATE_RULE*/}
                {/*      .DEVIATION_TRIGGER_PLACEHOLDER*/}
                {/*  )}*/}
                {/*  onKeyPress={(event) => {*/}
                {/*    if (!/[0-9]/.test(event.key)) {*/}
                {/*      event.preventDefault();*/}
                {/*    }*/}
                {/*  }}*/}
                {/*  value={estimatedHour}*/}
                {/*  onChange={inputEstimatedHandler}*/}
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
                <DropDownDeviationContainerNew>
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
                </DropDownDeviationContainerNew>
              </SelectPeriodRight>
            </SelectContainer>
            <ContainerMinimal>
              <SelectContainer>
                <SelectPeriodLeft>
                  <SelectTitle>
                    {t(
                      translations.RulesContainer.CREATE_RULE.DEVIATION_MINIMAL
                    )}
                  </SelectTitle>
                  <DropDownDeviationContainerNew>
                    <InputTextField
                      placeholder={t(
                        translations.RulesContainer.CREATE_RULE
                          .DEVIATION_TRIGGER_PLACEHOLDER
                      )}
                      required={false}
                      TitleText={""}
                      value={elapsedHour}
                      onChange={inputElapsedHandler}
                      maxLength={40}
                      type={InputType.number}
                      disableCopyPaste={true}
                    />
                  </DropDownDeviationContainerNew>
                  {/*<AmountOfTimeInput*/}
                  {/*  placeholder={t(*/}
                  {/*    translations.RulesContainer.CREATE_RULE*/}
                  {/*      .DEVIATION_TRIGGER_PLACEHOLDER*/}
                  {/*  )}*/}
                  {/*  onKeyPress={(event) => {*/}
                  {/*    if (!/[0-9]/.test(event.key)) {*/}
                  {/*      event.preventDefault();*/}
                  {/*    }*/}
                  {/*  }}*/}
                  {/*  value={elapsedHour}*/}
                  {/*  onChange={inputElapsedHandler}*/}
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
                      translations.RulesContainer.CREATE_RULE
                        .EVERY_PERIOD_OF_TIME.TIME_INTERVAL
                    )}
                  </SelectTitle>
                  <DropDownDeviationContainerNew>
                    <SingleSelect
                      placeholder={
                        minimalIntervalClicked === ""
                          ? timeIntervalPlaceHolder[0].label
                          : ""
                      }
                      required={false}
                      selectedItem={
                        minimalIntervalClicked !== ""
                          ? {
                              label: minimalIntervalClicked,
                              value: minimalIntervalValueClicked,
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
                          handleSelectMinimalInterval(item.label, item.value);
                        } else {
                          setMinimalIntervalClicked("");
                          setMinimalIntervalValueClicked(0);
                        }
                      }}
                      TitleText={""}
                      items={timeIntervalList}
                      mode={DropDownMode.selectable}
                    />
                  </DropDownDeviationContainerNew>
                </SelectPeriodRight>
              </SelectContainer>
            </ContainerMinimal>
          </DeviationBodyContainer>
        </Scroll>
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

export default ParameterDeviation;
