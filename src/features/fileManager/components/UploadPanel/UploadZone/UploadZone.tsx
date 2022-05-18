import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { BorderWrapper, Label, UploadZoneWrapper } from "./upload-zone.styles";
import { useAppSelector } from "../../../redux/hooks";
import {
  selectFileUploadError,
  selectIsValidFile,
  selectUploadedFileName,
} from "../../../redux/selectors";
import FileUploadSuccess from "../FileUploadSuccess/FileUploadSuccess";
import UploadErrorComponent from "../UploadError/UploadError";
import FileUpload from "../FileUpload/FileUpload";

export default function UploadZone() {
  const fileUploadError = useAppSelector(selectFileUploadError);
  const uploadedFileName = useAppSelector(selectUploadedFileName);
  const isValidFile = useAppSelector(selectIsValidFile);

  const { t } = useTranslation();

  function Content() {
    if (fileUploadError) {
      return (
        <UploadErrorComponent
          fileName={uploadedFileName}
          error={fileUploadError}
        />
      );
    }
    if (isValidFile) {
      return (
        <BorderWrapper>
          <FileUploadSuccess fileName={uploadedFileName} />
        </BorderWrapper>
      );
    }

    return <FileUpload />;
  }

  return (
    <UploadZoneWrapper>
      <Label>{t(translations.SyncTool.UploadFile)}</Label>
      <Content />
    </UploadZoneWrapper>
  );
}
