import React, { useEffect, useState } from "react";
import {
  SceduleText,
  IconContainer,
  SceduleFlex,
  ConditionRowContainer,
  ShowMore,
} from "./styles";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";

interface ConditionRowProps {
  sign: string;
  time: string;
  typeInterval: string;
  machines: string;
  handleEditClicked: (name: string) => void;
  handleDeleteClicked: (name: string) => void;
  selectedCondition: string;
  id: string;
}

const ConditionRow: React.FC<ConditionRowProps> = (props) => {
  const { t } = useTranslation();
  const [typeInterval, setTypeInterval] = useState("");
  const [minutes, setMinutes] = useState("");
  const [showMore, setShowMore] = useState(true);

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

  useEffect(() => {
    //convert typeInterval to lowercase for displaying
    if (props.typeInterval !== undefined) {
      setTypeInterval(props.typeInterval.toLowerCase());
    }

    //convert time to minutes to display as minutes
    if (props.time !== undefined) {
      let minutes = "";

      //hours
      if (props.typeInterval === intervalType[0].label) {
        minutes = (Number(props.time) / 60).toString();
      }
      //minutes
      else if (props.typeInterval === intervalType[1].label) {
        minutes = props.time;
      }
      //seconds
      else if (props.typeInterval === intervalType[2].label) {
        minutes = (Number(props.time) * 60).toString();
      }

      setMinutes(minutes);
    }
  }, []);

  return (
    <ConditionRowContainer id={props.id}>
      <SceduleFlex>
        <IconContainer background={true}>
          <DoneIcon style={{ fontSize: "1.8em" }} />
        </IconContainer>
        {props.id === "Duration" ? (
          <SceduleText>
            {t(translations.RulesContainer.CREATE_RULE.DURATION_ROW)}{" "}
            {props.sign} {minutes} {typeInterval}.
          </SceduleText>
        ) : props.machines.length > 260 && showMore ? (
          <SceduleText>
            {t(translations.RulesContainer.CREATE_RULE.MACHINE_ROW)}{" "}
            {props.machines?.slice(0, 260)}...
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
            {t(translations.RulesContainer.CREATE_RULE.MACHINE_ROW)}{" "}
            {props.machines}
            {props.machines.length > 260 ? (
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
        )}
      </SceduleFlex>

      <SceduleFlex>
        <IconContainer>
          <EditIcon
            style={{ fontSize: "2.2em" }}
            onClick={() => props.handleEditClicked(props.id)}
          />
        </IconContainer>

        <IconContainer>
          <DeleteIcon
            style={{ fontSize: "2.2em" }}
            onClick={() => props.handleDeleteClicked(props.id)}
          />
        </IconContainer>
      </SceduleFlex>
    </ConditionRowContainer>
  );
};

export default ConditionRow;
