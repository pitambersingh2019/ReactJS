import {
  DragDropInfo,
  FileSizeInfo,
  FileUploadContainer,
  IconWrapper,
  Info,
  UploadIcon,
  Wrapper,
} from "./file-upload.styles";
import uploadIcon from "./../../../assets/img/Upload_File.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import useFileUpload from "../../../hooks/useFileUpload";

export default function FileUpload() {
  const { t } = useTranslation();

  const { getRootProps, isDragAccept, getInputProps, open } = useFileUpload();

  return (
    <FileUploadContainer {...getRootProps({ isDragAccept })}>
      <Wrapper>
        <div>
          <input {...getInputProps()} />
          <IconWrapper>
            <UploadIcon src={uploadIcon} alt="upload icon" />
          </IconWrapper>
          <DragDropInfo>
            {t(translations.SyncTool.DragDropToUpload)},{" "}
            {t(translations.SyncTool.Or)}{" "}
            <span onClick={open}>{t(translations.SyncTool.Browse)}</span>{" "}
            {t(translations.SyncTool.SelectFile)}
          </DragDropInfo>
          <FileSizeInfo>
            {t(translations.SyncTool.SupportedFileTypes)}
          </FileSizeInfo>
          <FileSizeInfo>{t(translations.SyncTool.MaxFileSize)}</FileSizeInfo>
        </div>
        <Info>
          {t(translations.SyncTool.CSVInfo)}
          <br />
          {t(translations.SyncTool.TXTInfo)}
        </Info>
      </Wrapper>
    </FileUploadContainer>
  );
}
