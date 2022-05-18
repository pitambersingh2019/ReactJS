import { useCallback, useEffect, useState } from "react";
import { useDropzone, ErrorCode, FileRejection } from "react-dropzone";
import { useTranslation } from "react-i18next";
import UploadProgressBar from "../../../../../../Component/DesignSystem/UploadProgressBar";
import { translations } from "../../../../../../locales/translations";
import useUploadFile from "../../../../hooks/useUploadFile";
import {
  Error,
  FileSize,
  InfoText,
  UploadingContainer,
  UploadZoneContainer,
  UploadZoneTitle,
} from "./upload-zone.styles";

type UploadZoneProps = {
  taskId?: number;
  getTaskFiles: (taskId: number) => void;
  onAddFile: (files: File[]) => void;
};

export default function DropZone({
  taskId,
  getTaskFiles,
  onAddFile,
}: UploadZoneProps) {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [uploadingInfo, setUploadingInfo] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const { status, uploadFile, progress, onAbort } = useUploadFile();

  useEffect(() => {
    const makeUploadingInfo = () => {
      const totalMB = Math.round((fileSize / 1000000) * 10) / 10; //one decimal
      const uploadedBytes = (fileSize * progress) / 100;
      const uploadedMB = Math.round((uploadedBytes / 1000000) * 10) / 10;
      return `${uploadedMB}MB of ${totalMB}MB`;
    };

    setUploadingInfo(makeUploadingInfo());
  }, [progress, fileSize]);

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections?.length < 1 && acceptedFiles?.length > 0) {
        const fullFileName = acceptedFiles[0].name.replaceAll(" ", "_");
        setFileName(fullFileName);
        setFileSize(acceptedFiles[0].size);

        const onSuccess = () => {
          taskId && getTaskFiles(taskId);
        };

        if (taskId) {
          await uploadFile(
            { fullFileName, taskId, file: acceptedFiles[0] },
            onSuccess
          );
        } else {
          onAddFile(acceptedFiles);
        }
      }
    },
    [taskId, uploadFile, getTaskFiles, onAddFile]
  );

  const { getRootProps, getInputProps, isDragAccept, open, fileRejections } =
    useDropzone({
      noClick: true,
      maxFiles: 1,
      maxSize: 5000000,
      onDrop,
    });

  const { t } = useTranslation();

  useEffect(() => {
    if (fileRejections.length < 1) {
      setError(undefined);
    } else {
      fileRejections.forEach(({ errors }) => {
        const tooLarge = errors.find((e) => e.code === ErrorCode.FileTooLarge);
        const tooMany = errors.find((e) => e.code === ErrorCode.TooManyFiles);
        if (tooLarge) {
          setError(t(translations.TasksManagement.FileSizeError));
        }
        if (tooMany) {
          setError(t(translations.TasksManagement.MaxFilesError));
        }
      });
    }
  }, [fileRejections, t]);

  return (
    <>
      <UploadZoneTitle>
        {t(translations.TasksManagement.UploadFile)}
      </UploadZoneTitle>
      <UploadZoneContainer {...getRootProps({ isDragAccept })}>
        {status === "loading" ? (
          <UploadingContainer>
            <UploadProgressBar
              fileName={fileName}
              completed={progress}
              info={uploadingInfo}
              onAbort={onAbort}
            />
          </UploadingContainer>
        ) : (
          <>
            <input {...getInputProps()} />
            <InfoText>
              {t(translations.TasksManagement.DragDropContent)}{" "}
              <span className="browse" onClick={open}>
                {t(translations.TasksManagement.Browse)}
              </span>{" "}
              {t(translations.TasksManagement.File)}
            </InfoText>
            <FileSize>{t(translations.TasksManagement.MaxFileSize)}</FileSize>
          </>
        )}
      </UploadZoneContainer>
      <Error>{error}</Error>
    </>
  );
}
