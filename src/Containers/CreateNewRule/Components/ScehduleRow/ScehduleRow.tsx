import {
  SceduleContainer,
  SceduleText,
  IconContainer,
  SceduleFlex,
} from "./styles";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
//import {Tooltip} from "@mui/material";
import { TooltipDiscription } from "../../../../Component/ToolTip/ToolTipMUI";
import React, { useEffect, useState } from "react";
import { ShowMore } from "../ConditionRow/styles";
import { useSelector } from "../../../../utils/React2Ang/useCustoms";
import { selectAllMaintenance } from "../../../RuleContainer/slice/selectors";

interface ScehduleRowProps {
  days?: string;
  time?: string;
  typeInterval?: string;
  selectMachineStop: boolean;
  group?: string;
  cause?: string;
  handleEditClicked: (selectStop: boolean, deviation: boolean) => void;
  handleDeleteClicked: () => void;
  actionRow: boolean;
  actionItem?: string;
  actionDescription?: string;
  causeNameSelectedList?: string;
  amountTimePeriod?: string;
  timeIntervalPeriod?: string;
  eventValuePeriod?: string;
  maintenanceType?: number;
  maintenanceEntityID?: number;
  maintenanceReason?: number;
}

const ScehduleRow: React.FC<ScehduleRowProps> = (props) => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(true);
  const maintenance = useSelector(selectAllMaintenance);
  const [eventValuePeriod, setEventValuePeriod] = useState("");

  const [maintenanceType, setMaintenanceType] = useState("");
  const [maintenanceEntityID, setMaintenanceEntityID] = useState("");
  const [maintenanceReason, setMaintenanceReason] = useState("");
  const [causeNameSelectedList, setcauseNameSelectedList] = useState("");

  useEffect(() => {
    if (props.causeNameSelectedList !== undefined) {
      let causeList = props.causeNameSelectedList.replaceAll(",", ", ");
      console.log("causeList.indexOf ", causeList.indexOf(",", 0));
      if (causeList.indexOf(",") === 0) {
        setcauseNameSelectedList(causeList.substring(1));
      } else {
        setcauseNameSelectedList(causeList);
      }
    }
  }, [props.causeNameSelectedList]);

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

  useEffect(() => {
    maintenance.data.ResponseDictionary?.MaintenanceTypes.forEach(
      (element: any) => {
        if (element.MaintenanceTypeName !== null && element !== undefined) {
          if (element.MaintenanceType === props.maintenanceType) {
            setMaintenanceType(element.MaintenanceTypeName);
          }
        }
      }
    );

    if (props.maintenanceType === 1) {
      maintenance.data.ResponseDictionary?.Molds.forEach((element: any) => {
        if (element.MoldName !== null && element !== undefined) {
          if (element.MoldID === props.maintenanceEntityID) {
            setMaintenanceEntityID(element.MoldName);
          }
        }
      });
    } else if (props.maintenanceType === 2) {
      maintenance.data.ResponseDictionary?.Machines.forEach((element: any) => {
        if (element.MachineName !== null && element !== undefined) {
          if (element.MachineID === props.maintenanceEntityID) {
            setMaintenanceEntityID(element.MachineName);
          }
        }
      });
    } else if (props.maintenanceType === 3) {
      maintenance.data.ResponseDictionary?.Auxiliarys.forEach(
        (element: any) => {
          if (element.AuxiliaryName !== null && element !== undefined) {
            if (element.AuxiliaryID === props.maintenanceEntityID) {
              setMaintenanceEntityID(element.AuxiliaryName);
            }
          }
        }
      );
    }

    maintenance.data.ResponseDictionary?.MaintenaceReasons.forEach(
      (element: any) => {
        if (element.MaintenanceReasonName !== null && element !== undefined) {
          if (element.MaintenanceReason === props.maintenanceReason) {
            setMaintenanceReason(element.MaintenanceReasonName);
          }
        }
      }
    );
  }, [
    maintenance.data.ResponseDictionary?.MaintenanceTypes,
    maintenance.data.ResponseDictionary?.Machines,
    maintenance.data.ResponseDictionary?.Molds,
    maintenance.data.ResponseDictionary?.Auxiliaries,
    maintenance.data.ResponseDictionary?.MaintenaceReasons,
  ]);

  useEffect(() => {
    if (props.eventValuePeriod !== "") {
      let eventValuePeriodArr = props.eventValuePeriod?.split(" ");
      if (eventValuePeriodArr !== undefined) {
        const eventValueFormat =
          eventValuePeriodArr[0].toString() +
          ", " +
          eventValuePeriodArr[1].toString();
        setEventValuePeriod(eventValueFormat);
      }
    }
  }, []);

  //convert week days to full words
  const weekDays: string[] = [];
  let weekDaysCut: string[] = [];
  let weekDaysFormat = "";
  if (
    props.typeInterval !== "" &&
    props.typeInterval ===
      t(translations.RulesContainer.CREATE_RULE.ScehduleRow.WEEKLY)
  )
    if (props.days !== undefined) {
      weekDaysCut = props.days.split(",");
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
            `${t(
              translations.RulesContainer.CREATE_RULE.ScehduleRow.TUESDAY
            )}, `
          );
        } else if (day === "3") {
          weekDays.push(
            `${t(
              translations.RulesContainer.CREATE_RULE.ScehduleRow.WEDNESDAY
            )}, `
          );
        } else if (day === "4") {
          weekDays.push(
            `${t(
              translations.RulesContainer.CREATE_RULE.ScehduleRow.THURSDAY
            )}, `
          );
        } else if (day === "5") {
          weekDays.push(
            `${t(translations.RulesContainer.CREATE_RULE.ScehduleRow.FRIDAY)}, `
          );
        } else if (day === "6") {
          weekDays.push(
            `${t(
              translations.RulesContainer.CREATE_RULE.ScehduleRow.SATURDAY
            )}, `
          );
        }
      });

      weekDaysFormat = weekDays.join("");

      weekDaysFormat = weekDaysFormat.substring(0, weekDaysFormat.length - 2);
    }

  return (
    <SceduleContainer actionRow={props.actionRow}>
      <SceduleFlex
        showMore={
          props.causeNameSelectedList !== undefined &&
          props.causeNameSelectedList.length > 100
        }
      >
        <IconContainer background={true} actionRow={props.actionRow}>
          <DoneIcon style={{ fontSize: "1.8em" }} />
        </IconContainer>
        {props.actionRow ? (
          <div>
            <SceduleText> {props.actionItem} </SceduleText>
            {props.actionDescription &&
            props.actionDescription?.length > 140 ? (
              <TooltipDiscription title={props.actionDescription || ""}>
                <SceduleText actionRow={props.actionRow}>
                  {props.actionDescription?.slice(0, 140)}...
                </SceduleText>
              </TooltipDiscription>
            ) : (
              <SceduleText actionRow={props.actionRow}>
                {props.actionDescription}
              </SceduleText>
            )}
            {props.maintenanceType !== 0 && props.maintenanceType !== null ? (
              <SceduleText>
                {maintenanceType} - {maintenanceEntityID} - {maintenanceReason}{" "}
              </SceduleText>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            {props.selectMachineStop ? (
              props.causeNameSelectedList !== undefined &&
              props.causeNameSelectedList.length > 260 &&
              showMore ? (
                <SceduleText>
                  {t(
                    translations.RulesContainer.CREATE_RULE.ScehduleRow
                      .WHEN_MACHINE_STOPS
                  )}{" "}
                  {causeNameSelectedList.slice(0, 260)}
                  ...
                  <ShowMore
                    onClick={() => {
                      setShowMore(false);
                    }}
                  >
                    {t(translations.RulesContainer.CREATE_RULE.SHOW_MORE)}
                  </ShowMore>
                </SceduleText>
              ) : (
                <SceduleText>
                  {t(
                    translations.RulesContainer.CREATE_RULE.ScehduleRow
                      .WHEN_MACHINE_STOPS
                  )}{" "}
                  {causeNameSelectedList}.
                  {props.causeNameSelectedList !== undefined &&
                  props.causeNameSelectedList.length > 260 ? (
                    <ShowMore
                      onClick={() => {
                        setShowMore(true);
                      }}
                    >
                      {t(translations.RulesContainer.CREATE_RULE.SHOW_LESS)}
                    </ShowMore>
                  ) : (
                    <></>
                  )}
                </SceduleText>
              )
            ) : props.amountTimePeriod === "" ? (
              <SceduleText>
                {t(
                  translations.RulesContainer.CREATE_RULE.ScehduleRow
                    .AT_SCHED_INTERVALS
                )}{" "}
                {props.typeInterval ===
                t(translations.RulesContainer.CREATE_RULE.ScehduleRow.DAILY)
                  ? ""
                  : t(
                      translations.RulesContainer.CREATE_RULE.ScehduleRow.ON
                    )}{" "}
                {props.typeInterval ===
                t(translations.RulesContainer.CREATE_RULE.ScehduleRow.WEEKLY)
                  ? weekDaysFormat
                  : props.days}{" "}
                at {props.time}.
              </SceduleText>
            ) : (
              <SceduleText>
                {t(
                  translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
                    .EVERY_PERIOD
                )}{" "}
                {props.amountTimePeriod}{" "}
                {timeIntervalList[Number(props.timeIntervalPeriod)].label}{" "}
                {t(
                  translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME
                    .ON
                )}{" "}
                {eventValuePeriod}.
              </SceduleText>
            )}
          </div>
        )}
      </SceduleFlex>

      <SceduleFlex
        showMore={
          props.causeNameSelectedList !== undefined &&
          props.causeNameSelectedList.length > 100
        }
      >
        <IconContainer actionRow={props.actionRow}>
          <EditIcon
            style={{ fontSize: "2.2em" }}
            onClick={() =>
              props.handleEditClicked(props.selectMachineStop, false)
            }
          />
        </IconContainer>

        <IconContainer actionRow={props.actionRow}>
          <DeleteIcon
            style={{ fontSize: "2.2em" }}
            onClick={() => props.handleDeleteClicked()}
          />
        </IconContainer>
      </SceduleFlex>
    </SceduleContainer>
  );
};

export default ScehduleRow;
