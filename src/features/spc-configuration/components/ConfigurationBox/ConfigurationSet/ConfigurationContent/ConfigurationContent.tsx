import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {
  StyledContentWrapper,
  StyledHeader,
  StyledContent,
  StyledContentHeader,
  StyledContentRow,
  StyledTitle,
  StyledTitleSmall,
  StyledDetail,
  StyledSettingButton,
  StyledSettingTitle,
  SettingIcon,
  StyledDetailSmall,
} from "./configuration-content.styles";
import { SaveParamsSetting } from "../../../../slice";
import { ControllerField } from "../../../../slice/types";
import Switch from "../../../../../../Component/Switch/Swtich";
import SettingsIcon from "../../../../../../assets/icons/spc/SPC_settings.svg";
import EditModeIcon from "../../../../../../assets/icons/spc/SPC_edit_mode.svg";
import EditSetting from "./EditSetting/EditSetting";

interface ConfigurationContentProps {
  parentName: string;
  machineName: string;
  content?: ControllerField[];
}
const ConfigurationContent: React.FC<ConfigurationContentProps> = ({
  parentName,
  machineName,
  content,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [contentData, setContentData] = useState<ControllerField[]>([]);
  const [activeEditSetting, setActiveEditSetting] = useState<number>();
  useEffect(() => {
    if (content) {
      setContentData(content);
    }
  }, [content]);

  const handleToggleData = (id: number) => {
    let tempData: ControllerField[] = Object.assign([], contentData);
    let index = tempData.findIndex(
      (ele: ControllerField) => ele.ControllerFieldID === id
    );
    tempData[index] = {
      ControllerFieldID: tempData[index].ControllerFieldID,
      ControllerFieldName: tempData[index].ControllerFieldName,
      SPCLimitsBySigmas: tempData[index].SPCLimitsBySigmas,
      SPCBySamplesAmount: tempData[index].SPCBySamplesAmount,
      IsSPCValue: !tempData[index].IsSPCValue,
      SPCTestParams: tempData[index].SPCTestParams,
    };
    dispatch(SaveParamsSetting(tempData[index]));
    setContentData(tempData);
  };

  const handleEditSetting = (id: number) => {
    if (id === activeEditSetting) {
      setActiveEditSetting(undefined);
    } else {
      setActiveEditSetting(id);
    }
  };

  return (
    <StyledContentWrapper>
      <StyledHeader>
        <KeyboardArrowDownIcon />
        {parentName} | {machineName}
      </StyledHeader>
      <StyledContent>
        <StyledContentHeader>
          <StyledTitle>{t(translations.SPC.PARAMETERS)}</StyledTitle>
          <StyledTitle>{t(translations.SPC.SAMPLE_FOR_SPC)}</StyledTitle>
          <StyledTitleSmall>{t(translations.SPC.SPC_SETTING)}</StyledTitleSmall>
        </StyledContentHeader>
        {contentData?.map((ele) => (
          <div key={ele.ControllerFieldID}>
            <StyledContentRow>
              <StyledDetail>{ele.ControllerFieldName}</StyledDetail>
              <StyledDetail
                onClick={() => handleToggleData(ele.ControllerFieldID)}
              >
                <Switch IsActive={ele.IsSPCValue} />
              </StyledDetail>
              <StyledDetailSmall>
                {ele.IsSPCValue && (
                  <StyledSettingButton
                    onClick={() => handleEditSetting(ele.ControllerFieldID)}
                  >
                    {activeEditSetting === ele.ControllerFieldID ? (
                      <SettingIcon src={EditModeIcon} />
                    ) : (
                      <SettingIcon src={SettingsIcon} />
                    )}
                    <StyledSettingTitle>
                      {activeEditSetting === ele.ControllerFieldID
                        ? t(translations.SPC.EDIT_MODE)
                        : t(translations.SPC.EDIT_SETTINGS)}
                    </StyledSettingTitle>
                  </StyledSettingButton>
                )}
              </StyledDetailSmall>
            </StyledContentRow>
            {ele.IsSPCValue && activeEditSetting === ele.ControllerFieldID && (
              <EditSetting testData={ele} onEditSetting={handleEditSetting} />
            )}
          </div>
        ))}
      </StyledContent>
    </StyledContentWrapper>
  );
};

export default ConfigurationContent;
