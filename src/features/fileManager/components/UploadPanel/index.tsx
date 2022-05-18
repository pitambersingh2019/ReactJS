import { ClickAwayListener } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { selectIsValidationMappingError } from "../../redux/selectors";
import ActionButtons from "./ActionButtons/ActionButtons";
import { Arrow, UploadPanelContainer } from "./styles";
import TableNameSelector from "./TableNameSelector/TableNameSelector";
import UploadZone from "./UploadZone/UploadZone";
import ValidationError from "./ValidationError/ValidationError";

type UploadPanelProps = {
  onClose: () => void;
  onSeeDetails: (fileName: string) => void;
};

export default function UploadPanel({
  onClose,
  onSeeDetails,
}: UploadPanelProps) {
  const isValidationMappingError = useAppSelector(
    selectIsValidationMappingError
  );

  return (
    <ClickAwayListener onClickAway={onClose}>
      <UploadPanelContainer>
        <Arrow />
        {isValidationMappingError ? (
          <ValidationError onClose={onClose} onSeeDetails={onSeeDetails} />
        ) : (
          <>
            <TableNameSelector />
            <UploadZone />
            <ActionButtons onClose={onClose} />
          </>
        )}
      </UploadPanelContainer>
    </ClickAwayListener>
  );
}
