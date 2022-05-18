import React, { useEffect, useState } from "react";

import {
  SelectEventContainer,
  EventTitle,
  TriggerEventTitleContainer,
  DoneEventContainer,
  EventSelection,
  CancelEventButton,
  DoneEventButton,
  ButtonsContainer,
  StopGroupTitle,
  StopCauseTitle,
  StopTitlesContainer,
  SelectedCauses,
  SearchContainerNew,
} from "./styles";

import { useSelector } from "../../../../utils/React2Ang/useCustoms";
import { selectRuleData } from "../../slice/index";
import { NewRuleInterface } from "../../slice/index";
import { selectEventReasons } from "../../../RuleContainer/slice/selectors";
import {
  RulesContainerSlice,
  EventsAndGroup,
} from "../../../RuleContainer/slice/types";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import ModalInfo from "../../../../Component/ModalInfo";
import { Scroll } from "../../../../Component/MainStyles";
import { useDebounce } from "../../../../utils/CommonFunctions";
import { ChangeActionContainer } from "../SelectAction/styles";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import SearchFieldLine from "../../../../Component/DesignSystem/SearchFieldLine";
import DropdownCauseMulti from "./DropdownCause";
import DropdownGroupMulti from "./DropdownGroup";

interface SelectTriggerStopMachineProps {
  triggerSelected: string;
  handleDoneStopMachineClicked: (
    stopGroup: string,
    stopCause: string,
    causeIdSelected: number,
    stopReasonID: number[],
    stopReasonNames: string[]
  ) => void;
  handleClickCancel: () => void;
  handleClickChangeTrigger: () => void;
}

const SelectTriggerStopMachine: React.FC<SelectTriggerStopMachineProps> = (
  props
) => {
  const data_state: NewRuleInterface = useSelector(selectRuleData);
  const events_data: RulesContainerSlice["EventsReasons"] =
    useSelector(selectEventReasons);
  const { t } = useTranslation();
  const [showModal, setshowModal] = useState(false);
  // console.log('events_data', events_data);

  let gropeList = [""];
  let gropeIdElementList = [0];
  const [stopGroupList, setStopGroupList] = useState([
    { label: "", value: 0, selected: 0 },
  ]);
  const [stopGroupListOrigen, setStopGroupListOrigen] = useState([
    { label: "", value: 0, selected: 0 },
  ]);
  const [groupSelected, setGroupSelected] = useState("");
  const [groupItemSelected, setGroupItemSelected]: any = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [groupIdSelected, setGroupIdSelected] = useState(0);
  const [groupsIdList, setGroupsIdList] = useState([0]);
  const [groupSelectedIndex, setGroupSelectedIndex] = useState(0);

  let reasonsList: any[] = [];
  let causeElementList = [""];
  let [causesList, setCausesList] = useState([{ label: "", value: 0 }]);
  const [causesMultiList, setCausesMultiList]: any[] = useState([]);
  const [causesSelectedMultiList, setCausesSelectedMultiList]: any[] = useState(
    []
  );
  const [causeSelected, setCauseSelected] = useState(causesList[0]?.label);
  let causeIdElementList = [0];
  let [causesIdList, setCausesIdList] = useState([0]);
  const [causeIdSelected, setCauseIdSelected] = useState(0);
  const [causeIdSelectedList, setCauseIdSelectedList]: any[] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [numCausesSelected, setNumCausesSelected] = useState(0);
  const [causeNameSelectedList, setCauseNameSelectedList]: any[] = useState([]);

  const [itemSelected, setItemSelected] = useState(false);

  const [fetchData, setFetchData] = useState(false);

  const [indexText, setIndexText] = useState("");
  const [changeTriggerBtn, setChangeTriggerBtn] = useState(false);

  const reasonsAndGroups: RulesContainerSlice["EventsReasons"] =
    useSelector(selectEventReasons);
  const getKeyValue =
    <U extends keyof T, T extends object>(key: U) =>
    (obj: T) =>
      obj[key];
  let key: keyof EventsAndGroup = "EName";
  const [causeList, setCauseList] = useState([{ group: "", cause: "", id: 0 }]);
  let [causeSearchList, setCauseSearchList] = useState([
    { group: "", cause: "", id: 0 },
  ]);

  const debouncedSearch = useDebounce(
    (causeSearchList: any[], indexTextParam: string) => {
      console.log("indexTextParam ", indexTextParam);
      setCauseSearchList(causeSearchList);

      const stopGroupSearch = stopGroupList;
      setStopGroupList([]);
      if (indexTextParam === "") {
        setStopGroupList(stopGroupListOrigen);
        setCausesMultiList([]);
      } else {
        let stopGroupResult = [{ label: "", value: 0, selected: 0 }];
        causeSearchList.forEach((eleme) => {
          // check old stopGroupList to get selected causes
          stopGroupSearch.forEach((group) => {
            if (group.label === eleme.group) {
              //to prevent add duplicate group
              let flag = false;
              stopGroupResult.forEach((result) => {
                if (result.label === group.label) {
                  flag = true;
                }
              });
              if (!flag) {
                stopGroupResult.push({
                  label: eleme.group,
                  value: group.value,
                  selected: group.selected,
                });
              }

              console.log("stopGroupList44 ", stopGroupResult);
            }
          });

          //remove empty item
          if (stopGroupResult[0].label === "") {
            stopGroupResult.splice(0, 1);
          }
          setStopGroupList(stopGroupResult);
          setCausesMultiList((prevState: any) => [
            ...prevState,
            { label: eleme.cause, value: eleme.id },
          ]);
        });
      }
    },
    600
  );

  useEffect(() => {
    //get reason
    reasonsAndGroups.data.EventsAndGroups?.forEach((elementreason) => {
      elementreason.Reasons?.forEach((elemreason2) => {
        const getName = getKeyValue<keyof EventsAndGroup, EventsAndGroup>(key)(
          elemreason2
        );
        if (getName !== null && getName !== undefined) {
          causeList.push({
            group: elementreason.EName,
            cause: String(getName),
            id: elemreason2.ID,
          });
        }
      });
    });

    setCauseList(causeList);
  }, [reasonsAndGroups.data.EventsAndGroups]);

  useEffect(() => {
    //fetch data only one time
    if (!fetchData) {
      events_data.data?.EventsAndGroups?.forEach((element: any) => {
        gropeList.push(element.EName);
        gropeIdElementList.push(element.ID);
      });

      //fetch stop Group data
      for (let i = 1; i < gropeList.length; i++) {
        stopGroupList.push({ label: gropeList[i], value: i, selected: 0 });
        stopGroupListOrigen.push({
          label: gropeList[i],
          value: i,
          selected: 0,
        });
        groupsIdList.push(gropeIdElementList[i]);
      }

      //remove empty first item '' from array
      if (stopGroupList[0]?.label === "") {
        stopGroupList.splice(0, 1);
        stopGroupListOrigen.splice(0, 1);
        setGroupSelected(stopGroupList[0].label);
        groupsIdList.splice(0, 1);
      }
      setStopGroupList(stopGroupList);
      setStopGroupListOrigen(stopGroupListOrigen);
      setGroupsIdList(groupsIdList);

      //forbidden fetch again
      setFetchData(true);
    }

    events_data.data?.EventsAndGroups?.forEach((element: any) => {
      reasonsList.push(element.Reasons);
    });

    //if was data at state then display it
    if (
      data_state.stopGroup !== "" &&
      data_state.stopGroup !== undefined &&
      !itemSelected
    ) {
      console.log("data_state ", data_state);

      // to show Change Trigger Button
      setChangeTriggerBtn(true);

      setItemSelected(true);

      setCauseIdSelectedList(data_state.stopReasonID);
      setNumCausesSelected(data_state.stopReasonID.length);

      let checkFirstGroupSelected = false;
      let firstGroupSelected = "";
      setCausesSelectedMultiList([]);
      //check all causes ids
      causeList.forEach((causeItem) => {
        data_state.stopReasonID?.forEach((reason) => {
          //if we find cause then update the stopGroupList abut num element selected
          if (causeItem.id === reason) {
            //get names from data_state.stopCause that was saved at edit ar CreateNewRule
            causeNameSelectedList.push(causeItem.cause);

            //get selectedItems to show when click group
            setCausesSelectedMultiList((prevState: any) => [
              ...prevState,
              { label: causeItem.cause, value: reason },
            ]);

            //update the stopGroupList abut num element selected
            stopGroupList.forEach((element) => {
              if (element.label === causeItem.group) {
                element.selected += 1;
                if (!checkFirstGroupSelected) {
                  checkFirstGroupSelected = true;
                  firstGroupSelected = element.label;
                }
              }
            });
          }
        });
      });

      //display first group selected
      setGroupSelected(firstGroupSelected);

      if (causeNameSelectedList[0] === "") {
        causeNameSelectedList.splice(0, 1);
      }
      setCauseNameSelectedList(causeNameSelectedList);
      //  console.log('causeNames edit ',causeNameSelectedList);
      //display first cause selected
      setCauseSelected(causeNameSelectedList[0]);
    }
  }, [data_state, events_data.data?.EventsAndGroups, gropeList]);

  const handleDone = () => {
    console.log("causeNameSelectedList done ", causeNameSelectedList);
    console.log("causeIdSelectedList done ", causeIdSelectedList);
    let causeNameSelectedListUpdated: string[] = [];
    //check all causes ids
    causeList.forEach((causeItem) => {
      causeIdSelectedList?.forEach((reasonId: number) => {
        //if we find cause then update the stopGroupList abut num element selected
        if (causeItem.id === reasonId) {
          //get names from data_state.stopCause that was saved at edit ar CreateNewRule
          causeNameSelectedListUpdated.push(causeItem.cause);
        }
      });
    });

    if (causeIdSelectedList.length > 0) {
      props.handleDoneStopMachineClicked(
        groupSelected,
        causeSelected,
        causeIdSelected,
        causeIdSelectedList,
        causeNameSelectedListUpdated
      );
    } else {
      setshowModal(true);
    }
  };

  // This function is called when the input changes
  const inputSearchHandler = (enterText: string) => {
    //const enterText = event.target.value;
    console.log("enterText ", enterText);
    setIndexText(enterText);
    if (enterText === "") {
      //to show back the causes of group current selected
      if (groupItemSelected !== undefined) {
        handleGroupClicked(groupItemSelected);
      }

      causeSearchList = [{ group: "", cause: "", id: 0 }];
      debouncedSearch(causeSearchList, "");

      //reset num selected to find down again
      stopGroupListOrigen.forEach((element) => {
        element.selected = 0;
      });

      //check all causes ids to show num selected per group
      causeList.forEach((causeItem) => {
        causeIdSelectedList?.forEach((reason: number) => {
          //if we find cause then update the stopGroupList abut num element selected
          if (causeItem.id === reason) {
            //update the stopGroupList abut num element selected
            stopGroupListOrigen.forEach((element) => {
              if (element.label === causeItem.group) {
                element.selected = element.selected + 1;
              }
            });
          }
        });
      });
      setStopGroupListOrigen(stopGroupListOrigen);
    } else {
      causeSearchList = [{ group: "", cause: "", id: 0 }];
      setCauseSearchList(causeSearchList);
      setCausesMultiList([]);

      causeList.forEach((causeItem) => {
        let itemInsensitive = causeItem.cause.toLowerCase();
        let enterTextInsensitive = enterText.toLowerCase();

        if (itemInsensitive.includes(enterTextInsensitive)) {
          causeSearchList.push(causeItem);
        }
      });

      if (causeSearchList[0].cause === "") {
        causeSearchList.splice(0, 1);
      }

      debouncedSearch(causeSearchList, enterText);
    }
  };

  const handleGroupClicked = (itemSelected: {
    label: string;
    value: number;
    selected: number;
  }) => {
    console.log("itemsSelected ", itemSelected);
    //to use it when back from search
    setGroupItemSelected(itemSelected);

    //reset
    setNumCausesSelected(0);
    setCauseSelected("");
    setGroupSelected(itemSelected.label);
    setGroupIdSelected(groupsIdList[itemSelected.value - 1]);
    //to enable select new value
    setItemSelected(true);
    setGroupSelectedIndex(itemSelected.value);

    //clean old data
    causeElementList = [""];
    causeIdElementList = [0];
    causesList = [{ label: "", value: 0 }];
    setCausesList(causesList);
    causesIdList = [0];
    setCausesIdList(causesIdList);
    setCausesMultiList([]);

    console.log("reasonsList.length ", reasonsList.length);
    console.log("itemSelected.value ", itemSelected.value);

    //fetch cause data
    if (reasonsList[itemSelected.value - 1] !== null) {
      reasonsList[itemSelected.value - 1].forEach((element: EventsAndGroup) => {
        causeElementList.push(element.EName);
        causeIdElementList.push(element.ID);
        setCausesMultiList((prevState: any) => [
          ...prevState,
          {
            label: element.EName,
            value: element.ID,
          },
        ]);
      });
    }

    for (let i = 1; i < causeElementList.length; i++) {
      causesList.push({ label: causeElementList[i], value: i });
      causesIdList.push(causeIdElementList[i]);
    }

    //remove empty first item '' from array
    if (causesList[0]?.label === "") {
      causesList.splice(0, 1);
      causesIdList.splice(0, 1);
    }
    setCausesList(causesList);
    setCausesIdList(causesIdList);

    if (indexText === "") {
      if (stopGroupList[itemSelected.value - 1].selected > 0) {
        setNumCausesSelected(stopGroupList[itemSelected.value - 1].selected);
      }
    }
  };

  const handleCausesClicked = (
    itemsSelected: { label: string; value: number }[]
  ) => {
    console.log("itemsSelected ", itemsSelected);
    console.log("causeIdSelectedList ", causeIdSelectedList);
    if (itemsSelected.length !== 0) {
      setCauseIdSelected(itemsSelected[0].value);
      setCauseSelected(itemsSelected[0].label);
    }

    //clean old data to update new
    setCauseIdSelectedList([]);
    setCauseNameSelectedList([]);
    setCausesSelectedMultiList([]);
    itemsSelected.forEach((item) => {
      setCauseIdSelectedList((prevState: any) => [...prevState, item.value]);

      setCauseNameSelectedList((prevState: any) => [
        ...prevState,
        item.label + " ",
      ]);

      //get selectedItems to show when click group
      setCausesSelectedMultiList((prevState: any) => [
        ...prevState,
        { label: item.label, value: item.value },
      ]);
    });

    if (indexText === "" && groupSelectedIndex !== 0) {
      console.log("itemsSelected ", itemsSelected);
      let counter = 0;
      //check all selected items
      itemsSelected.forEach((itemSelected) => {
        //move at all id's to find group
        causeList.forEach((causeItem) => {
          //find group
          if (causeItem.group === stopGroupList[groupSelectedIndex - 1].label) {
            console.log("causeItem.group ", causeItem.group);
            if (causeItem.id === itemSelected.value) {
              if (groupSelectedIndex !== 0) {
                counter += 1;
              }
            }
          }
        });
      });
      stopGroupList[groupSelectedIndex - 1].selected = counter;
      stopGroupListOrigen[groupSelectedIndex - 1].selected = counter;
      setStopGroupList(stopGroupList);
      setStopGroupListOrigen(stopGroupListOrigen);
    } else {
      //reset num selected to find down again
      stopGroupList.forEach((element) => {
        element.selected = 0;
      });

      //check all causes ids to show num selected per group
      causeList.forEach((causeItem) => {
        itemsSelected?.forEach((item: any) => {
          //if we find cause then update the stopGroupList abut num element selected
          if (causeItem.id === item.value) {
            //update the stopGroupList abut num element selected
            stopGroupList.forEach((element) => {
              if (element.label === causeItem.group) {
                element.selected = element.selected + 1;
              }
            });
          }
        });
      });
    }

    setNumCausesSelected(itemsSelected.length);
  };

  return (
    <SelectEventContainer>
      <EventTitle>
        {props.triggerSelected}
        {changeTriggerBtn ? (
          <ChangeActionContainer
            onClick={() => {
              props.handleClickChangeTrigger();
            }}
          >
            <ShuffleIcon />
            {t(translations.RulesContainer.CREATE_RULE.CHANGE_TRIGGER)}
          </ChangeActionContainer>
        ) : (
          <></>
        )}
      </EventTitle>
      {
        <Scroll height={500}>
          <TriggerEventTitleContainer>
            {/*<TriggerEventTitle>*/}
            {/*    {t(translations.RulesContainer.CREATE_RULE.SELECTED_TRIGGER)}*/}
            {/*</TriggerEventTitle>*/}
            {/*<TriggerEventSelectedBox>*/}
            {/*    {props.triggerSelected}*/}
            {/*</TriggerEventSelectedBox>*/}
          </TriggerEventTitleContainer>
          <SearchContainerNew>
            <SearchFieldLine
              placeholder={t(
                translations.RulesContainer.CREATE_RULE.MACHINE_STOPS.SEARCH
              )}
              onChange={inputSearchHandler}
              value={indexText}
              onEnter={undefined}
              size="lg"
            />
          </SearchContainerNew>
          <StopTitlesContainer>
            <div>
              <StopGroupTitle>
                {t(
                  translations.RulesContainer.CREATE_RULE.MACHINE_STOPS
                    .STOP_CAUSES_GROUP
                )}
              </StopGroupTitle>
              <DropdownGroupMulti
                onSelect={(item) => handleGroupClicked(item)}
                items={stopGroupList}
              />
            </div>
            <div>
              <StopCauseTitle>
                {t(
                  translations.RulesContainer.CREATE_RULE.MACHINE_STOPS
                    .STOP_CAUSES
                )}
              </StopCauseTitle>
              <DropdownCauseMulti
                onSelect={(item) => handleCausesClicked(item)}
                items={causesMultiList}
                selectedItems={causesSelectedMultiList}
              />
            </div>
          </StopTitlesContainer>
        </Scroll>
      }
      <DoneEventContainer>
        <EventSelection>
          <SelectedCauses>
            {" "}
            {causeIdSelectedList.length}{" "}
            {t(translations.RulesContainer.CREATE_RULE.STOP_CAUSE_SELECTED)}{" "}
          </SelectedCauses>
        </EventSelection>

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
      </DoneEventContainer>
    </SelectEventContainer>
  );
};

export default SelectTriggerStopMachine;
