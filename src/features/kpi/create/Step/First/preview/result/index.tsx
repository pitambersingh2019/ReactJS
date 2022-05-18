import { FC } from "react";
import * as Styled from "./style";
import formulaImg from "../../../../../assets/img/Formula_icon.svg";

interface IProps {
  formula: string;
}

const ResultPreview: FC<IProps> = ({ formula }) => {
  return (
    <Styled.PreviewSettingFormulaWrapper>
      <Styled.PreviewFormulaImgWrapper>
        <img src={formulaImg} alt="" />
      </Styled.PreviewFormulaImgWrapper>
      <Styled.PreviewSettingFormula dir="ltr">
        {formula}
      </Styled.PreviewSettingFormula>
    </Styled.PreviewSettingFormulaWrapper>
  );
};

export default ResultPreview;
