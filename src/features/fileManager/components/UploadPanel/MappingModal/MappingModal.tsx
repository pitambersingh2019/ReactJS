import { useTranslation } from "react-i18next";
import CustomPopover from "../../../../../Component/CustomModal/CustomPopover";
import { translations } from "../../../../../locales/translations";
import ModalHeader from "../../shared/ModalHeader/ModalHeader";
import attachIcon from "../../../assets/img/add_file_black_CTA.svg";
import MappedTabled from "./MappedTable/MappedTable";
import { ButtonContainer, ContentWrapper, Title } from "./mapping-modal.styles";
import { useAppSelector } from "../../../redux/hooks";
import { selectSelectedInterface } from "../../../redux/selectors";
import Button from "../../../../../Component/DesignSystem/Buttons";

type MappingModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function MappingModal({
  isOpen,
  handleClose,
}: MappingModalProps) {
  const selectedInterface = useAppSelector(selectSelectedInterface);
  const { t } = useTranslation();
  return (
    <CustomPopover
      isOpen={isOpen}
      handleClose={handleClose}
      customStyles={{ width: "880px", minHeight: "640px" }}
    >
      <ModalHeader
        onClose={handleClose}
        title={t(translations.SyncTool.Mapping)}
        icon={attachIcon}
      />
      <ContentWrapper>
        <Title>
          {t(translations.SyncTool.MappingFor)} {selectedInterface?.name}
        </Title>
        {selectedInterface && (
          <MappedTabled tableName={selectedInterface.name} />
        )}
      </ContentWrapper>
      <ButtonContainer>
        <Button
          variant="primary"
          label={t(translations.SyncTool.Okay)}
          onClick={handleClose}
          size="md"
          width="104px"
        />
      </ButtonContainer>
    </CustomPopover>
  );
}
