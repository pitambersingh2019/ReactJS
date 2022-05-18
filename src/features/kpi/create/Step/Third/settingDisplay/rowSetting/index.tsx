import React, { FC } from "react";
import InputSetting from "../inputSetting";
import { TMainTitle } from "../../types";
import * as Styled from "./style";

interface IProps {
  setBorder: boolean;
  mainTitle: TMainTitle;
}

const RowSetting: FC<IProps> = ({ setBorder, mainTitle }) => {
  return (
    <div>
      {mainTitle && <Styled.SettingTitle>{mainTitle}</Styled.SettingTitle>}
      <Styled.SettingWrapperRow setBorder={setBorder}>
        <InputSetting title={"Minimum Target"} mainTitle={mainTitle} />
        <InputSetting title={"Maximum Target"} mainTitle={mainTitle} />
      </Styled.SettingWrapperRow>
    </div>
  );
};

export default RowSetting;
