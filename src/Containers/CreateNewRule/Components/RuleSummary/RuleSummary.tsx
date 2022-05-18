import React, { useEffect, useState } from "react";
import {
  SummaryContainer,
  SummaryRuleContainer,
  SummaryTitle,
  SwitchContainer,
  SwitchTitle,
  Title,
  SubTitle,
  LineRule,
  Line,
  GroupRowContainer,
  AndText,
  LineContainer,
  SeeMoreContainer,
} from "./styles";
import ToggleSwitch from "../../../../Component/Switch/Swtich";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import {
  GroupMessage,
  NewRuleInterface,
  selectRuleData,
  SET_CARD_ACTIVE,
} from "../../slice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import {
  EventsAndGroup,
  ResponseEditCard,
  RulesContainerSlice,
} from "../../../RuleContainer/slice/types";
import {
  selectAllDepartmentMachine,
  selectEditData,
  selectEventReasons,
  selectParametersMachine,
} from "../../../RuleContainer/slice/selectors";

interface RuleSummaryProps {
  //if trigger was true then scheduled time trigger was select, if false then stop machine was selected
  trigger: boolean;
  causeStop: string;
  typeSelected: string;
  timeSelected: string;
  daysSelected: string[];
  weekDaysSelected: string[];
  actionTitle: string;
  actionSubTitle: string;
  handleEditClicked: (selectAction: boolean) => void;
  cardIsActive: boolean;
  handleEditCondition: (name: string) => void;
}

const RuleSummary: React.FC<RuleSummaryProps> = (props) => {
  const [checked, setChecked] = useState(true);
  const [type, setType] = useState("");
  const parametersMachines = useSelector(selectParametersMachine);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data: NewRuleInterface = useSelector(selectRuleData);
  const newEditData: { loading: boolean; data: ResponseEditCard } =
    useSelector(selectEditData);

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

  //convert week days to full words
  const weekDays: string[] = [];
  let weekDaysCut: string[] = [];
  let weekDaysFormat = "";
  if (props.weekDaysSelected.length !== 0) {
    weekDaysCut = props.weekDaysSelected;
    weekDaysCut.forEach((day) => {
      if (day === "0") {
        weekDays.push(
          `${t(translations.RulesContainer.CREATE_RULE.ScehduleRow.SUNDAY)}, `
        );
      } else if (day === "1") {
        weekDays.push(
          `${t(translations.RulesContainer.CREATE_RULE.ScehduleRow.MONDAY)}, `
        );
      } else if (day === "2") {
        weekDays.push(
          `${t(translations.RulesContainer.CREATE_RULE.ScehduleRow.TUESDAY)}, `
        );
      } else if (day === "3") {
        weekDays.push(
          `${t(
            translations.RulesContainer.CREATE_RULE.ScehduleRow.WEDNESDAY
          )}, `
        );
      } else if (day === "4") {
        weekDays.push(
          `${t(translations.RulesContainer.CREATE_RULE.ScehduleRow.THURSDAY)}, `
        );
      } else if (day === "5") {
        weekDays.push(
          `${t(translations.RulesContainer.CREATE_RULE.ScehduleRow.FRIDAY)}, `
        );
      } else if (day === "6") {
        weekDays.push(
          `${t(translations.RulesContainer.CREATE_RULE.ScehduleRow.SATURDAY)}, `
        );
      }
    });
    weekDaysFormat = weekDays.join("");

    weekDaysFormat =
      weekDaysFormat.substring(0, weekDaysFormat.length - 2) + ".";
    console.log("newArray ", weekDaysFormat);
  }

  const [conditionsRedux, setConditionsRedux] = useState<
    {
      Name: string;
      Sign: string;
      Value: string;
      FieldType: string;
      Condition: string;
      DisplayOrder: number;
      Interval: string;
      MachineID: number;
      ParameterID: number[];
      TimeInterval: number;
    }[]
  >([]);

  const [conditionsDeviation, setConditionsDeviation] = useState<
    {
      Machine: string;
      Parameter: string[];
    }[]
  >([]);

  const [deviation, setDeviation] = useState(false);

  const events_data: RulesContainerSlice["EventsReasons"] =
    useSelector(selectEventReasons);
  const getKeyValue =
    <U extends keyof T, T extends object>(key: U) =>
    (obj: T) =>
      obj[key];
  let key: keyof EventsAndGroup = "EName";

  const reasonsList: any[] = [];
  const [causeGroupList, setCauseGroupList] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(true);
  const groups: RulesContainerSlice["DepartmentMachine"] = useSelector(
    selectAllDepartmentMachine
  );
  const [machineNamesCondition, setMachineNamesCondition] = useState<string[]>(
    []
  );
  const [departmentMachine, setDepartmentMachine] = useState([
    { label: "", value: 0 },
  ]);

  const [conditionType, setConditionType] = useState(0);
  useEffect(() => {
    if (newEditData.loading) {
      //if there is data card, it's Edit card then show summary
      if (newEditData.data.ResponseList) {
        if (newEditData.data.ResponseList[0].TriggerCondition !== undefined) {
          setConditionType(
            newEditData.data.ResponseList[0].TriggerCondition[0].ConditionType
          );
        }
      }
    }
  }, [newEditData.data, newEditData.loading]);

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
  }, [groups.data.DepartmentMachine]);

  useEffect(() => {
    if (props.typeSelected === "Monthly") {
      setType(
        t(
          translations.RulesContainer.CREATE_RULE.SELECT_SCHED.MONTH
        ).toLocaleLowerCase()
      );
    } else if (props.typeSelected === "Weekly") {
      setType(
        t(
          translations.RulesContainer.CREATE_RULE.SELECT_SCHED.WEEK
        ).toLocaleLowerCase()
      );
    } else if (props.typeSelected === "Daily") {
      setType(
        t(
          translations.RulesContainer.CREATE_RULE.SELECT_SCHED.DAY
        ).toLocaleLowerCase()
      );
    }

    //get card status, bey default it's true, it will get false only at edit Card when was not active
    setChecked(props.cardIsActive);

    setConditionsRedux(data.triggerCondition);

    //get machine name from machineIDs
    const machineNames: string[] = [];

    data.triggerCondition.forEach((element) => {
      if (element.Name === "MachineID") {
        let str = element.Value.replace("(", "");
        str = str.replace(")", "");
        const machineIDSelected = str.split(",");

        groups.data.DepartmentMachine?.forEach((elem) => {
          machineIDSelected.forEach((machineID) => {
            elem.Value.forEach((elem2) => {
              if (machineID === elem2.Id.toString()) {
                machineNames.push(elem2.MachineLName);
              }
            });
          });
        });
      }
    });

    setMachineNamesCondition(machineNames);
  }, [type]);

  useEffect(() => {
    console.log("data redux ", data);
    events_data.data?.EventsAndGroups?.forEach((element: any) => {
      reasonsList.push(element.Reasons);
    });

    if (data.triggerCondition.length !== 0) {
      const objectToStr = String(data.triggerCondition[0].ParameterID);
      const strToArray = objectToStr.split(",");
      console.log("strToArray ", strToArray);
      if (strToArray[0] === "0") {
        data.stopReasonID.forEach((reasonSelected) => {
          //get reasons names
          events_data.data.EventsAndGroups?.forEach((elementreason) => {
            elementreason.Reasons?.forEach((elemreason2) => {
              if (elemreason2.ID === reasonSelected) {
                const getName = getKeyValue<
                  keyof EventsAndGroup,
                  EventsAndGroup
                >(key)(elemreason2);
                if (getName !== null && getName !== undefined) {
                  causeGroupList.push(String(getName));
                  console.log("getName ", getName);
                }
              }
            });
          });
        });
        // }
        setCauseGroupList(causeGroupList);
        console.log("causeGroupList22 ", causeGroupList);
      } else {
        setDeviation(true);
      }
    } else if (data.stopReasonID.length > 0) {
      data.stopReasonID.forEach((reasonSelected) => {
        //get reasons names
        events_data.data.EventsAndGroups?.forEach((elementreason) => {
          elementreason.Reasons?.forEach((elemreason2) => {
            if (elemreason2.ID === reasonSelected) {
              const getName = getKeyValue<keyof EventsAndGroup, EventsAndGroup>(
                key
              )(elemreason2);
              if (getName !== null && getName !== undefined) {
                causeGroupList.push(String(getName));
                console.log("getName ", getName);
              }
            }
          });
        });
      });
      // }
      setCauseGroupList(causeGroupList);
    }
    setRefresh(!refresh);
  }, [type]);

  useEffect(() => {
    if (
      data.triggerCondition.length !== 0 &&
      conditionsDeviation.length === 0
    ) {
      if (data.triggerCondition[0].ParameterID[0] === 0) {
        setDeviation(false);
      } else {
        setDeviation(true);

        //get machine name and parameter name for deviation rows
        data.triggerCondition.forEach((condition) => {
          let machine = "";
          let parameter: string[] = [];
          departmentMachine.forEach((element) => {
            if (element.value === Number(condition.MachineID)) {
              //console.log("element machine", element);
              machine = element.label;
            }
          });

          // const strToArray = condition.ParameterID.split(",");
          // console.log("strToArray ", strToArray);
          // const nuevo = strToArray.map((i) => Number(i));
          // console.log("nuevo ", nuevo);
          console.log("condition.ParameterID ", condition.ParameterID);
          Object.keys(
            parametersMachines.data.ResponseDictionaryValues ?? {}
          ).forEach((key) => {
            const array =
              parametersMachines?.data?.ResponseDictionaryValues[key];
            (array || []).forEach((element: any) => {
              if (condition.ParameterID.length > 0) {
                condition.ParameterID.forEach((paramID) => {
                  if (element.id === paramID) {
                    parameter.push(" " + element.name);
                  }
                });
              } else {
                if (element.id === condition.ParameterID) {
                  parameter.push(" " + element.name);
                }
              }
            });
          });
          //save only legal condition
          if (parameter.length !== 0) {
            conditionsDeviation.push({
              Machine: machine,
              Parameter: parameter,
            });
          }
        });

        let conditionsSpc: {
          Machine: string;
          Parameter: string[];
        }[] = [];
        conditionsDeviation.forEach((condition) => {
          let flag = false;
          conditionsSpc.forEach((spc) => {
            if (spc.Machine === condition.Machine) {
              flag = true;
              spc.Parameter.push(condition.Parameter[0]);
            }
          });
          if (!flag) {
            conditionsSpc.push(condition);
          }
        });

        setConditionsDeviation(conditionsSpc);
      }
    }
    setRefresh(!refresh);
  }, [parametersMachines.data.ResponseDictionaryValues]);

  const onToggleChange = () => {
    setChecked(!checked);

    const ActionEdit: NewRuleInterface = {
      ruleName: "",
      stopCause: "",
      stopGroup: "",
      causeIdSelected: 0,
      intervalType: "",
      eventTime: "",
      triggerDays: [],
      triggerWeekDays: [],
      subject: "",
      subSubject: 0,
      description: "",
      levelClicked: "",
      asigneClicked: "",
      objectClicked: "",
      objectIdSelected: 0,
      asigneTaskToClicked: "",
      timeClicked: "",
      priorityClicked: "",
      subTaskList: [""],
      subMachinesList: [],
      subMachinesIDList: [],
      GroupMessage: GroupMessage.DepartmentMachine,
      subNotifyClicked: "",
      userIdSelected: 0,
      editClicked: false,
      subTaskListCheckBox: [true],
      isActive: !checked,
      stopReasonID: [0],
      triggerCondition: [
        {
          Name: "",
          Sign: "",
          Value: "",
          FieldType: "",
          Condition: "",
          DisplayOrder: 0,
          Interval: "",
          MachineID: 0,
          ParameterID: [0],
          TimeInterval: 0,
        },
      ],
      amountTimePeriod: 0,
      timeIntervalPeriod: "",
      eventTypePeriod: "",
      eventValuePeriod: "",
      maintenanceType: 0,
      maintenanceEntityID: 0,
      maintenanceReason: 0,
      note: "",
    };
    dispatch(SET_CARD_ACTIVE(ActionEdit));
  };

  function ConditionsRowList() {
    //only if there is more than one index because the first on is empty
    if (conditionsRedux.length > 0) {
      if (conditionsRedux[0].Name !== "") {
        const listConditions = conditionsRedux.map((condition) => (
          <LineRule key={condition.Condition}>
            <GroupRowContainer>
              <Title>{condition.Name}</Title>

              <SubTitle trigger={false}>
                {condition.Name === "Duration" ? (
                  <SubTitle trigger={false}>
                    {t(translations.RulesContainer.CREATE_RULE.DURATION_ROW)}
                    {condition.Sign === ">"
                      ? t(translations.RulesContainer.CREATE_RULE.OVER)
                      : t(translations.RulesContainer.CREATE_RULE.UNDER)}
                    {condition.Value}{" "}
                    {t(
                      translations.RulesContainer.CREATE_RULE.SELECT_INTERVAL
                        .MINUTES
                    ).toLowerCase()}
                    .
                  </SubTitle>
                ) : (
                  <SubTitle trigger={false}>
                    {t(translations.RulesContainer.CREATE_RULE.MACHINE_ROW)}{" "}
                    {machineNamesCondition.toString()}.
                  </SubTitle>
                )}
              </SubTitle>
              {conditionsRedux.length ===
              conditionsRedux.indexOf(condition) + 1 ? (
                <></>
              ) : (
                <LineContainer>
                  <Line />{" "}
                  <AndText>
                    {t(translations.RulesContainer.CREATE_RULE.AND)}
                  </AndText>
                </LineContainer>
              )}
            </GroupRowContainer>
            <EditIcon
              style={{ fontSize: "3.0em" }}
              onClick={() => props.handleEditCondition(condition.Name)}
            />
          </LineRule>
        ));

        return (
          <div>
            {listConditions}
            {conditionsRedux.length > 3 ? (
              <SeeMoreContainer>
                {t(translations.RulesContainer.CREATE_RULE.SEE)}{" "}
                {conditionsRedux.length - 3}{" "}
                {t(translations.RulesContainer.CREATE_RULE.MORE)}{" "}
                <ExpandMoreSharpIcon />
              </SeeMoreContainer>
            ) : (
              <></>
            )}
          </div>
        );
      } else if (conditionsRedux[0].MachineID !== 0) {
        const listConditions = conditionsDeviation.map((condition) => (
          <LineRule key={condition.Machine}>
            <GroupRowContainer>
              <SubTitle trigger={false}>
                <SubTitle trigger={false}>
                  {t(
                    translations.RulesContainer.CREATE_RULE.PARAMETER_DEVIATION
                      .DEVIATION_MACHINE
                  )}
                  {condition.Machine}
                  {": "}
                  {t(
                    translations.RulesContainer.CREATE_RULE.PARAMETER_DEVIATION
                      .DEVIATION_PARAMETER
                  )}
                  {condition.Parameter.toString()}.
                </SubTitle>
              </SubTitle>
              {conditionsDeviation.length ===
              conditionsDeviation.indexOf(condition) + 1 ? (
                <></>
              ) : (
                <LineContainer or={true}>
                  <Line />{" "}
                  <AndText>
                    {t(translations.RulesContainer.CREATE_RULE.OR)}
                  </AndText>
                </LineContainer>
              )}
            </GroupRowContainer>
            <EditIcon
              style={{ fontSize: "3.0em" }}
              onClick={() => props.handleEditCondition(condition.Machine)}
            />
          </LineRule>
        ));

        return (
          <div>
            {listConditions}
            {/*{conditionsRedux.length > 3 ? (*/}
            {/*  <SeeMoreContainer>*/}
            {/*    {t(translations.RulesContainer.CREATE_RULE.SEE)}{" "}*/}
            {/*    {conditionsRedux.length - 3}{" "}*/}
            {/*    {t(translations.RulesContainer.CREATE_RULE.MORE)}{" "}*/}
            {/*    <ExpandMoreSharpIcon />*/}
            {/*  </SeeMoreContainer>*/}
            {/*) : (*/}
            {/*  <></>*/}
            {/*)}*/}
          </div>
        );
      }
    }
  }

  return (
    <SummaryContainer>
      <SwitchContainer>
        <SwitchTitle>
          {" "}
          {t(translations.RulesContainer.ACTIVATE_RULE)}{" "}
        </SwitchTitle>
        <div onClick={onToggleChange}>
          <ToggleSwitch IsActive={checked}> </ToggleSwitch>{" "}
        </div>
      </SwitchContainer>
      <SummaryRuleContainer marginTop={14}>
        <SummaryTitle>
          {t(translations.RulesContainer.WHEN_TRIGGER_HAPPENS)}
        </SummaryTitle>

        <LineRule>
          <div>
            <Title>
              {props.trigger
                ? t(
                    translations.RulesContainer.CREATE_RULE.ScehduleRow
                      .AT_SCHED_INTERVALS
                  )
                : causeGroupList.length > 0 && data.amountTimePeriod === 0
                ? t(
                    translations.RulesContainer.CREATE_RULE.ScehduleRow
                      .WHEN_MACHINE_STOPS_FOR
                  )
                : deviation
                ? data.triggerCondition[0].TimeInterval === 8888 ||
                  conditionType === 1
                  ? t(
                      translations.RulesContainer.CREATE_RULE
                        .PARAMETER_DEVIATION.SPC
                    )
                  : t(
                      translations.RulesContainer.CREATE_RULE
                        .PARAMETER_DEVIATION.DEVIATION
                    )
                : data.amountTimePeriod === 0
                ? t(
                    translations.RulesContainer.CREATE_RULE.ScehduleRow
                      .WHEN_MACHINE_STOPS
                  )
                : t(
                    translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
                      .EVERY_PERIOD_OF_TIME
                  )}
            </Title>
            <SubTitle trigger={false}>
              {props.trigger
                ? t(
                    translations.RulesContainer.CREATE_RULE.SELECT_SCHED.EVERY
                  ) +
                  " " +
                  type +
                  " " +
                  t(translations.RulesContainer.CREATE_RULE.SELECT_SCHED.AT) +
                  " " +
                  props.timeSelected +
                  " " +
                  (props.daysSelected.length === 0 &&
                  props.weekDaysSelected.length === 0
                    ? ""
                    : t(
                        translations.RulesContainer.CREATE_RULE.SELECT_SCHED.ON
                      )) +
                  " " +
                  props.daysSelected +
                  weekDaysFormat
                : causeGroupList.length > 0 && data.amountTimePeriod === 0
                ? causeGroupList.toString()?.replaceAll(",", ", ")
                : deviation
                ? ""
                : data.amountTimePeriod === 0
                ? props.causeStop
                : data.amountTimePeriod +
                  " " +
                  timeIntervalList[Number(data.timeIntervalPeriod)].label +
                  " at " +
                  data.eventValuePeriod}
            </SubTitle>
          </div>
          <EditIcon
            style={{ fontSize: "3.0em" }}
            onClick={() => props.handleEditClicked(false)}
          />
        </LineRule>
        {conditionsRedux.length === 0 || conditionsRedux[0].Name === "" ? (
          <></>
        ) : (
          <LineContainer first={true}>
            <Line />{" "}
            <AndText>{t(translations.RulesContainer.CREATE_RULE.AND)}</AndText>
          </LineContainer>
        )}
        {conditionsRedux.length === 0 ? <></> : ConditionsRowList()}
      </SummaryRuleContainer>

      <SummaryRuleContainer marginTop={24}>
        <SummaryTitle>
          {t(translations.RulesContainer.DO_THIS_ACTION)}
        </SummaryTitle>

        <LineRule>
          <div>
            <Title>{props.actionTitle}</Title>
            {data.maintenanceType !== 0 && data.maintenanceType !== null ? (
              <SubTitle trigger={false}>{data.note}</SubTitle>
            ) : (
              <SubTitle trigger={false}>{props.actionSubTitle}</SubTitle>
            )}
          </div>
          <EditIcon
            style={{ fontSize: "3.0em" }}
            onClick={() => props.handleEditClicked(true)}
          />
        </LineRule>
      </SummaryRuleContainer>
    </SummaryContainer>
  );
};

export default RuleSummary;
