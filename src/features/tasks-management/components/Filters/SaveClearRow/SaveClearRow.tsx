import { useFilter } from "../../../context/useFilter";
import ClearAll from "../ClearAll/ClearAll";
import SaveFilterSet from "../SaveFilterSetButton/SaveFilterSetButton";
import { SaveClearRowContainer } from "./save-clear-row.styles";

export default function SaveClearRow() {
  const { filtersUpdated } = useFilter();

  return (
    <SaveClearRowContainer>
      <SaveFilterSet />
      {filtersUpdated && <ClearAll />}
    </SaveClearRowContainer>
  );
}
