import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EditableInput from "../../../../../Component/DesignSystem/EditableInput";
import { translations } from "../../../../../locales/translations";
import { AUTO_NAME_DIVIDER } from "../../../constants";
import { useDisplayForm } from "../../../context/useDisplayForm";
import { useDisplayType } from "../../../context/useDisplayType";
import { useEditMode } from "../../../context/useEditMode";
import { isEmpty } from "../../../utils/export-utils";
import Chip from "../../shared/Chip/Chip";
import DeleteIcon from "../DeleteIcon/DeleteIcon";
import DeleteDisplayModal from "./DeleteDisplayModal";
import { SideContainer, FormSummaryContainer } from "./form-summary.styles";

type FormSummaryProps = {
  expanded: boolean;
};

export default function FormSummary({ expanded }: FormSummaryProps) {
  const [displayName, setDisplayName] = useState("");
  const [tooltipValue, setTooltipValue] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { pcDisplay, spcDisplay, setPCDisplay, setSPCDisplay } =
    useDisplayForm();

  const isPCDisplay = !isEmpty(pcDisplay);

  const {
    onDeleteDisplay,
    activeDashboard: { PCDisplays },
  } = useEditMode();

  const { t } = useTranslation();

  const { selectedDisplayType } = useDisplayType();

  const getChipLabel = () => {
    if (isPCDisplay) {
      return t(translations.ProcessControlDashboard.PC);
    }
    if (!isEmpty(spcDisplay)) {
      return t(translations.ProcessControlDashboard.SPC);
    }

    return selectedDisplayType?.name === "SPC"
      ? t(translations.ProcessControlDashboard.SPC)
      : t(translations.ProcessControlDashboard.PC);
  };

  const handleDeleteDisplay = () => {
    const id = isPCDisplay ? pcDisplay.DisplayID : spcDisplay.id;
    const type = isPCDisplay ? "PC" : "SPC";
    onDeleteDisplay(id, type);
  };

  const updateDisplayName = (value: string) => {
    if (isPCDisplay) {
      setPCDisplay((prev) => ({
        ...prev,
        DisplayName: value,
      }));
    } else {
      setSPCDisplay((prev) => ({
        ...prev,
        name: value,
      }));
    }
  };

  const onCloseDeleteDisplayModal = () => {
    setShowDeleteModal(false);
  };

  const onShowDeleteDisplayModal = () => {
    setShowDeleteModal(true);
  };

  const isEmptyDisplay =
    pcDisplay.PCParams?.length === 0 && PCDisplays.length === 0;

  useEffect(() => {
    if (isPCDisplay) {
      if (pcDisplay.DisplayName.includes(AUTO_NAME_DIVIDER)) {
        const nameArray = pcDisplay.DisplayName.split(AUTO_NAME_DIVIDER);
        setTooltipValue(nameArray.slice(1).join(", "));
        setDisplayName(
          `${nameArray[0]} + ${nameArray.length - 1} ${t(
            translations.ProcessControlDashboard.More
          )}`
        );
      } else {
        setDisplayName(pcDisplay.DisplayName || "");
      }
    } else {
      setDisplayName(spcDisplay.name || "");
    }
  }, [isPCDisplay, pcDisplay.DisplayName, spcDisplay.name, t]);

  return (
    <FormSummaryContainer>
      <EditableInput
        value={displayName}
        onChangeValue={updateDisplayName}
        placeholder={t(translations.ProcessControlDashboard.DisplayName)}
        maxCharacters={30}
        tooltipValue={tooltipValue}
        showEditPencil={expanded}
        maxWidth={500}
        disabledInput={!expanded}
      />
      <SideContainer>
        <Chip label={getChipLabel()} />
        {!expanded && !isEmptyDisplay && (
          <DeleteIcon onDelete={onShowDeleteDisplayModal} />
        )}
      </SideContainer>
      <DeleteDisplayModal
        isOpen={showDeleteModal}
        handleClose={onCloseDeleteDisplayModal}
        onDelete={handleDeleteDisplay}
      />
    </FormSummaryContainer>
  );
}
