import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { translations } from "../../../../../locales/translations";
import { SetDetailMachine, SetStep } from "../../../slice";
import { TreeData } from "../../../slice/types";
import TreeNav from "../../Tree/TreeNav";
import Add from "@material-ui/icons/Add";
import {
  StyledMachineNavWrapper,
  StyledMachineNavHeader,
  StyledSelectedMachineTitle,
  StyledMachineNav,
  StyledAddMachineWrapper,
  StyledAddMachineTitle,
} from "./machine-nav.styles";

interface MachineNavProps {
  treeData: TreeData[];
  activeMachineID: number | undefined;
}
const MachineNav: React.FC<MachineNavProps> = ({
  treeData,
  activeMachineID,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleActiveMachine = useCallback(
    (item: TreeData) => {
      dispatch(SetDetailMachine(item));
    },
    [dispatch]
  );

  const handleSPCStep = (step: 1 | 2 | 3) => {
    dispatch(SetStep(step));
  };

  return (
    <StyledMachineNavWrapper>
      <StyledMachineNavHeader>
        <StyledSelectedMachineTitle>
          {t(translations.SPC.SELECTED_MACHINES)}
        </StyledSelectedMachineTitle>
      </StyledMachineNavHeader>
      <StyledMachineNav>
        <TreeNav
          toppingOptions={treeData}
          handleData={handleActiveMachine}
          activeID={activeMachineID}
        />
      </StyledMachineNav>
      <StyledAddMachineWrapper onClick={() => handleSPCStep(3)}>
        <Add
          style={{
            fontSize: "19px",
            color: "#5900d3",
          }}
        />
        <StyledAddMachineTitle>
          {t(translations.SPC.ADD_MACHINE)}
        </StyledAddMachineTitle>
      </StyledAddMachineWrapper>
    </StyledMachineNavWrapper>
  );
};

export default MachineNav;
