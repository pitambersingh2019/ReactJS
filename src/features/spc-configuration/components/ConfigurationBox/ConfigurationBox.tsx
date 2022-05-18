import { useState, useEffect } from "react";
import MachineNav from "./MachineNav/MachineNav";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDetailMachine,
  selectSPCSelectedMachines,
  selectTreeDepartments,
} from "../../slice/selectors";
import {
  SetDetailMachine,
  SetTreeSelectedMachines,
  EndApiCalling,
} from "../../slice";
import { TreeData } from "../../slice/types";
import ConfigurationSet from "./ConfigurationSet/ConfigurationSet";
import { StyledSelectionBox } from "./configuration-box.styles";
import { getSelectedTreeData, getChildList } from "../../utils";

const ConfigurationBox: React.FC = () => {
  const dispatch = useDispatch();
  const activeMachine = useSelector(selectDetailMachine);
  const selectedMachines = useSelector(selectSPCSelectedMachines);
  const treeData = useSelector(selectTreeDepartments);
  const [activeMachineID, setActiveMachineID] = useState<number>();
  const [activeMahcineData, setActiveMachineData] = useState<TreeData>();
  const [parentList, setParentList] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedTreeData, setSelectedTreeData] = useState<TreeData[]>([]);

  useEffect(() => {
    const initalTreeData = getSelectedTreeData(selectedMachines, treeData);
    let tempParent = Object.assign([]);
    initalTreeData[0].subOptions.forEach((ele) => {
      tempParent.push({
        id: ele.id,
        name: ele.name,
      });
    });
    setParentList(tempParent);
    setSelectedTreeData(initalTreeData);
    dispatch(SetTreeSelectedMachines(initalTreeData));
    const childList = getChildList(initalTreeData);
    activeMachineID
      ? dispatch(
          SetDetailMachine(
            childList.find((ele: TreeData) => ele.id === activeMachineID)
          )
        )
      : dispatch(
          SetDetailMachine(initalTreeData[0].subOptions[0].subOptions[0])
        );
  }, [dispatch, treeData, selectedMachines]);

  useEffect(() => {
    if (activeMachine) {
      setActiveMachineID(activeMachine.id);
      setActiveMachineData(activeMachine);
      activeMachineID != activeMachine.id && dispatch(EndApiCalling(undefined));
    }
  }, [activeMachine]);

  return (
    <StyledSelectionBox>
      <MachineNav
        treeData={selectedTreeData}
        activeMachineID={activeMachineID}
      />
      <ConfigurationSet
        parentList={parentList}
        machineData={activeMahcineData}
      />
    </StyledSelectionBox>
  );
};

export default ConfigurationBox;
