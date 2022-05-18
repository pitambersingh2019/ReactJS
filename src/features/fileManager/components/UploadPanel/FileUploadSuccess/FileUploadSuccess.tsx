import {
  DeleteIcon,
  FileName,
  Label,
  RemoveContainer,
} from "./file-upload-success.styles";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import deleteIcon from "../../../assets/img/delete.svg";
import { useAppDispatch } from "../../../redux/hooks";
import { resetUpload } from "../../../redux/slice";

type FileUploadSuccessProps = {
  fileName: string;
};

export default function FileUploadSuccess({
  fileName,
}: FileUploadSuccessProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onRemove = () => {
    dispatch(resetUpload());
  };
  return (
    <>
      <FileName>{fileName}</FileName>
      <RemoveContainer onClick={onRemove}>
        <DeleteIcon src={deleteIcon} alt="delete icon" />
        <Label>{t(translations.SyncTool.Remove)}</Label>
      </RemoveContainer>
    </>
  );
}
