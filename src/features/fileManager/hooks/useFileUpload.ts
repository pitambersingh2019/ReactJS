import { ErrorCode, FileRejection, useDropzone } from "react-dropzone";
import { useAppDispatch } from "../redux/hooks";
import {
  setFileUploadError,
  setIsValidFile,
  setUploadedFileName,
} from "../redux/slice";
import { UploadError } from "../ts";
import useParseFile from "./useParseFile";
import { useCallback, useEffect } from "react";

export default function useFileUpload() {
  const dispatch = useAppDispatch();
  const { parseFile } = useParseFile();

  const onDrop = async (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    if (fileRejections?.length < 1 && acceptedFiles?.length > 0) {
      const fullFileName = acceptedFiles[0].name.replaceAll(" ", "_");
      setFileName(fullFileName);
      dispatch(setIsValidFile(true));
      const file = acceptedFiles[0];
      parseFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragAccept, open, fileRejections } =
    useDropzone({
      noClick: true,
      maxFiles: 1,
      maxSize: 9000000,
      accept: "text/csv,text/plain",
      onDrop,
    });

  const setError = useCallback(
    (error: UploadError) => {
      dispatch(setFileUploadError(error));
    },
    [dispatch]
  );

  const setFileName = useCallback(
    (fileName: string) => {
      dispatch(setUploadedFileName(fileName));
    },
    [dispatch]
  );

  useEffect(() => {
    if (fileRejections.length < 1) {
      setError(undefined);
    } else {
      fileRejections.forEach(({ errors }) => {
        setFileName(fileRejections[0].file.name);
        const tooLarge = errors.find((e) => e.code === ErrorCode.FileTooLarge);
        const invalidType = errors.find(
          (e) => e.code === ErrorCode.FileInvalidType
        );
        if (invalidType) {
          setError("type");
        }
        if (tooLarge) {
          setError("size");
        }
      });
    }
  }, [fileRejections, setError, setFileName]);

  return { getRootProps, getInputProps, isDragAccept, open };
}
