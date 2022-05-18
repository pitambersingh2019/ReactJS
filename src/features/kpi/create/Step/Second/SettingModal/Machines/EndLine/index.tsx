import { FC } from "react";
import { translations } from "../../../../../../../../locales/translations";
import { useTranslation } from "react-i18next";
import MySwitch from "../../../../../../../../Component/CustomComponent/MySwitch";
import * as Styled from "./style";

interface IProps {
  onChangeEndOfLine: () => void;
  endOfLine: number[];
}

const EndLineMachine: FC<IProps> = ({ onChangeEndOfLine, endOfLine }) => {
  const { t } = useTranslation();
  return (
    <Styled.EndLineWrapper>
      <Styled.EndLineText>
        <div>{t(translations.CustomKPI.SecondStepEndOfLineTitle)}</div>
      </Styled.EndLineText>
      <MySwitch checked={!!endOfLine.length} onChange={onChangeEndOfLine} />
    </Styled.EndLineWrapper>
  );
};

export default EndLineMachine;
