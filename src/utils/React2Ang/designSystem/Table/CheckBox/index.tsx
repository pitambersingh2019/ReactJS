import React, { useRef, useState, useEffect } from "react";
import { CheckBoxContainer, Wrapper, Title } from "./styles";
import { CheckBoxInterface } from "./types";
import Tooltip from "../Components/ToolTip";
import CheckBox from "../../../../../Component/DesignSystem/CheckBox";
const CheckBoxField: React.FC<CheckBoxInterface> = (props) => {
  const { TitleText, height, toggleHidden, checked, toolTipProps } = props;
  const Disabled = props.disabled ?? false;

  const refTitlecontent = useRef<HTMLDivElement>(null);
  const refCheckBox = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflow] = useState(false);
  useEffect(() => {
    if (refTitlecontent.current && toolTipProps) {
      const isOverf = refTitlecontent.current.scrollWidth > toolTipProps.width;
      setIsOverflow(isOverf);
    }
  }, [toolTipProps]);

  return (
    <CheckBoxContainer ref={refCheckBox} height={height}>
      <Wrapper>
        <CheckBox
          checked={checked}
          onChange={toggleHidden}
          disabled={Disabled}
        />
        {/*<input*/}
        {/*  type="checkbox"*/}
        {/*  {...otherprops}*/}
        {/*  style={{ width: "16px", height: "16px" }}*/}
        {/*  disabled={Disabled}*/}
        {/*/>*/}
      </Wrapper>
      {TitleText && (
        <Tooltip
          title={isOverflowed && toolTipProps ? TitleText : ""}
          PopperProps={{
            disablePortal: true,
          }}
        >
          <Title
            width={toolTipProps ? toolTipProps.width : undefined}
            ref={refTitlecontent}
          >
            {TitleText}
          </Title>
        </Tooltip>
      )}
    </CheckBoxContainer>
  );
};

export default CheckBoxField;
