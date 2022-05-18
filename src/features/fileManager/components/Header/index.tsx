import * as Styled from "./style";
import refreshImg from "./../../assets/img/Refresh.svg";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import Button from "../../../../Component/DesignSystem/Buttons";
import dataMappingIcon from "../../assets/img/data-mapping.svg";
import DataMappingModal from "../DataMappingModal/DataMappingModal";
import UploadButton from "./UploadButton/UploadButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectIsAdmin } from "../../redux/selectors";
import { getImportSyncFields, getSyncFileStatus } from "../../redux/slice";

interface IProps {
  onClickAddFile?: () => void;
}

const getMinutes = (data: Date) => {
  const min = data.getMinutes();
  if (min < 10) {
    return "0" + min;
  }
  return min;
};

const Header: FC<IProps> = () => {
  const [showDataMappingModal, setShowDataMappingModal] = useState(false);

  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);

  const lastFetch = new Date();

  const { t } = useTranslation();

  const onDataMapping = () => {
    setShowDataMappingModal(true);
  };

  const onHideDataMappingModal = () => {
    setShowDataMappingModal(false);
  };

  const onRefresh = () => {
    dispatch(getSyncFileStatus());
    dispatch(getImportSyncFields());
  };

  return (
    <Styled.Wrapper>
      <Styled.Logo>
        <Styled.LogoText>
          {t(translations.SyncTool.FileManager)}
        </Styled.LogoText>
        <Styled.LogoTime>
          <Styled.LogoIcon
            src={refreshImg}
            alt="refresh icon"
            onClick={onRefresh}
          />
          <Styled.LogoTimeText>
            {`${t(
              translations.SyncTool.UpdatedAt
            )} ${lastFetch.getHours()}:${getMinutes(lastFetch)}`}
          </Styled.LogoTimeText>
        </Styled.LogoTime>
      </Styled.Logo>
      <Styled.ButtonsContainer>
        {isAdmin && (
          <Button
            variant="secondary"
            label={t(translations.SyncTool.DataMapping)}
            onClick={onDataMapping}
            withIcon
            iconPath={dataMappingIcon}
            iconHeight="24px"
          />
        )}
        <UploadButton />
      </Styled.ButtonsContainer>
      <DataMappingModal
        isOpen={showDataMappingModal}
        handleClose={onHideDataMappingModal}
      />
    </Styled.Wrapper>
  );
};

export default Header;
