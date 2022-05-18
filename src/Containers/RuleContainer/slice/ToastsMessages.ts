import i18next from "i18next";
import { translations } from "../../../locales/translations";
//i18next.t(translations.RulesContainer.CREATE_RULE.EVERY)
export const setActiveMessage = (
  rulename: string | undefined,
  isActive: number | undefined
) => {
  return {
    success: {
      Title:
        i18next.t(translations.RulesContainer.CREATE_RULE.RULE) +
        " " +
        rulename +
        " " +
        (isActive
          ? i18next.t(translations.RulesContainer.CREATE_RULE.ACTIVATED)
          : i18next.t(translations.RulesContainer.CREATE_RULE.DEACTIVATED)) +
        " " +
        i18next.t(translations.RulesContainer.CREATE_RULE.SUCCESSFULLY),
      SubTitle: i18next.t(
        translations.RulesContainer.CREATE_RULE.THE_ACTION_COMPLETED
      ),
    },
    pending: {
      Title: i18next.t(translations.RulesContainer.CREATE_RULE.LOADING) + "...",
      SubTitle: "",
    },
    error: {
      Title: i18next.t(translations.RulesContainer.CREATE_RULE.ERROR),
      SubTitle: i18next.t(
        translations.RulesContainer.CREATE_RULE.THE_ACTION_NOT_COMPLETE
      ),
    },
  };
};

export const DeleteRuleMessage = (rulename: string | undefined) => {
  return {
    success: {
      Title: i18next.t(translations.RulesContainer.CREATE_RULE.RULE_DELETED),
      SubTitle:
        i18next.t(translations.RulesContainer.CREATE_RULE.THE_RULE) +
        " " +
        rulename +
        " " +
        i18next.t(translations.RulesContainer.CREATE_RULE.WAS_DELETED),
    },
    pending: {
      Title: i18next.t(translations.RulesContainer.CREATE_RULE.LOADING) + "...",
      SubTitle: "",
    },
    error: {
      Title: i18next.t(translations.RulesContainer.CREATE_RULE.ERROR),
      SubTitle: i18next.t(
        translations.RulesContainer.CREATE_RULE.THE_ACTION_NOT_COMPLETE
      ),
    },
  };
};

export const DeleteSelectedRuleMessage = () => {
  return {
    success: {
      Title: i18next.t(
        translations.RulesContainer.CREATE_RULE.SELECTED_RULE_DELETED
      ),
      SubTitle: i18next.t(
        translations.RulesContainer.CREATE_RULE.THE_RULE_DELETED
      ),
    },
    pending: {
      Title: i18next.t(translations.RulesContainer.CREATE_RULE.LOADING) + "...",
      SubTitle: "",
    },
    error: {
      Title: i18next.t(translations.RulesContainer.CREATE_RULE.ERROR),
      SubTitle: i18next.t(
        translations.RulesContainer.CREATE_RULE.THE_ACTION_NOT_COMPLETE
      ),
    },
  };
};

export const DuplicateMessage = () => {
  return {
    success: {
      Title: i18next.t(translations.RulesContainer.CREATE_RULE.RULE_DUPLICATED),
      SubTitle: i18next.t(
        translations.RulesContainer.CREATE_RULE.THE_ACTION_COMPLETED
      ),
    },
    pending: {
      Title: i18next.t(translations.RulesContainer.CREATE_RULE.LOADING) + "...",
      SubTitle: "",
    },
    error: {
      Title: i18next.t(translations.RulesContainer.CREATE_RULE.ERROR),
      SubTitle: i18next.t(
        translations.RulesContainer.CREATE_RULE.THE_ACTION_NOT_COMPLETE
      ),
    },
  };
};
