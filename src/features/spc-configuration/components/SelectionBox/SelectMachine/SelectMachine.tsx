import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useDispatch, useSelector } from "react-redux";
import { SetSelectedMachines } from "../../../slice";
import {
  selectTreeDepartments,
  selectSPCSelectedMachines,
} from "../../../slice/selectors";
import { SelectedMachine } from "../../../slice/types";
import TreeSelect from "../../Tree/TreeSelect";
import {
  StyledSelectMachineWrapper,
  StyledSelectMachine,
  StyledSelectMachineTitle,
} from "./select-box.styles";

const SelectMachineBox: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [expandedOption, setExpandedOption] = useState({});
  const treeData = useSelector(selectTreeDepartments);
  const selectedMachines = useSelector(selectSPCSelectedMachines);

  useEffect(() => {
    if (treeData.length > 0) {
      const index = treeData[0].id;
      setExpandedOption({ [index]: {} });
    }
  }, [treeData]);

  const handleData = useCallback(
    (departmentCheckedList: SelectedMachine[]) => {
      dispatch(SetSelectedMachines(departmentCheckedList));
    },
    [dispatch]
  );

  return (
    <StyledSelectMachineWrapper>
      <StyledSelectMachineTitle>
        {t(translations.SPC.SELECT_MACHINES)}
      </StyledSelectMachineTitle>
      <StyledSelectMachine>
        <TreeSelect
          toppingOptions={treeData}
          selectedIDS={selectedMachines}
          handleData={handleData}
          expandedOption={expandedOption}
        />
      </StyledSelectMachine>
    </StyledSelectMachineWrapper>
  );
};

export default SelectMachineBox;
