import {
  ErrorIcon,
  ErrorInfo,
  FileName,
  UploadErrorContainer,
} from "./upload-error.styles";
import errorIcon from "../../../assets/img/Warning_Error.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import type { UploadError } from "../../../ts";

type UploadErrorProps = {
  fileName: string;
  error: UploadError;
};

export default function UploadErrorComponent({
  fileName,
  error,
}: UploadErrorProps) {
  const { t } = useTranslation();
  return (
    <UploadErrorContainer>
      <ErrorIcon src={errorIcon} alt="error icon" />
      <FileName>
        {fileName} {t(translations.SyncTool.NotAdded)}
      </FileName>

      <ErrorInfo>
        {error === "type" &&
          `${t(translations.SyncTool.IncorrectFileType)}  ${t(
            translations.SyncTool.SupportedFiles
          )}`}
        {error === "size" && `${t(translations.SyncTool.ExceedsLimit)}`}
        <br />
        {t(translations.SyncTool.AddCorrect)}
      </ErrorInfo>
    </UploadErrorContainer>
  );
}
