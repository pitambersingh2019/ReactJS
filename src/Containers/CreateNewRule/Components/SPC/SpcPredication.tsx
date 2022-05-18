import React, { useEffect, useState } from "react";
import {
  SpcBodyContainer,
  SpcContainer,
  SelectContainer,
  DropDownSpcContainer,
  SelectSpcRight,
  SelectSpcLeft,
} from "./styles";

import { translations } from "../../../../locales/translations";
import ModalInfo from "../../../../Component/ModalInfo";
import { useTranslation } from "react-i18next";
import {
  ButtonsContainer,
  DateTitle,
  DoneButton,
  NoteContainer,
} from "../SelectTriggerDate/styles";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import { ChangeActionContainer } from "../SelectAction/styles";
import { CancelEventButton } from "../SelectTriggerStopMachine/styles";
import { SelectTitle } from "../Deviation/styles";
import SingleSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../../../Component/DesignSystem/DropDown/types";
import { RulesContainerSlice } from "../../../RuleContainer/slice/types";
import { useSelector } from "react-redux";
import {
  selectAllDepartmentMachine,
  selectParametersMachine,
} from "../../../RuleContainer/slice/selectors";
import MultiDropDownSelect from "../../../../Component/DesignSystem/DropDown/MultiSelect";

interface SpcPredicationProps {
  triggerSelected: string;
  addAnotherOne: boolean;
  editRow: boolean;
  machineIDEdit: string;
  parameterIDEdit: string;
  timeIntervalEdit: string;
  handleDoneActionClicked: (
    machineID: string,
    parameterID: string,
    machine: string,
    parameter: string
  ) => void;
  handleClickCancel: () => void;
  handleClickChangeDeviation: () => void;
}

const SpcPredication: React.FC<SpcPredicationProps> = (props) => {
  const { t } = useTranslation();

  const [showModal, setshowModal] = useState(false);
  const [title_content_modal, setTitle_content_modal] = useState({
    Title: "",
    Content: "",
  });
  const [changeTriggerBtn, setChangeTriggerBtn] = useState(false);
  let [machineClicked, setMachineClicked] = useState("");
  let [machineName, setMachineName] = useState("");
  const [machineValueClicked, setMachineValueClicked] = useState(0);
  let [parameterClicked, setParameterClicked] = useState("");
  const [parameterSelected, setParameterSelected] = useState<
    { value: number; label: string }[]
  >([]);
  const [parameterSelectedToSend, setParameterSelectedToSend] = useState<
    number[]
  >([]);
  const [parameterNamesSelected, setParameterNamesSelected] = useState<
    string[]
  >([]);
  //const data = useSelector(selectRuleData);
  const groups: RulesContainerSlice["DepartmentMachine"] = useSelector(
    selectAllDepartmentMachine
  );
  //: RulesContainerSlice["ParametersMachine"]
  const parametersMachines = useSelector(selectParametersMachine);
  // const dispatch = useDispatch();

  const [dataDepartments, setDataDepartments]: any = useState([]);
  const [machineList, setMachineList] = useState([{ label: "", value: 0 }]);
  const [departmentMachine, setDepartmentMachine] = useState([
    { label: "", value: 0 },
  ]);
  const [parametersMachineList, setParametersMachineList]: any = useState([]);
  let [userParameterList, setUserParameterList] = useState([
    { label: "", value: 0 },
  ]);

  const deviationListPlaceHolder = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE
          .SELECT_DEVIATION_MACHINE_PLACEHOLDER
      ),
      value: 0,
    },
  ];

  const deviationParameterPlaceHolder = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE
          .SELECT_DEVIATION_PARAMETER_PLACEHOLDER
      ),
      value: 0,
    },
  ];

  useEffect(() => {
    //if was data then display it
    if (!props.addAnotherOne) {
      //not relevant
    }
    //if was edit then display data
    else if (props.editRow) {
      // to show Change Trigger Button
      setChangeTriggerBtn(true);
      setMachineValueClicked(Number(props.machineIDEdit));
    }
  }, []);

  useEffect(() => {
    let index = 9999;
    const data: any = [];
    groups.data.DepartmentMachine?.forEach((elem) => {
      const subOptions: any[] = [];
      elem.Value.forEach((elem2) => {
        subOptions.push({
          id: elem2.Id,
          name: elem2.MachineLName,
          subOptions: [],
        });
      });
      data.push({
        id: index,
        name: elem.Key.EName,
        subOptions: subOptions,
      });
      index += 1;
    });
    setDataDepartments(data);
    data?.forEach(
      (departments: { id: number; name: string; subOptions: any[] }) => {
        departments.subOptions.forEach((department: any) => {
          departmentMachine.push({
            label: department.name,
            value: department.id,
          });
        });
      }
    );
    //remove empty first item '' from array
    if (departmentMachine[0]?.label === "") {
      departmentMachine.splice(0, 1);
    }
    setDepartmentMachine(departmentMachine);
    console.log("machineList 2");
  }, [groups.data.DepartmentMachine]);

  useEffect(() => {
    if (departmentMachine.length > 0) {
      // to show list data
      setMachineList(departmentMachine);
      //if was data then display it
      if (!props.addAnotherOne) {
        //not relevant
      }
      //if was edit then display data
      else if (props.editRow) {
        getParameterMachine();

        const machineIDDeviation = Number(props.machineIDEdit);
        departmentMachine.forEach((element) => {
          if (element.value === machineIDDeviation) {
            setMachineName(element.label);
            setMachineClicked(element.label);
            console.log("element machineList", element);
          }
        });

        const strToArray = props.parameterIDEdit.split(",");
        console.log("strToArray ", strToArray);
        const nuevo = strToArray.map((i) => Number(i));
        console.log("nuevo ", nuevo);
        setParameterSelectedToSend(nuevo);
        Object.keys(
          parametersMachines.data.ResponseDictionaryValues ?? {}
        ).forEach((key) => {
          const array = parametersMachines?.data?.ResponseDictionaryValues[key];
          (array || []).forEach((element: any) => {
            nuevo.forEach((paramID) => {
              if (element.id === paramID) {
                parameterNamesSelected.push(element.name);
                parameterSelected.push({
                  value: element.id,
                  label: element.name,
                });
              }
            });
          });
        });
        setParameterNamesSelected(parameterNamesSelected);
        setParameterSelected(parameterSelected);
        console.log("parameterSelected ", parameterSelected);
      }
    }
  }, []);

  const getParameterMachine = () => {
    //reset array
    userParameterList = [{ label: "", value: 0 }];

    Object.keys(parametersMachines.data.ResponseDictionaryValues ?? {}).forEach(
      (key) => {
        // console.log(`${key} :`);
        const array = parametersMachines?.data?.ResponseDictionaryValues[key];
        (array || []).forEach((element: any) => {
          if (
            element.machineid === Number(props.machineIDEdit) &&
            element.isspcvalue
          ) {
            //console.log("element ", element);
            userParameterList.push({
              label: element.name,
              value: element.id,
            });
          }
        });
        //remove empty first item '' from array
        if (userParameterList[0]?.label === "") {
          userParameterList.splice(0, 1);
        }
        setUserParameterList(userParameterList);
        setParametersMachineList(userParameterList);
      }
    );
    if (userParameterList.length > 0) {
      // to show list data
      setParametersMachineList(userParameterList);
    }
  };

  useEffect(() => {
    if (userParameterList.length > 1) {
      // to show list data
      setParametersMachineList(userParameterList);
    }
  }, []);

  const handleClickDone = () => {
    if (machineClicked !== "" && parameterSelected.length !== 0) {
      props.handleDoneActionClicked(
        machineValueClicked.toString(),
        parameterSelectedToSend.toString(),
        machineName,
        parameterNamesSelected.toString()
      );
    } else {
      setTitle_content_modal({
        Title: t(translations.RulesContainer.InfoModals.TITLE_MESSAGE4),
        Content: t(translations.RulesContainer.InfoModals.CONTENT_MESSAGE),
      });
      setshowModal(true);
      return;
    }
  };

  const handleSelectParameters = (
    items: { label: string; value: number }[]
  ) => {
    setParameterSelected(items);
    setParameterSelectedToSend([]);
    setParameterNamesSelected([]);
    console.log(items);
    items.forEach((item: { label: string; value: number }) => {
      setParameterSelectedToSend((prevState) => [...prevState, item.value]);
      setParameterNamesSelected((prevState) => [...prevState, item.label]);
    });
  };

  const handleSelectSameMachine = () => {
    setMachineClicked("");
    setMachineValueClicked(0);
    //reset array
    userParameterList = [{ label: "", value: 0 }];
    setUserParameterList(userParameterList);
    setParametersMachineList([]);
    //reset parameters
    setParameterClicked("");

    //reset parameters
    setParameterClicked("");
    setParameterSelected([]);
    setParameterNamesSelected([]);
  };

  const handleSelectMachine = (item: string, value: number) => {
    console.log("item ", item);
    console.log("value ", value);
    dataDepartments?.forEach(
      (departments: { id: number; name: string; subOptions: any[] }) => {
        departments.subOptions.forEach((department: any) => {
          if (item === department.name) {
            console.log("department ", departments.name);
            setMachineClicked(departments.name + ": " + item);
            setMachineName(item);
          }
        });
      }
    );
    setMachineValueClicked(value);
    //reset array
    userParameterList = [{ label: "", value: 0 }];
    //reset parameters
    setParameterClicked("");
    setParameterSelected([]);
    setParameterNamesSelected([]);

    Object.keys(parametersMachines.data.ResponseDictionaryValues ?? {}).forEach(
      (key) => {
        console.log(`${key} :`);
        const array = parametersMachines?.data?.ResponseDictionaryValues[key];
        (array || []).forEach((element: any) => {
          if (element.machineid === value && element.isspcvalue) {
            console.log("element ", element);
            userParameterList.push({
              label: element.name,
              value: element.id,
            });
          }
        });
        //remove empty first item '' from array
        if (userParameterList[0]?.label === "") {
          userParameterList.splice(0, 1);
        }
        setUserParameterList(userParameterList);
        setParametersMachineList(userParameterList);
      }
    );
    if (userParameterList.length > 0) {
      // to show list data
      setParametersMachineList(userParameterList);
    }
    console.log("userParameterList.length ", userParameterList.length);
  };

  return (
    <SpcContainer>
      <DateTitle>
        {props.triggerSelected}
        {changeTriggerBtn ? (
          <ChangeActionContainer
            onClick={() => {
              props.handleClickChangeDeviation();
            }}
          >
            <ShuffleIcon />
            {t(translations.RulesContainer.CREATE_RULE.CHANGE_TRIGGER)}
          </ChangeActionContainer>
        ) : (
          <></>
        )}
      </DateTitle>
      {
        <SpcBodyContainer>
          <SelectContainer>
            <SelectSpcLeft>
              <SelectTitle>
                {t(
                  translations.RulesContainer.CREATE_RULE
                    .SELECT_DEVIATION_MACHINE
                )}
              </SelectTitle>
              <DropDownSpcContainer>
                <SingleSelect
                  placeholder={
                    machineClicked === ""
                      ? deviationListPlaceHolder[0].label
                      : ""
                  }
                  required={false}
                  selectedItem={
                    machineClicked !== ""
                      ? {
                          label: machineClicked,
                          value: machineValueClicked,
                        }
                      : undefined
                  }
                  onSelect={function (
                    item:
                      | {
                          value: number;
                          label: string;
                        }
                      | undefined
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                  ): void {
                    if (item !== undefined) {
                      handleSelectMachine(item.label, item.value);
                    } else {
                      handleSelectSameMachine();
                    }
                  }}
                  TitleText={""}
                  items={machineList}
                  mode={DropDownMode.selectable}
                />
              </DropDownSpcContainer>
            </SelectSpcLeft>
            <SelectSpcRight>
              <SelectTitle>
                {t(
                  translations.RulesContainer.CREATE_RULE
                    .SELECT_DEVIATION_PARAMETER
                )}
              </SelectTitle>
              <DropDownSpcContainer>
                <MultiDropDownSelect
                  placeholder={
                    parameterClicked === ""
                      ? deviationParameterPlaceHolder[0].label
                      : ""
                  }
                  required={false}
                  selectedItems={parameterSelected}
                  onSelect={(items) => {
                    handleSelectParameters(items);
                  }}
                  TitleText={""}
                  items={parametersMachineList}
                  mode={DropDownMode.selectable}
                  searchable={parametersMachineList.length > 0}
                  showSelected={true}
                  showAllText={"Show All"}
                />
              </DropDownSpcContainer>
            </SelectSpcRight>
          </SelectContainer>
        </SpcBodyContainer>
      }
      <NoteContainer>
        <div></div>
        <ButtonsContainer>
          <CancelEventButton onClick={() => props.handleClickCancel()}>
            {t(translations.RulesContainer.CREATE_RULE.CANCEL)}
          </CancelEventButton>

          <ModalInfo
            TitleText={title_content_modal.Title}
            ContentText={title_content_modal.Content}
            showModal={showModal}
            setshowModal={setshowModal}
          >
            <DoneButton onClick={handleClickDone}>
              {t(translations.RulesContainer.CREATE_RULE.DONE)}
            </DoneButton>
          </ModalInfo>
        </ButtonsContainer>
      </NoteContainer>
    </SpcContainer>
  );
};

export default SpcPredication;
