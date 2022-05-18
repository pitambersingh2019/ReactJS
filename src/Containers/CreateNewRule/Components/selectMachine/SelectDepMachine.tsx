import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RulesContainerSlice } from "../../../RuleContainer/slice/types";
import { selectAllDepartmentMachine } from "../../../RuleContainer/slice/selectors";
import { selectRuleData } from "../../slice";
import {
  SelectContainer,
  ActionDescription,
  Grouptitle,
  FlexContainer,
  InputContainer,
  InputDescription,
  VerticalLine,
  SendMessageContainer,
  TreeSelectContainer,
} from "./styles";
import DropDown from "../../../../Component/DropDown/DropDown";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TreeSelect from "./TreeSelect";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { isLocalLanguage } from "../../../../utils/CommonFunctions";
import { selectLanguage } from "../../../../slice/selectors";

interface SendMessageProps {
  handleMessageParamsIds: (
    subMachinesList: { id: number; name: string }[],
    GroupMessage: any
  ) => void;
  handleMessageParamsInput: (message: string) => void;
}

const SelectDepMachine: React.FC<SendMessageProps> = (props) => {
  const { handleMessageParamsIds, handleMessageParamsInput } = props;
  const { t } = useTranslation();
  const currentLanguage = useSelector(selectLanguage);
  const groupList = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.DEPARTMENT
      ),
      value: "DepartmentMachine",
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.LINE),
      value: "DepartemntMachineLines",
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.GROUP),
      value: "DepartemntMachineGroups",
    },
  ];

  const DEPARTMENTMACHINE = t(
    translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.DEPARTMENT
  );
  const DEPARTEMNTMACHINELINES = t(
    translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.LINE
  );
  const DEPARTEMNTMACHINEGROUPS = t(
    translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.GROUP
  );

  const groups: RulesContainerSlice["DepartmentMachine"] = useSelector(
    selectAllDepartmentMachine
  );
  const data = useSelector(selectRuleData);
  const [groupBy, setGroupBy] = useState(DEPARTMENTMACHINE);
  const [machineList, setMachineList]: any[] = useState([]);
  const [inputText, setInputText] = useState("");
  const [Data, setData]: any = useState([]);
  const [expandedOption, setExpandedOption] = useState({});

  useEffect(() => {
    const machinelistReload: any[] = [];
    data.subMachinesList.forEach((element: any, i: number) => {
      machinelistReload.push({ id: data.subMachinesIDList[i] });
    });

    setMachineList(machinelistReload);
  }, [data]);

  console.log("currentLanguae ", currentLanguage);
  useEffect(() => {
    let index = 9999;
    const data: any = [];
    switch (groupBy) {
      case DEPARTMENTMACHINE:
        groups.data.DepartmentMachine?.forEach((elem) => {
          const subOptions: any[] = [];
          elem.Value.forEach((elem2) => {
            subOptions.push({
              id: elem2.Id,
              name: isLocalLanguage(currentLanguage)
                ? (elem2 as any).MachineLName || "undefined"
                : (elem2 as any).MachineName || "undefined",
              subOptions: [],
            });
          });
          data.push({
            id: index,
            name: isLocalLanguage(currentLanguage)
              ? elem.Key.LName || "undefined"
              : elem.Key.EName || "undefined",
            subOptions: subOptions,
          });
          index += 1;
        });
        setExpandedOption({ [index]: {} });
        console.log("DEPARTMENTMACHINE ", index);
        const Factory = [
          {
            id: index,
            name: t(
              translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.FACTORY
            ),
            subOptions: data,
          },
        ];
        setData(Factory);
        break;

      case DEPARTEMNTMACHINELINES:
        groups.data.DepartemntMachineLines?.forEach((elem) => {
          const subOptions: any[] = [];
          elem.Value.forEach((elem2) => {
            const subOptions2: any[] = [];
            //        key = isLocalLanguage(language) ? "DisplayEName" : "DisplayLName";
            elem2.Value.forEach((elem3) => {
              subOptions2.push({
                id: (elem3 as any).Id,
                name: isLocalLanguage(currentLanguage)
                  ? (elem3 as any).MachineLName || "undefined"
                  : (elem3 as any).MachineName || "undefined",
                subOptions: [],
              });
              index += 1;
            });

            subOptions.push({
              id: index,
              name: elem2.Key.LineName || "undefined",
              subOptions: subOptions2,
            });
            index += 1;
          });
          data.push({
            id: index,
            name: isLocalLanguage(currentLanguage)
              ? elem.Key.LName || "undefined"
              : elem.Key.EName || "undefined",
            subOptions: subOptions,
          });
          index += 1;
        });
        setExpandedOption({ [index]: {} });
        console.log("DEPARTEMNTMACHINELINES ", index);
        const Factory2 = [
          {
            id: index,
            name: t(
              translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.FACTORY
            ),
            subOptions: data,
          },
        ];
        setData(Factory2);
        break;

      case DEPARTEMNTMACHINEGROUPS:
        groups.data.DepartemntMachineGroups?.forEach((elem) => {
          const subOptions: any[] = [];
          elem.Value.forEach((elem2) => {
            const subOptions2: any[] = [];

            elem2.Value.forEach((elem3) => {
              subOptions2.push({
                id: elem3.Id,
                name: isLocalLanguage(currentLanguage)
                  ? (elem3 as any).MachineLName || "undefined"
                  : (elem3 as any).MachineName || "undefined",
                subOptions: [],
              });
              index += 1;
            });

            subOptions.push({
              id: index,
              name: elem2.Key.MachineGroupName || "undefined",
              subOptions: subOptions2,
            });
            index += 1;
          });
          data.push({
            id: index,
            name: isLocalLanguage(currentLanguage)
              ? elem.Key.LName || "undefined"
              : elem.Key.EName || "undefined",
            subOptions: subOptions,
          });
          index += 1;
        });
        console.log("DEPARTEMNTMACHINEGROUPS ", index);
        setExpandedOption({ [index]: {} });
        const Factory3 = [
          {
            id: index,
            name: t(
              translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.FACTORY
            ),
            data: "",
            subOptions: data,
          },
        ];
        setData(Factory3);
        break;

      default:
        break;
    }
  }, [
    groupBy,
    groups.data.DepartmentMachine,
    groups.data.DepartemntMachineGroups,
    groups.data.DepartemntMachineLines,
    DEPARTMENTMACHINE,
    DEPARTEMNTMACHINELINES,
    DEPARTEMNTMACHINEGROUPS,
  ]);

  const handleGroupDropDown = (item: string) => {
    setGroupBy(item);
  };

  const handleData = useCallback(
    (departmentCheckedList: { id: number; name: string }[]) => {
      // console.log("departmentCheckedList",departmentCheckedList);
      handleMessageParamsIds(departmentCheckedList, "");
    },
    []
  );

  // const handleInputChange = (input: string) => {
  //   setInputText(input);
  // };

  useEffect(() => {
    setInputText(data.description);
  }, [data.description]);

  useEffect(() => {
    handleMessageParamsInput(inputText);
  }, [handleMessageParamsInput, inputText]);

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value.length < 2000) {
      setInputText(event.target.value);
    }
  };

  return (
    <SendMessageContainer>
      <FlexContainer>
        <SelectContainer>
          <ActionDescription>
            {t(
              translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE
                .SELECT_MACHINES
            )}
          </ActionDescription>
        </SelectContainer>
        <SelectContainer>
          <Grouptitle>
            {t(translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.GROUP_BY)}
          </Grouptitle>
          <DropDown
            id={"Grouped by:"}
            data={groupList}
            marginTop={2}
            marginRight={0}
            marginBottom={0}
            marginLeft={0}
            height={40}
            top={38}
            itemSelected={groupBy}
            disableShadow={true}
            disableBorder={true}
            setWidth={true}
            dropDownScrolling={"false"}
            nonPaddingTop={true}
            nonPaddingBottom={true}
            handleSelectItem={(getItemSelected) => {
              handleGroupDropDown(getItemSelected);
            }}
          />
          <ArrowDropDownIcon />
        </SelectContainer>
        <TreeSelectContainer>
          <TreeSelect
            toppingOptions={Data}
            selectedIDS={machineList}
            handleData={handleData}
            expandedOption={expandedOption}
          />
        </TreeSelectContainer>
      </FlexContainer>

      <VerticalLine />

      <FlexContainer>
        <ActionDescription>
          {t(
            translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.WRITE_MESSAGE
          )}
        </ActionDescription>
        <InputContainer>
          <InputDescription
            placeholder={t(
              translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.MESSAGE_TEXT
            )}
            value={inputText}
            onChange={handleChangeTextArea}
          />
        </InputContainer>
      </FlexContainer>
    </SendMessageContainer>
  );
};

export default SelectDepMachine;
