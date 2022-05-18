import { useTranslation } from "react-i18next";
import CustomPopover from "../../../../../../Component/CustomModal/CustomPopover";
import Button from "../../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../../locales/translations";
import { useAppDispatch } from "../../../../redux/hooks";
import { getS3FileObject } from "../../../../redux/slice";
import { getFile } from "../../../../utils";
import ModalHeader from "../../../shared/ModalHeader/ModalHeader";
import {
  ActionsBar,
  Download,
  ErrorLog,
  FileName,
  WrapperScroll,
} from "./sync-error-log-modal.styles";

type SyncErrorLogModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  fileName: string;
  errorLog: string;
  filePath?: string | null;
};

export default function SyncErrorLogModal({
  isOpen,
  handleClose,
  fileName,
  errorLog,
  filePath,
}: SyncErrorLogModalProps) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const onDownload = () => {
    const fileName = filePath?.split("/").pop() || "";
    dispatch(getS3FileObject(fileName))
      .unwrap()
      .then((resp) => getFile(resp.fileURL, fileName));
  };

  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{ width: "880px", minHeight: "640px" }}
    >
      <ModalHeader
        onClose={handleClose}
        title={t(translations.SyncTool.SyncErrors)}
      />
      <FileName>{fileName}</FileName>
      <WrapperScroll>
        <ErrorLog>{errorLog}</ErrorLog>
      </WrapperScroll>
      <ActionsBar>
        <Download onClick={onDownload}>
          {filePath && t(translations.SyncTool.DownloadFile)}
        </Download>

        <Button
          label={t(translations.SyncTool.Okay)}
          onClick={handleClose}
          size="md"
        />
      </ActionsBar>
    </CustomPopover>
  );
}
