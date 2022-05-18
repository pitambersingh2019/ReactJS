import { useSelector } from "react-redux";
import { selectSPCStep } from "../../slice/selectors";
import SelectionBox from "../SelectionBox/SelectionBox";
import ConfigurationBox from "../ConfigurationBox/ConfigurationBox";

const SPCContentWrapper: React.FC = () => {
  const step = useSelector(selectSPCStep);
  return (
    <>
      {(step === 1 || step === 3) && <SelectionBox />}
      {step === 2 && <ConfigurationBox />}
    </>
  );
};

export default SPCContentWrapper;
