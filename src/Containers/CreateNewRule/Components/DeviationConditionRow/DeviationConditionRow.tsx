import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import {
  IconContainer,
  SceduleFlex,
  SceduleText,
  ShowMore,
} from "../ConditionRow/styles";
import { ConditionRowContainer } from "./styles";
import React, { useState } from "react";

interface DeviationConditionRowProps {
  handleEditClicked: (taskEdit: any) => void;
  handleDeleteClicked: (name: string) => void;
  id: any;
  machineDeviation?: string;
  parameterDeviation?: string;
  timeIntervalDeviation?: string;
  timeElapsedDeviation?: string;
}

const DeviationConditionRow: React.FC<DeviationConditionRowProps> = (props) => {
  const { t } = useTranslation();
  let paramsFormat = "";
  const [showMore, setShowMore] = useState(true);
  if (props.parameterDeviation !== undefined) {
    const strToArray = props.parameterDeviation.split(",");
    paramsFormat = strToArray.join(", ");
    paramsFormat = paramsFormat.substring(0, paramsFormat.length) + ".";
  }

  return (
    <ConditionRowContainer id={props.id}>
      <SceduleFlex
        showMore={paramsFormat !== undefined && paramsFormat.length > 100}
      >
        <IconContainer background={true}>
          <DoneIcon style={{ fontSize: "1.8em" }} />
        </IconContainer>
        <div>
          {props.timeElapsedDeviation === "8888" ? (
            paramsFormat.length > 280 && showMore ? (
              <SceduleText>
                {t(
                  translations.RulesContainer.CREATE_RULE.ScehduleRow
                    .SPC_PREDICATION
                )}
                {props.machineDeviation}
                {": "}
                {paramsFormat.slice(0, 280)}...
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
                    .SPC_PREDICATION
                )}
                {props.machineDeviation}
                {": "}
                {paramsFormat}
                {paramsFormat.length > 280 ? (
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
          ) : (
            <SceduleText>
              {" "}
              {t(
                translations.RulesContainer.CREATE_RULE.ScehduleRow
                  .PARAMETER_DEVIATION_ROW
              )}
              {props.machineDeviation}
              {": "}
              {paramsFormat}
            </SceduleText>
          )}
        </div>
      </SceduleFlex>

      <SceduleFlex
        showMore={paramsFormat !== undefined && paramsFormat.length > 100}
      >
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

export default DeviationConditionRow;
