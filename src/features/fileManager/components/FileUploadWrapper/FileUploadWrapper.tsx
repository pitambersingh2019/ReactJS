import { useAppSelector } from "../../redux/hooks";
import {
  selectFileUploadError,
  selectUploadedFileName,
} from "../../redux/selectors";
import { FileUploadWrapperContainer } from "./file-upload-wrapper.styles";
import FileUpload from "./FileUpload/FileUpload";
import FileUploadSuccess from "./FileUploadSuccess/FileUploadSuccess";
import UploadErrorComponent from "./UploadError/UploadError";

export default function FileUploadWrapper() {
  const fileUploadError = useAppSelector(selectFileUploadError);
  const uploadedFileName = useAppSelector(selectUploadedFileName);

  function Content() {
    if (fileUploadError) {
      return (
        <UploadErrorComponent
          fileName={uploadedFileName}
          error={fileUploadError}
        />
      );
    }
    if (!fileUploadError && uploadedFileName) {
      return <FileUploadSuccess fileName={uploadedFileName} />;
    }
    return <FileUpload />;
  }

  return (
    <FileUploadWrapperContainer isError={fileUploadError !== undefined}>
      <Content />
    </FileUploadWrapperContainer>
  );
}
