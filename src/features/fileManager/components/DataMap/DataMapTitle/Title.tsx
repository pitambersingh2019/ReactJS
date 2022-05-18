import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { InfoIcon, InfoModal, TitleContainer, TitleText } from "./title.styles";
import infoIcon from "../../../assets/img/info.svg";
import { useState } from "react";

export default function Title() {
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();

  const onShowModal = () => {
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  return (
    <TitleContainer>
      <TitleText>{t(translations.SyncTool.MapYourData)}</TitleText>
      <InfoIcon
        src={infoIcon}
        alt="info icon"
        onMouseEnter={onShowModal}
        onMouseLeave={onHideModal}
      />
      {showModal && (
        <InfoModal>{t(translations.SyncTool.MapDataInfo)}</InfoModal>
      )}
    </TitleContainer>
  );
}
