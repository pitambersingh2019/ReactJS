import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import useFileUpload from "../../../hooks/useFileUpload";
import uploadIcon from "./../../../assets/img/Upload_File.svg";
import {
  UploadZoneContainer,
  UploadIcon,
  DragDropInfo,
  FileSizeInfo,
} from "./file-upload.styles";

export default function FileUpload() {
  const { t } = useTranslation();
  const { getRootProps, isDragAccept, open, getInputProps } = useFileUpload();
  return (
    <UploadZoneContainer {...getRootProps({ isDragAccept })}>
      <input {...getInputProps()} />
      <UploadIcon src={uploadIcon} alt="upload icon" />
      <DragDropInfo>
        {t(translations.SyncTool.DragDrop)} {t(translations.SyncTool.Or)}{" "}
        <span onClick={open}>{t(translations.SyncTool.Browse)}</span>{" "}
        {t(translations.SyncTool.File)}
      </DragDropInfo>
      <FileSizeInfo>{t(translations.SyncTool.MaxFileSize)}</FileSizeInfo>
    </UploadZoneContainer>
  );
}
