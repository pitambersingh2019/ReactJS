// import { Item } from "../../../../../Component/DesignSystem/DropDown/types";
// import { useDisplayForm } from "../../../context/useDisplayForm";
// import MachineParamRow from "../MachineParamRow/MachineParamRow";
import { Container } from "./spc-display.styles";

export default function SPCDisplay() {
  // const {
  //   spcDisplay: { selectedMachine, selectedParam },
  //   setSPCDisplay,
  // } = useDisplayForm();

  // const setSelectedMachine = (machine: Item | undefined) => {
  //   setSPCDisplay((prev) => ({
  //     ...prev,
  //     selectedMachine: machine,
  //   }));
  // };

  // const setSelectedParam = (param: Item | undefined) => {
  //   setSPCDisplay((prev) => ({
  //     ...prev,
  //     selectedParam: param,
  //   }));
  // };

  // const props = {
  //   selectedMachine,
  //   setSelectedMachine,
  //   selectedParam,
  //   setSelectedParam,
  // };

  return <Container>{/* <MachineParamRow {...props} /> */}</Container>;
}
