import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { SetSelectedMachines } from "../../../slice";
import {
  selectSPCSelectedMachines,
  selectTreeDepartments,
} from "../../../slice/selectors";
import { TreeData, SelectedMachine } from "../../../slice/types";
import TreeDelete from "../../Tree/TreeDelete";
import {
  StyledSelectedMachineWrapper,
  StyledSelectedMachine,
  StyledSelectedMachineTitle,
  StyledSelectedMachineHeader,
} from "./selected-box.styles";
import { getSelectedTreeData } from "../../../utils";

const SelectedMachineBox: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedMachineTreeData, setSelectedMachineTreeData] = useState<
    TreeData[]
  >([]);
  const selectedMachines = useSelector(selectSPCSelectedMachines);
  const treeData = useSelector(selectTreeDepartments);

  useEffect(() => {
    if (treeData.length > 0) {
      const initalTreeData = getSelectedTreeData(selectedMachines, treeData);
      if (selectedMachines.length > 0) {
        setSelectedMachineTreeData(initalTreeData);
      } else {
        setSelectedMachineTreeData([]);
      }
    }
  }, [selectedMachines, dispatch, treeData]);

  const handleData = useCallback(
    async (deleteItem: TreeData) => {
      const tempAfterDelete: SelectedMachine[] = [];
      for (let i = 0; i < selectedMachines.length; i++) {
        if (selectedMachines[i].id !== deleteItem.id) {
          tempAfterDelete.push(selectedMachines[i]);
        }
      }
      dispatch(SetSelectedMachines(tempAfterDelete));
    },
    [selectedMachines, dispatch]
  );

  return (
    <StyledSelectedMachineWrapper>
      <StyledSelectedMachineHeader>
        <StyledSelectedMachineTitle>
          {t(translations.SPC.SELECTED_MACHINES)}
        </StyledSelectedMachineTitle>
        <StyledSelectedMachineTitle>
          {selectedMachines.length ? selectedMachines.length : ""}
        </StyledSelectedMachineTitle>
      </StyledSelectedMachineHeader>
      <StyledSelectedMachine>
        <TreeDelete
          toppingOptions={selectedMachineTreeData}
          handleData={handleData}
        />
      </StyledSelectedMachine>
    </StyledSelectedMachineWrapper>
  );
};

export default SelectedMachineBox;
