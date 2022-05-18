import { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { translations } from "../../../../../locales/translations";
// import { useDispatch } from "react-redux";
// import { SetStep } from "../../../slice";
import { TreeData, ControllerField } from "../../../slice/types";
// import Button from "../../../../../Component/DesignSystem/Buttons";
import PreNextHeader from "./PreNextHeader/PreNextHeader";
import ConfigurationContent from "./ConfigurationContent/ConfigurationContent";
import {
  StyledConfigurationBox,
  // ButtonContainer,
} from "./configuration-set.styles";

interface ConfigurationSetProps {
  machineData: TreeData | undefined;
  parentList: { id: number; name: string }[];
}
const ConfigurationSet: React.FC<ConfigurationSetProps> = ({
  machineData,
  parentList,
}) => {
  // const { t } = useTranslation();
  // const dispatch = useDispatch();
  const [parentName, setParentName] = useState<string>("");
  const [machineName, setMachineName] = useState<string>("");
  const [content, setContent] = useState<ControllerField[]>();

  useEffect(() => {
    if (machineData) {
      parentList.forEach((ele) => {
        if (ele.id === machineData.parentID) {
          setParentName(ele.name);
        }
      });
      setMachineName(machineData.name);
      setContent(machineData.SPCControllerFields);
    }
  }, [machineData, parentList]);

  // const handleSPCStep = (step: 1 | 2 | 3) => {
  //   dispatch(SetStep(step));
  // };

  return (
    <StyledConfigurationBox>
      <PreNextHeader />
      <ConfigurationContent
        parentName={parentName}
        machineName={machineName}
        content={content}
      />
      {/* <ButtonContainer>
        <Button
          onClick={() => handleSPCStep(3)}
          label={t(translations.SPC.BACK)}
          variant="secondary"
          size="lg"
        />
        <Button
          onClick={() => handleSPCStep(1)}
          label={t(translations.SPC.DONE)}
          size="lg"
        />
      </ButtonContainer> */}
    </StyledConfigurationBox>
  );
};

export default ConfigurationSet;
