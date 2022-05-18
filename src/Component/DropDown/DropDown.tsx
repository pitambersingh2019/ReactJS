import React, { useEffect, useRef, useState } from "react";
import {
  DropDownContainer,
  DropDownList,
  DropDownButtonTrigger,
  DropDownListA,
} from "./styles";

import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import { ClickAwayListener } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  GroupMessage,
  NewRuleInterface,
  selectRuleData,
  SET_DROPDOWN,
} from "../../Containers/CreateNewRule/slice";

interface DropDownProps {
  id: string;
  marginTop: number;
  marginLeft: number;
  marginRight: number;
  marginBottom: number;
  width?: number;
  height?: number;
  flex?: boolean;
  dropDownHeight?: number;
  dropDownScrolling: string;
  disableShadow?: boolean;
  disableBorder?: boolean;
  setWidth?: boolean;
  data: any;
  itemSelected: string;
  handleSelectItem: (item: string, index?: number) => void;
  nonPaddingTop?: boolean;
  background?: string;
  nonPaddingBottom?: boolean;
  scrollToBottom?: boolean;
  top: number;
}

const DropDown: React.FC<DropDownProps> = (props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemClicked, setItemClicked] = useState("");
  const [scrollToBottom, setScrollToBottom] = useState(false);

  const data = useSelector(selectRuleData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.data.length > 0) {
      setItemClicked(props.data[0].label);
    }
    if (scrollToBottom) {
      //set dropDownClicked  at state to call scrollToBottom at SelectAction for Timing dropDown and at AddActionTask for others
      const editData: NewRuleInterface = {
        ruleName: "",
        subject: "",
        subSubject: 0,
        description: "",
        levelClicked: "",
        asigneClicked: "",
        objectClicked: "",
        objectIdSelected: 0,
        asigneTaskToClicked: "",
        timeClicked: "",
        priorityClicked: "",
        subTaskList: [],
        subMachinesList: [],
        GroupMessage: GroupMessage.DepartmentMachine,
        subMachinesIDList: [0],
        subNotifyClicked: "",
        stopCause: "",
        stopGroup: "",
        causeIdSelected: 0,
        intervalType: "",
        eventTime: "",
        triggerDays: [],
        triggerWeekDays: [],
        userIdSelected: 0,
        dropDownClicked: true,
        dropDownIDClicked: props.id,
        subTaskListCheckBox: [true],
        isActive: true,
        stopReasonID: [0],
        triggerCondition: [
          {
            Name: "",
            Sign: "",
            Value: "",
            FieldType: "",
            Condition: "",
            DisplayOrder: 0,
            Interval: "",
            MachineID: 0,
            ParameterID: [0],
            TimeInterval: 0,
          },
        ],
        amountTimePeriod: 0,
        timeIntervalPeriod: "",
        eventTypePeriod: "",
        eventValuePeriod: "",
        maintenanceType: 0,
        maintenanceEntityID: 0,
        maintenanceReason: 0,
        note: "",
      };

      dispatch(SET_DROPDOWN(editData));
      setScrollToBottom(false);
    }
  }, [data, dispatch, scrollToBottom, props]);

  const handleClick = (item: string, index: number) => {
    //close dropDown
    onClick();
    //save subject clicked locally at DropdownSubject
    setItemClicked(item);
    //save subject clicked at perant
    // setSubjectClicked(item);
    props.handleSelectItem(item, index);
  };

  const DropDownButton = () => {
    onClick();
    //if we get props.scrollToBottom true then call scrollToBottom at useEffect
    if (props.scrollToBottom) {
      setScrollToBottom(true);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setIsActive(false)}>
      <DropDownContainer
        id={props.id}
        marginBottom={props.marginBottom}
        marginLeft={props.marginLeft}
        marginRight={props.marginRight}
        marginTop={props.marginTop}
        width={props.width}
        height={props.height}
        disableShadow={props.disableShadow}
        flex={props.flex}
        nonPaddingTop={props.nonPaddingTop}
        background={props.background}
        nonPaddingBottom={props.nonPaddingBottom}
      >
        <DropDownButtonTrigger
          disableBorder={props.disableBorder}
          isActive={isActive}
          id={props.id}
          onClick={DropDownButton}
        >
          <span id={props.id}>{props.itemSelected} </span>
          {props.disableBorder ? <></> : <ExpandMoreSharpIcon />}
        </DropDownButtonTrigger>
        <DropDownList
          id={props.id}
          isActive={isActive}
          height={props.dropDownHeight}
          setWidth={props.setWidth}
          scrolling={props.dropDownScrolling}
          top={props.top}
          disableBorder={props.disableBorder}
          ref={dropdownRef}
        >
          <ul>
            {props.data?.map(
              (option: { label: string; value: number }, index: number) => (
                <li key={index}>
                  <DropDownListA
                    selected={props.itemSelected === option.label}
                    onClick={() => handleClick(option.label, option.value)}
                  >
                    {option.label}
                  </DropDownListA>
                </li>
              )
            )}
          </ul>
        </DropDownList>
      </DropDownContainer>
    </ClickAwayListener>
  );
};

export default DropDown;
