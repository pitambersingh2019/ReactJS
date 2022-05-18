import React from "react";
import {
  Popup,
  Popup_title,
  Popup_subTitle,
  Popup_bottom,
  Popup_cancel,
  Popup_delete,
} from "./styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";

interface PopupDeleteSebTaskProps {
  id: string;
  handlePopUpClicked: (title: string) => void;
}

const PopupDeleteSebTask: React.FC<PopupDeleteSebTaskProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Popup id={props.id}>
      <DeleteIcon />

      <Popup_title>
        {t(translations.RulesContainer.CREATE_RULE.DELETE_SUB_TASK)}
      </Popup_title>
      <Popup_subTitle>
        {t(translations.RulesContainer.CREATE_RULE.ARE_YOU_SURE_POPUP)}
        <div>
          {t(translations.RulesContainer.CREATE_RULE.THIS_SUBTASK_POPUP)}
        </div>
        <div>
          {t(translations.RulesContainer.CREATE_RULE.IT_WILL_BE_REMOVED_POPUP)}
        </div>
      </Popup_subTitle>
      <Popup_bottom>
        <Popup_cancel
          onClick={() =>
            props.handlePopUpClicked(
              t(translations.RulesContainer.CREATE_RULE.CANCEL)
            )
          }
        >
          {t(translations.RulesContainer.CREATE_RULE.CANCEL)}
        </Popup_cancel>
        <Popup_delete
          onClick={() =>
            props.handlePopUpClicked(
              t(translations.RulesContainer.CREATE_RULE.DELETE)
            )
          }
        >
          {t(translations.RulesContainer.CREATE_RULE.DELETE)}
        </Popup_delete>
      </Popup_bottom>
    </Popup>
  );
};

export default PopupDeleteSebTask;
