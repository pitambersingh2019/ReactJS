import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import closeIcon from "../../../assets/img/Close.svg";
import warningIcon from "../../../assets/img/mapped-warning.svg";
import { useAppSelector } from "../../../redux/hooks";
import { selectUploadedFileName } from "../../../redux/selectors";
import {
  CloseIcon,
  ContentContainer,
  ErrorMessage,
  ValidationErrorContainer,
  WarningIcon,
  Text,
  Details,
} from "./validation-error.styles";

type ValidationErrorProps = {
  onClose: () => void;
  onSeeDetails: (fileName: string) => void;
};

export default function ValidationError({
  onClose,
  onSeeDetails,
}: ValidationErrorProps) {
  const { t } = useTranslation();

  const fileName = useAppSelector(selectUploadedFileName);

  const handleSeeDetails = () => {
    onSeeDetails(fileName);
  };

  return (
    <ValidationErrorContainer>
      <CloseIcon src={closeIcon} alt="close icon" onClick={onClose} />
      <ContentContainer>
        <WarningIcon src={warningIcon} alt="warning icon" />
        <ErrorMessage>{t(translations.SyncTool.ValidationError)}</ErrorMessage>
        <Text>{t(translations.SyncTool.ValidationErrorInfo)}</Text>
      </ContentContainer>
      <Details onClick={handleSeeDetails}>
        {t(translations.SyncTool.SeeDetails)}
      </Details>
    </ValidationErrorContainer>
  );
}
