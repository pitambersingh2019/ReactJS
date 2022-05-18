import React from "react";
import {
  Popup,
  Popuptitlecontainer,
  Popuptitle,
  Popupbottom,
  Popupcancel,
  Popupdelete,
} from "./styles";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";

interface PopupDeleteProps {
  id: number;
  handlePopUpClicked: (title: string) => void;
}

const PopupDelete: React.FC<PopupDeleteProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Popup>
      <Popuptitlecontainer>
        <Popuptitle>
          {t(translations.RulesContainer.CARD.ARE_YOU_SURE_DELETE)}
        </Popuptitle>
      </Popuptitlecontainer>
      <Popupbottom>
        <Popupcancel onClick={() => props.handlePopUpClicked("cancel")}>
          {" "}
          {t(translations.RulesContainer.CARD.CANCEL)}
        </Popupcancel>
        <Popupdelete onClick={() => props.handlePopUpClicked("delete")}>
          {t(translations.RulesContainer.CARD.DELETE)}
        </Popupdelete>
      </Popupbottom>
    </Popup>
  );
};

export default PopupDelete;
