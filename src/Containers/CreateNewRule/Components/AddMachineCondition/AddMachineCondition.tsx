import React, { useCallback, useEffect, useState } from "react";
import {
  AddMachineConditionContainer,
  ConditionTitle,
  DoneMachineContainer,
  DropDownGroupContainer,
  TreeSelectContainer,
} from "./styles";
import { translations } from "../../../../locales/translations";
import { useTranslation } from "react-i18next";
import {
  ButtonsContainer,
  CancelEventButton,
  DoneEventButton,
  EventSelection,
} from "../SelectTriggerStopMachine/styles";
import ModalInfo from "../../../../Component/ModalInfo";
import { selectAllDepartmentMachine } from "../../../RuleContainer/slice/selectors";
import { useSelector } from "react-redux";
import { RulesContainerSlice } from "../../../RuleContainer/slice/types";
import TreeSelect from "../selectMachine/TreeSelect";
import { Grouptitle, SelectContainer } from "../selectMachine/styles";
import DropDown from "../../../../Component/DropDown/DropDown";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { isLocalLanguage } from "../../../../utils/CommonFunctions";
import { selectLanguage } from "../../../../slice/selectors";

interface AddMachineConditionProps {
  conditionSelected: string;
  handleClickCancel: () => void;
  handleDoneAddMachineCondition: (
    machineIds: string,
    machineNames: string
  ) => void;
  machineIdSelected: string[];
}

const AddMachineCondition: React.FC<AddMachineConditionProps> = (props) => {
  const { t } = useTranslation();
  const [showModal, setshowModal] = useState(false);

  const DEPARTMENTMACHINE = t(
    translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.DEPARTMENT
  );
  const DEPARTEMNTMACHINELINES = t(
    translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.LINE
  );
  const DEPARTEMNTMACHINEGROUPS = t(
    translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.GROUP
  );

  const currentLanguage = useSelector(selectLanguage);
  const groups: RulesContainerSlice["DepartmentMachine"] = useSelector(
    selectAllDepartmentMachine
  );
  const [Data, setData]: any = useState([]);
  const [expandedOption, setExpandedOption] = useState({});
  const [departmentCheckedListLocal, setDepartmentCheckedListLocal] = useState<
    { id: number; name: string }[]
  >([]);
  const [machinesId, setMachinesId] = useState<string[]>([]);
  const [machineSelected, setMachineSelected] = useState<{ id: number }[]>([]);

  const [groupBy, setGroupBy] = useState(DEPARTMENTMACHINE);

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

  // useEffect(() => {
  //   const machinelistReload: any[] = [];
  //   data.subMachinesList.forEach((element: any, i: number) => {
  //     machinelistReload.push({ id: data.subMachinesIDList[i] });
  //   });
  //
  //   setMachineList(machinelistReload);
  // }, [data]);

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

  // useEffect(() => {
  //   let index = 9999;
  //   const data: any = [];
  //
  //   groups.data.DepartmentMachine?.forEach((elem) => {
  //     const subOptions: any[] = [];
  //     elem.Value.forEach((elem2) => {
  //       subOptions.push({
  //         id: elem2.Id,
  //         name: elem2.MachineLName,
  //         subOptions: [],
  //       });
  //     });
  //     data.push({ id: index, name: elem.Key.EName, subOptions: subOptions });
  //     index += 1;
  //   });
  //   setExpandedOption({ [index]: {} });
  //   const Factory = [{ id: index, name: "Factory", subOptions: data }];
  //   setData(Factory);
  // }, []);

  useEffect(() => {
    //if was edit then set data
    if (props.machineIdSelected.length !== 0) {
      props.machineIdSelected.forEach((machine) => {
        const item = { id: Number(machine) };
        machineSelected.push(item);
      });
      setMachineSelected(machineSelected);
    }
  }, []);

  const handleDone = () => {
    const machineNames: string[] = [];

    //if was edit then set data
    if (props.machineIdSelected.length !== 0) {
      groups.data.DepartmentMachine?.forEach((elem) => {
        departmentCheckedListLocal.forEach((machineID) => {
          elem.Value.forEach((elem2) => {
            if (machineID.id.toString() === elem2.Id.toString()) {
              machinesId.push(machineID.id.toString());
              machineNames.push(elem2.MachineLName);
            }
          });
        });
      });
    } else {
      departmentCheckedListLocal.forEach((element) => {
        machinesId.push(element.id.toString());
        machineNames.push(element.name.toString());
      });
    }

    setMachinesId(machinesId);

    if (machineNames.length !== 0) {
      {
        props.handleDoneAddMachineCondition(
          machinesId.toString(),
          machineNames.toString()
        );
      }
    }
  };

  const handleGroupDropDown = (item: string) => {
    setGroupBy(item);
    //reset old selected machines
    setDepartmentCheckedListLocal([]);
    setMachineSelected([]);
  };

  const handleData = useCallback(
    (departmentCheckedList: { id: number; name: string }[]) => {
      //  console.log("departmentCheckedList",departmentCheckedList);
      // handleMessageParamsIds(departmentCheckedList,"")

      setDepartmentCheckedListLocal(departmentCheckedList);
    },
    []
  );

  //[{id: 4}]
  return (
    <AddMachineConditionContainer>
      <ConditionTitle>{props.conditionSelected}</ConditionTitle>
      <SelectContainer>
        <DropDownGroupContainer>
          <Grouptitle>
            {t(translations.RulesContainer.CREATE_RULE.SEND_MESSAAGE.GROUP_BY)}
          </Grouptitle>
          <DropDown
            id={"Grouped by machine:"}
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
        </DropDownGroupContainer>
      </SelectContainer>
      <TreeSelectContainer>
        <TreeSelect
          toppingOptions={Data}
          selectedIDS={machineSelected}
          handleData={handleData}
          expandedOption={expandedOption}
        />
      </TreeSelectContainer>

      <DoneMachineContainer>
        <EventSelection></EventSelection>

        <ButtonsContainer>
          <CancelEventButton onClick={props.handleClickCancel}>
            {t(translations.RulesContainer.CREATE_RULE.CANCEL)}
          </CancelEventButton>

          <ModalInfo
            TitleText={t(
              translations.RulesContainer.InfoModals.TITLE_MACHINE_STOP
            )}
            ContentText={t(
              translations.RulesContainer.InfoModals.CONTENT_MACHINE_STOP
            )}
            showModal={showModal}
            setshowModal={setshowModal}
          >
            <DoneEventButton onClick={() => handleDone()}>
              {t(translations.RulesContainer.CREATE_RULE.DONE)}
            </DoneEventButton>
          </ModalInfo>
        </ButtonsContainer>
      </DoneMachineContainer>
    </AddMachineConditionContainer>
  );
};

export default AddMachineCondition;
