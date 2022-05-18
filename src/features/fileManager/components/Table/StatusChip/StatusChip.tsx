import { ArrowIcon, StatusChipContainer, Text } from "./status-chip.styles";
import arrowIcon from "../../../assets/img/arrow-red.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useState } from "react";
import SyncErrorLogModal from "./SyncErrorLogModal/SyncErrorLogModal";
import { useAppDispatch } from "../../../redux/hooks";
import { getS3LogFileObject } from "../../../redux/slice";
import { readLogFile } from "../../../utils";

type StatusChipProps = {
  isSynced: boolean;
  logPath: string | null;
  fileName: string;
  filePath: string | null;
};

export default function StatusChip({
  isSynced,
  logPath,
  fileName,
  filePath,
}: StatusChipProps) {
  const [showModal, setShowModal] = useState(false);
  const [errorLog, setErrorLog] = useState("");

  const dispatch = useAppDispatch();

  const onHideModal = () => {
    setShowModal(false);
  };

  const { t } = useTranslation();
  const label = t(translations.SyncTool[isSynced ? "Synced" : "Failed"]);

  const loadLog = async () => {
    if (!isSynced) {
      if (logPath) {
        const fileName = logPath.split("/").pop() || "";
        await dispatch(getS3LogFileObject(fileName))
          .unwrap()
          .then((resp) => readLogFile(resp.fileURL))
          .then((text) => setErrorLog(text));

        setShowModal(true);
      }
    }
  };

  return (
    <StatusChipContainer isSynced={isSynced} onClick={loadLog}>
      <Text isSynced={isSynced}>{label}</Text>
      {!isSynced && <ArrowIcon src={arrowIcon} alt="arrow icon" />}
      <SyncErrorLogModal
        isOpen={showModal}
        handleClose={onHideModal}
        fileName={fileName}
        errorLog={errorLog}
        filePath={filePath}
      />
    </StatusChipContainer>
  );
}
