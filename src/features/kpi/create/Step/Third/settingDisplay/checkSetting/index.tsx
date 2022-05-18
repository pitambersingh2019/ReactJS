import React, { FC } from "react";
import InputRadio from "../../../../../../../Component/CustomComponent/InputDefault";
import { TGuageType } from "../../../../types";
import * as Styled from "./style";

interface IProps {
  gaugeType: TGuageType;
  onClickGaugeType: (value: "single" | "3 ranges") => void;
}

const CheckGaugeType: FC<IProps> = ({ gaugeType, onClickGaugeType }) => {
  return (
    <div>
      <Styled.WrraperText>Gauge Type*</Styled.WrraperText>
      <Styled.WrapperGaugeType>
        <InputRadio
          isActive={gaugeType === "single"}
          color="#5900d3"
          text="Single"
          type="radio"
          onClick={() => {
            onClickGaugeType("single");
          }}
        />

        <InputRadio
          isActive={gaugeType === "3 ranges"}
          color="#5900d3"
          text="3 Ranges"
          type="radio"
          onClick={() => {
            onClickGaugeType("3 ranges");
          }}
        />
      </Styled.WrapperGaugeType>
    </div>
  );
};

export default CheckGaugeType;
