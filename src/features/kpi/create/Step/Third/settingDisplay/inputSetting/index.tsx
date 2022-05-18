import React, { FC, useContext, useEffect, useState } from "react";
import { CreateKPIContext } from "../../../..";
import InputComponent from "../../../../../../../Component/CustomComponent/Input";
import { TMainTitle, TTitle } from "../../types";
import * as Styled from "./style";

type TMainT = "shift" | "day" | "week" | "month";

interface IProps {
  title: TTitle;
  mainTitle: TMainTitle;
}

const getPlaceholder = (digits: number) => {
  if (digits === 0) return "x";
  return "x." + "x".repeat(digits);
};

const InputSetting: FC<IProps> = ({ title, mainTitle }) => {
  const createContext = useContext(CreateKPIContext);
  const [inputValue, setInputValue] = useState<string>("0");

  const mainT = mainTitle.toLocaleLowerCase() as TMainT;
  const minMaxInput = title === "Maximum Target" ? "max" : "min";

  useEffect(() => {
    if (createContext !== null) {
      const valueInput = thirdStepSetting[mainT][minMaxInput];
      setInputValue(valueInput.toFixed(thirdStepSetting.digists));
    }
  }, [createContext]);

  useEffect(() => {
    if (createContext !== null) {
      createContext.setThirdStepSetting((prev) => {
        const num = prev[mainT][minMaxInput]
          .toString()
          .slice(0, 16 - (prev.digists + 1));
        return {
          ...prev,
          [mainT]: {
            ...prev[mainT],
            [minMaxInput]: parseFloat(parseFloat(num).toFixed(prev.digists)),
          },
        };
      });
    }
  }, [createContext?.thirdStepSetting.digists]);

  if (createContext === null) return <div></div>;

  const { thirdStepSetting, setThirdStepSetting } = createContext;
  const { digists } = thirdStepSetting;
  const timeData = thirdStepSetting[mainT];
  const isErrorData = !(
    (timeData.max === 0 && timeData.min === 0) ||
    timeData.max - timeData.min > 0
  );

  const onBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    let num = parseFloat(e.target.value.slice(0, 16));
    num = num > 9007199254740991 ? 9007199254740991 : num;
    num = num < -9007199254740991 ? -9007199254740991 : num;
    num = parseFloat((num || 0).toFixed(digists));

    setThirdStepSetting({
      ...thirdStepSetting,
      [mainT]: {
        ...thirdStepSetting[mainT],
        [minMaxInput]: num,
      },
    });
  };

  const onFocusInput = () => {
    setInputValue((prev) => {
      if (parseFloat(prev) === 0) {
        return "";
      }
      return prev;
    });
  };

  return (
    <Styled.SettingInputWrapper>
      <InputComponent
        value={inputValue}
        placeholder={getPlaceholder(digists)}
        onChange={setInputValue}
        status="editable"
        isRequired={false}
        onBlur={onBlurInput}
        onFocus={onFocusInput}
        title={title}
        error={isErrorData ? "Max must be bigger,then Min" : undefined}
      />
    </Styled.SettingInputWrapper>
  );
};

export default InputSetting;
