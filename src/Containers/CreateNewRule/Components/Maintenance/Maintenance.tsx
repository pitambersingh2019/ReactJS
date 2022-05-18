import React, { useEffect, useState } from "react";
import {
  DeviationBodyContainer,
  SelectContainer,
  DropDownDeviationContainer,
  SelectPeriodRight,
  SelectPeriodLeft,
  MainteneceContainer,
  DatePickerContainer,
} from "./styles";

import { translations } from "../../../../locales/translations";
import ModalInfo from "../../../../Component/ModalInfo";
import { useTranslation } from "react-i18next";
import { ButtonsContainer, NoteContainer } from "../SelectTriggerDate/styles";
import {
  DropDownDeviationContainerNew,
  SelectTitle,
} from "../Deviation/styles";
import SingleSelect from "../../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../../../Component/DesignSystem/DropDown/types";
import { CancelActionButton, DoneActionButton } from "../SelectAction/styles";
import { useSelector } from "../../../../utils/React2Ang/useCustoms";
import { selectAllMaintenance } from "../../../RuleContainer/slice/selectors";
import InputTextField from "../../../../Component/DesignSystem/InputText";
import { InputType } from "../../../../utils/React2Ang/designSystem/editableTable/Cells/Components/InputText/types";

interface EveryPeriodOfTimeProps {
  editRow: boolean;
  maintenanceTypeEdit: number;
  maintenanceEntityIDEdit: number;
  maintenanceReasonEdit: number;
  noteEdit: string;
  handleDoneActionClicked: (
    maintenanceType: number,
    maintenanceEntityID: number,
    maintenanceReason: number,
    note: string
  ) => void;
  handleClickCancel: () => void;
}

const EveryPeriodOfTime: React.FC<EveryPeriodOfTimeProps> = (props) => {
  const { t } = useTranslation();
  const maintenance = useSelector(selectAllMaintenance);

  const [showModal, setshowModal] = useState(false);
  const [title_content_modal, setTitle_content_modal] = useState({
    Title: "",
    Content: "",
  });
  const [note, setNote] = useState("");

  /*
  const objectList = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET.MACHINE
      ),
      value: 0,
    },
    {
      label: t(translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET.MOLD),
      value: 1,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET.AXSILORY
      ),
      value: 2,
    },
  ];
*/
  const objectPlaceHolder = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET.SELECT_OBJECT
      ),
      value: 0,
    },
  ];

  const [objectClicked, setObjectClicked] = useState("");
  const [objectValueClicked, setObjectValueClicked] = useState(0);
  const [objectSelection, setObjectSelection] = useState("");
  const [objectValueSelection, setObjectValueSelection] = useState(0);

  const [reasonClicked, setReasonClicked] = useState("");
  const [reasonValueClicked, setReasonValueClicked] = useState(0);

  const objectSelectionPlaceHolder = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
          .SELECT_MOLD_PLACEHOLDER
      ),
      value: 0,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
          .SELECT_MACHINE_PLACEHOLDER
      ),
      value: 1,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
          .SELECT_AXSILORY_PLACEHOLDER
      ),
      value: 2,
    },
  ];

  const objectSelectionTitle = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET.SELECT_MOLD
      ),
      value: 0,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
          .SELECT_MACHINE
      ),
      value: 1,
    },
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
          .SELECT_AXSILORY
      ),
      value: 2,
    },
  ];

  const reasonPlaceHolder = [
    {
      label: t(
        translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
          .MAINTENANCE_REASON_PLACEHOLDER
      ),
      value: 0,
    },
  ];

  const [objectList, setObjectList] = useState([{ label: "", value: 0 }]);
  const [machineList, setMachineList] = useState([{ label: "", value: 0 }]);
  const [moldsList, setMoldsList] = useState([{ label: "", value: 0 }]);
  const [auxiliaryList, setAuxiliaryList] = useState([{ label: "", value: 0 }]);
  const [reasonList, setReasonList] = useState([{ label: "", value: 0 }]);
  const [reasonListSorted, setReasonListSorted] = useState<any[]>([]);

  useEffect(() => {
    maintenance.data.ResponseDictionary?.MaintenanceTypes.forEach(
      (element: any) => {
        if (element.MaintenanceTypeName !== null && element !== undefined) {
          setObjectList((prevState) => [
            ...prevState,
            {
              label: element.MaintenanceTypeName,
              value: element.MaintenanceType,
            },
          ]);
        }
      }
    );
    //remove empty first item '' from array
    setObjectList((prevState) => prevState.filter((elem) => elem.label !== ""));

    maintenance.data.ResponseDictionary?.Machines.forEach((element: any) => {
      if (element.MachineName !== null && element !== undefined) {
        machineList.push({
          label: element.MachineName,
          value: element.MachineID,
        });
      }
    });
    //remove empty first item '' from array
    if (machineList[0]?.label === "") {
      machineList.splice(0, 1);
    }
    setMachineList(machineList);

    maintenance.data.ResponseDictionary?.Molds.forEach((element: any) => {
      if (element.MoldName !== null && element !== undefined) {
        moldsList.push({ label: element.MoldName, value: element.MoldID });
      }
    });
    //remove empty first item '' from array
    if (moldsList[0]?.label === "") {
      moldsList.splice(0, 1);
    }
    setMoldsList(moldsList);

    maintenance.data.ResponseDictionary?.Auxiliarys.forEach((element: any) => {
      if (element.AuxiliaryName !== null && element !== undefined) {
        auxiliaryList.push({
          label: element.AuxiliaryName,
          value: element.AuxiliaryID,
        });
      }
    });
    //remove empty first item '' from array
    if (auxiliaryList[0]?.label === "") {
      auxiliaryList.splice(0, 1);
    }
    setAuxiliaryList(auxiliaryList);

    maintenance.data.ResponseDictionary?.MaintenaceReasons.forEach(
      (element: any) => {
        if (element.MaintenanceReasonName !== null && element !== undefined) {
          setReasonList((prevState) => [
            ...prevState,
            {
              label: element.MaintenanceReasonName,
              value: element.MaintenanceReason,
            },
          ]);
        }
      }
    );
    //remove empty first item '' from array
    setReasonList((prevState) => prevState.filter((elem) => elem.label !== ""));
  }, [
    maintenance.data.ResponseDictionary?.MaintenanceTypes,
    maintenance.data.ResponseDictionary?.Machines,
    maintenance.data.ResponseDictionary?.Molds,
    maintenance.data.ResponseDictionary?.Auxiliaries,
    maintenance.data.ResponseDictionary?.MaintenaceReasons,
  ]);

  useEffect(() => {
    if (props.editRow) {
      objectList.forEach((element) => {
        if (element.value === props.maintenanceTypeEdit) {
          setObjectClicked(element.label);
          setObjectValueClicked(props.maintenanceTypeEdit);

          setReasonListSorted([]);
          maintenance.data.ResponseDictionary?.MaintenaceReasons.forEach(
            (element: any) => {
              if (
                element.MaintenanceReasonName !== null &&
                element !== undefined
              ) {
                if (
                  element.MaintenanceType === props.maintenanceTypeEdit ||
                  element.MaintenanceType === 0
                ) {
                  setReasonListSorted((prevState) => [
                    ...prevState,
                    {
                      label: element.MaintenanceReasonName,
                      value: element.MaintenanceReason,
                    },
                  ]);
                }
              }
            }
          );
          //remove empty first item '' from array
          setReasonListSorted((prevState) =>
            prevState.filter((elem) => elem.label !== "")
          );
        }
      });

      if (props.maintenanceTypeEdit === 1) {
        moldsList.forEach((element) => {
          if (element.value === props.maintenanceEntityIDEdit) {
            setObjectSelection(element.label);
          }
        });
      } else if (props.maintenanceTypeEdit === 2) {
        machineList.forEach((element) => {
          if (element.value === props.maintenanceEntityIDEdit) {
            setObjectSelection(element.label);
          }
        });
      } else if (props.maintenanceTypeEdit === 3) {
        auxiliaryList.forEach((element) => {
          if (element.value === props.maintenanceEntityIDEdit) {
            setObjectSelection(element.label);
          }
        });
      }
      setObjectValueSelection(props.maintenanceEntityIDEdit);

      reasonList.forEach((element) => {
        if (element.value === props.maintenanceReasonEdit) {
          setReasonClicked(element.label);
          setReasonValueClicked(props.maintenanceReasonEdit);
        }
      });

      setNote(props.noteEdit);
    }
  }, [props.editRow]);
  /*
  useEffect(() => {
    //fetch machine data
    tasks.data.ResponseDictionaryDT?.Machines.forEach((element) => {
      if (element.MachineName !== "" && element.MachineName !== null) {
        if (isLocalLanguage(currentLanguage)) {
          machineList.push({ label: element.MachineLName, value: element.ID });
        } else {
          machineList.push({ label: element.MachineName, value: element.ID });
        }
      }
    });
    //remove empty first item '' from array
    if (machineList[0]?.label === "") {
      machineList.splice(0, 1);
    }
    setMachineList(machineList);

    //fetch Mold data
    if (tasks.data.ResponseDictionaryDT?.Molds !== undefined) {
      if (tasks.data.ResponseDictionaryDT?.Molds.length > 0) {
        tasks.data.ResponseDictionaryDT?.Molds.forEach((element) => {
          if (element.EName !== "" && element.EName !== null) {
            if (isLocalLanguage(currentLanguage)) {
              moldsList.push({ label: element.LName, value: element.ID });
            } else {
              moldsList.push({ label: element.EName, value: element.ID });
            }
          }
        });
      }
    }
    //remove empty first item '' from array
    if (moldsList[0]?.label === "") {
      moldsList.splice(0, 1);
    }
    setMoldsList(moldsList);

    //fetch Auxiliary data
    if (tasks.data.ResponseDictionaryDT?.Auxiliaries !== undefined) {
      if (tasks.data.ResponseDictionaryDT?.Auxiliaries.length > 0) {
        tasks.data.ResponseDictionaryDT?.Auxiliaries.forEach((element) => {
          if (element.Name !== "" && element.Name !== null) {
            auxiliaryList.push({ label: element.Name, value: element.ID });
          }
        });
      }
    }

    //remove empty first item '' from array
    if (auxiliaryList[0]?.label === "") {
      auxiliaryList.splice(0, 1);
    }
    setAuxiliaryList(auxiliaryList);
  }, [
    tasks.data.ResponseDictionaryDT?.Machines,
    tasks.data.ResponseDictionaryDT?.Molds,
    tasks.data.ResponseDictionaryDT?.Auxiliaries,
  ]);
*/

  const handleClickDone = () => {
    if (
      objectValueClicked !== 0 &&
      objectValueSelection !== 0 &&
      reasonValueClicked !== 0
    ) {
      //if wasn't selected date and it wasn't edited then change current date this format
      if (!props.editRow) {
        console.log("dateFormat ");
      }
      props.handleDoneActionClicked(
        objectValueClicked,
        objectValueSelection,
        reasonValueClicked,
        note
      );
    } else {
      setTitle_content_modal({
        Title: t(translations.RulesContainer.InfoModals.TITLE_MESSAGE7),
        Content: t(translations.RulesContainer.InfoModals.CONTENT_MESSAGE),
      });
      setshowModal(true);
      return;
    }
  };

  // This function is called when the input changes
  //event: React.ChangeEvent<HTMLInputElement>
  const inputNoteHandler = (enterText: string) => {
    //const enterText = event.target.value;
    setNote(enterText);
  };

  const handleSelectObject = (item: string, value: number) => {
    setObjectClicked(item);
    setObjectValueClicked(value);
    //reset selection
    setObjectSelection("");
    setObjectValueSelection(0);
    //reset reason
    setReasonListSorted([]);
    setReasonClicked("");
    setReasonValueClicked(0);

    maintenance.data.ResponseDictionary?.MaintenaceReasons.forEach(
      (element: any) => {
        if (element.MaintenanceReasonName !== null && element !== undefined) {
          if (
            element.MaintenanceType === value ||
            element.MaintenanceType === 0
          ) {
            setReasonListSorted((prevState) => [
              ...prevState,
              {
                label: element.MaintenanceReasonName,
                value: element.MaintenanceReason,
              },
            ]);
          }
        }
      }
    );
    //remove empty first item '' from array
    setReasonListSorted((prevState) =>
      prevState.filter((elem) => elem.label !== "")
    );
  };

  const handleSelectObjectSelection = (item: string, value: number) => {
    setObjectSelection(item);
    setObjectValueSelection(value);
  };

  const handleSelectReason = (item: string, value: number) => {
    setReasonClicked(item);
    setReasonValueClicked(value);
  };

  return (
    <MainteneceContainer>
      <DeviationBodyContainer>
        <SelectContainer>
          <SelectPeriodLeft>
            <SelectTitle>
              {t(
                translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
                  .OBJECT
              )}
            </SelectTitle>
            <DropDownDeviationContainer>
              <SingleSelect
                placeholder={
                  objectClicked === "" ? objectPlaceHolder[0].label : ""
                }
                required={false}
                selectedItem={
                  objectClicked !== ""
                    ? {
                        label: objectClicked,
                        value: objectValueClicked,
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
                    handleSelectObject(item.label, item.value);
                  } else {
                    setObjectClicked("");
                    setObjectValueClicked(0);
                    //reset also reasons
                    setReasonListSorted([]);
                  }
                }}
                TitleText={""}
                items={objectList}
                mode={DropDownMode.selectable}
              />
            </DropDownDeviationContainer>
          </SelectPeriodLeft>
          {objectClicked !== "" ? (
            <SelectPeriodRight>
              <SelectTitle>
                {objectSelectionTitle[objectValueClicked - 1].label}
              </SelectTitle>
              <DropDownDeviationContainer>
                <SingleSelect
                  placeholder={
                    objectSelection === ""
                      ? objectSelectionPlaceHolder[objectValueClicked - 1].label
                      : ""
                  }
                  required={false}
                  selectedItem={
                    objectSelection !== ""
                      ? {
                          label: objectSelection,
                          value: objectValueSelection,
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
                      handleSelectObjectSelection(item.label, item.value);
                    } else {
                      setObjectSelection("");
                      setObjectValueSelection(0);
                    }
                  }}
                  TitleText={""}
                  items={
                    objectValueClicked === 1
                      ? moldsList
                      : objectValueClicked === 2
                      ? machineList
                      : auxiliaryList
                  }
                  mode={DropDownMode.selectable}
                />
              </DropDownDeviationContainer>
            </SelectPeriodRight>
          ) : (
            <SelectPeriodRight></SelectPeriodRight>
          )}
        </SelectContainer>
        <SelectContainer>
          <SelectPeriodLeft>
            <SelectTitle paddingTop={8}>
              {t(
                translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
                  .MAINTENANCE_REASON
              )}
            </SelectTitle>
            <DropDownDeviationContainer>
              <SingleSelect
                placeholder={
                  reasonClicked === "" ? reasonPlaceHolder[0].label : ""
                }
                required={false}
                selectedItem={
                  reasonClicked !== ""
                    ? {
                        label: reasonClicked,
                        value: reasonValueClicked,
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
                    handleSelectReason(item.label, item.value);
                  } else {
                    setReasonClicked("");
                    setReasonValueClicked(0);
                  }
                }}
                TitleText={""}
                items={reasonListSorted}
                mode={DropDownMode.selectable}
              />
            </DropDownDeviationContainer>
          </SelectPeriodLeft>
          <SelectPeriodRight>
            <DatePickerContainer>
              <SelectTitle>
                {t(
                  translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
                    .NOTE
                )}
              </SelectTitle>
              <DropDownDeviationContainerNew>
                <InputTextField
                  placeholder={t(
                    translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
                      .NOTE_PLACEHOLDER
                  )}
                  required={false}
                  TitleText={""}
                  value={note}
                  onChange={inputNoteHandler}
                  maxLength={40}
                  type={InputType.text}
                />
              </DropDownDeviationContainerNew>
              {/*<AmountOfTimeInput*/}
              {/*  placeholder={t(*/}
              {/*    translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET*/}
              {/*      .NOTE_PLACEHOLDER*/}
              {/*  )}*/}
              {/*  value={note}*/}
              {/*  onChange={inputNoteHandler}*/}
              {/*/>*/}
            </DatePickerContainer>
          </SelectPeriodRight>
        </SelectContainer>
      </DeviationBodyContainer>
      <NoteContainer>
        <div></div>
        <ButtonsContainer>
          <CancelActionButton onClick={() => props.handleClickCancel()}>
            {t(translations.RulesContainer.CREATE_RULE.CANCEL)}
          </CancelActionButton>

          <ModalInfo
            TitleText={title_content_modal.Title}
            ContentText={title_content_modal.Content}
            showModal={showModal}
            setshowModal={setshowModal}
          >
            <DoneActionButton onClick={handleClickDone}>
              {t(translations.RulesContainer.CREATE_RULE.DONE)}
            </DoneActionButton>
          </ModalInfo>
        </ButtonsContainer>
      </NoteContainer>
    </MainteneceContainer>
  );
};

export default EveryPeriodOfTime;
