import {
  CardsInterface,
  IntervalType,
  ResponseTriggers,
  RulesContainerSlice,
  FILTERBY,
  SORTBY,
  SORTBY_TYPE,
  EventsAndGroup,
} from "./types";
import { LoadUserID } from "../../../AppStart";
import { loadStateLang } from "../../../AppStart";
import { isLocalLanguage } from "../../../utils/CommonFunctions";
import i18next from "i18next";
import { translations } from "../../../locales/translations";

export function dayOfWeekAsString(dayIndex: number) {
  return (
    [
      `${i18next
        .t(translations.RulesContainer.CREATE_RULE.ScehduleRow.SUNDAY)
        .toLocaleLowerCase()}, `,
      `${i18next
        .t(translations.RulesContainer.CREATE_RULE.ScehduleRow.MONDAY)
        .toLocaleLowerCase()}, `,
      `${i18next
        .t(translations.RulesContainer.CREATE_RULE.ScehduleRow.TUESDAY)
        .toLocaleLowerCase()}, `,
      `${i18next
        .t(translations.RulesContainer.CREATE_RULE.ScehduleRow.WEDNESDAY)
        .toLocaleLowerCase()}, `,
      `${i18next
        .t(translations.RulesContainer.CREATE_RULE.ScehduleRow.THURSDAY)
        .toLocaleLowerCase()}, `,
      `${i18next
        .t(translations.RulesContainer.CREATE_RULE.ScehduleRow.FRIDAY)
        .toLocaleLowerCase()}, `,
      `${i18next
        .t(translations.RulesContainer.CREATE_RULE.ScehduleRow.SATURDAY)
        .toLocaleLowerCase()}, `,
    ][dayIndex - 1] || ""
  );
}

const getKeyValue =
  <U extends keyof T, T extends object>(key: U) =>
  (obj: T) =>
    obj[key];

export function Convert_Triggers_to_Cards_INFO(
  data: ResponseTriggers,
  reasonsAndGroups: RulesContainerSlice["EventsReasons"]
) {
  let key: keyof EventsAndGroup = "EName";
  console.log("loadStateLangloadStateLangloadStateLang", loadStateLang());
  if (isLocalLanguage(JSON.parse(loadStateLang()))) {
    key = "LName";
  }

  const cards: CardsInterface[] = [];

  const ResponseList = data.ResponseList;
  ResponseList?.forEach((element) => {
    //get time
    const hour: string = ("0" + element.IntervalHour).slice(-2);
    const mins: string = ("0" + element.IntervalMinute).slice(-2);
    const Days: number[] = element.Days;

    let DaysinWords: string[] = [];
    DaysinWords = Days.map((index) => {
      return dayOfWeekAsString(index);
    });
    let weekDaysFormat = DaysinWords.join("");
    weekDaysFormat = weekDaysFormat.substring(0, weekDaysFormat.length - 2);
    //get interval type
    if (element.IntervalType !== "") {
      let triggerText =
        i18next.t(translations.RulesContainer.CREATE_RULE.EVERY) + " ";
      if (element.IntervalType === IntervalType.Daily) {
        triggerText +=
          i18next.t(translations.RulesContainer.CREATE_RULE.DAY_AT) +
          " " +
          hour +
          ":" +
          mins +
          ", ";
      } else if (element.IntervalType === IntervalType.Monthly) {
        triggerText +=
          i18next.t(translations.RulesContainer.CREATE_RULE.MONTH_AT) +
          " " +
          (Days.length > 2
            ? Days[0] +
              ", " +
              Days[1] +
              i18next.t(translations.RulesContainer.CREATE_RULE.AND_CARD) +
              (Days.length - 2) +
              " " +
              i18next.t(translations.RulesContainer.CREATE_RULE.MORE_DAYS)
            : Days) +
          " " +
          i18next.t(translations.RulesContainer.CREATE_RULE.AT) +
          " " +
          hour +
          ":" +
          mins +
          ", ";
      } else if (element.IntervalType === IntervalType.Weekly) {
        triggerText +=
          " " +
          i18next.t(translations.RulesContainer.CREATE_RULE.WEEK_AT) +
          " " +
          weekDaysFormat +
          " " +
          i18next.t(translations.RulesContainer.CREATE_RULE.AT) +
          " " +
          hour +
          ":" +
          mins +
          ", ";
      } else if (element.IntervalType === IntervalType.HourlyCustom) {
        triggerText +=
          " " +
          element.IntervalHour +
          " " +
          i18next.t(
            translations.RulesContainer.CREATE_RULE.EVERY_PERIOD_OF_TIME.HOURS
          ) +
          ", ";
      } else {
        triggerText +=
          i18next.t(translations.RulesContainer.CREATE_RULE.UNSPECIFIED) + ", ";
      }

      if (element.NotificationType === 7) {
        triggerText +=
          i18next.t(
            translations.RulesContainer.CREATE_RULE.CREATE_NOTIFICATION
          ) + " ";
      } else if (element.NotificationType === 2) {
        triggerText +=
          i18next.t(
            translations.RulesContainer.CREATE_RULE.CREATE_SERVICE_CALL
          ) + " ";
      } else if (element.NotificationType === 1) {
        triggerText +=
          i18next.t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE_CARD) +
          " ";
      } else if (
        element.NotificationType === null &&
        element.TaskModuleTriggerID.length > 0
      ) {
        triggerText +=
          i18next.t(translations.RulesContainer.CREATE_RULE.CREATE_TASK_CARD) +
          " ";
      } else if (element.TriggerType === 3) {
        triggerText +=
          i18next.t(
            translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
              .MAINTENANCE_TICKET
          ) + " ";
      }

      let elem_details: CardsInterface = {
        name: element.TriggerGroupName || "",
        triggerText: triggerText,
        TriggerGroupID: element.TriggerGroupID,
        IsActive: element.IsActive,
        GroupCreateUserID: element.GroupCreateUserID,
        NotificationType: element.NotificationType,
        TaskModuleTriggerID: element.TaskModuleTriggerID,
        LastRunTime: element.LastRunTime,
        stopReasonId: element.StopReasonID,
        intervalType: element.IntervalType,
        GroupCreateUser: element.GroupCreateUser,
        CreateDate: element.CreateDate,
        TriggerType: element.TriggerType,
        ConditionType: element.ConditionType,
      };
      cards.push(elem_details);
    } else {
      let triggerText =
        i18next.t(translations.RulesContainer.CREATE_RULE.WHEN) + " ";

      let reasons: string[] = [];
      //get reason
      reasonsAndGroups.data.EventsAndGroups?.forEach((elementreason) => {
        elementreason.Reasons?.forEach((elemreason2) => {
          if (element.TriggerMultiReason !== undefined) {
            element.TriggerMultiReason?.forEach((reason) => {
              if (elemreason2.ID === reason.StopReasonID) {
                const getName = getKeyValue<
                  keyof EventsAndGroup,
                  EventsAndGroup
                >(key)(elemreason2);
                if (getName !== null && getName !== undefined) {
                  reasons.push(String(getName));
                }
              }
            });
          }
        });
      });

      if (element.ConditionType === 1) {
        reasons[0] =
          i18next.t(translations.RulesContainer.CREATE_RULE.SPC) + " ";
      }
      //if reasons[0] was translated
      else if (
        reasons.length === 1 &&
        reasons[0].includes(
          i18next.t(translations.RulesContainer.CREATE_RULE.UNREPORTED_STOP)
        )
      ) {
        reasons[0] =
          i18next.t(
            translations.RulesContainer.CREATE_RULE.PARAMETER_DEVIATION_CARD
          ) + " ";
      }
      //if reasons[0] was not translated
      else if (reasons.length === 1 && reasons[0].includes("Unreported Stop")) {
        reasons[0] =
          i18next.t(
            translations.RulesContainer.CREATE_RULE.PARAMETER_DEVIATION_CARD
          ) + " ";
      }
      triggerText +=
        reasons.length > 2
          ? reasons[0] +
            ", " +
            reasons[1] +
            " " +
            i18next.t(translations.RulesContainer.CREATE_RULE.AND_CARD) +
            " " +
            (reasons.length - 2) +
            " " +
            i18next.t(translations.RulesContainer.CREATE_RULE.MORE_REASONS)
          : reasons;

      triggerText +=
        " " + i18next.t(translations.RulesContainer.CREATE_RULE.OCCURS) + " ";
      if (element.NotificationType === 7) {
        triggerText +=
          i18next.t(
            translations.RulesContainer.CREATE_RULE.CREATE_NOTIFICATION
          ) + " ";
      } else if (element.NotificationType === 2) {
        triggerText +=
          i18next.t(
            translations.RulesContainer.CREATE_RULE.CREATE_SERVICE_CALL
          ) + " ";
      } else if (element.NotificationType === 1) {
        triggerText +=
          i18next.t(translations.RulesContainer.CREATE_RULE.SEND_MESSAGE_CARD) +
          " ";
      } else if (
        element.NotificationType === null &&
        element.TaskModuleTriggerID.length > 0
      ) {
        triggerText +=
          i18next.t(translations.RulesContainer.CREATE_RULE.CREATE_TASK_CARD) +
          " ";
      } else if (element.TriggerType === 3) {
        triggerText +=
          i18next.t(
            translations.RulesContainer.CREATE_RULE.MAINTENANCE_TICKET
              .MAINTENANCE_TICKET
          ) + " ";
      }

      let elem_details: CardsInterface = {
        name: element.TriggerGroupName || "",
        triggerText: triggerText,
        TriggerGroupID: element.TriggerGroupID,
        IsActive: element.IsActive,
        GroupCreateUserID: element.GroupCreateUserID,
        NotificationType: element.NotificationType,
        TaskModuleTriggerID: element.TaskModuleTriggerID,
        LastRunTime: element.LastRunTime,
        stopReasonId: element.StopReasonID,
        intervalType: element.IntervalType,
        GroupCreateUser: element.GroupCreateUser,
        CreateDate: element.CreateDate,
        TriggerType: element.TriggerType,
        ConditionType: element.ConditionType,
      };
      cards.push(elem_details);
    }
  });
  return cards;
}

export function SearchCards(cardsList: CardsInterface[], SearchValue: string) {
  let cardListFound: CardsInterface[] = [];
  if (SearchValue !== "") {
    cardListFound = cardsList.filter((elem: CardsInterface) => {
      return elem.name.includes(SearchValue);
    });
    return cardListFound;
  }
  return cardsList;
}

export function SortCards(
  cardsList: CardsInterface[],
  sortby: SORTBY,
  SortType: SORTBY_TYPE
) {
  let cardListSorted: CardsInterface[] = [...cardsList];
  switch (sortby) {
    case SORTBY.ACTIVE_FIRST:
      if (SortType === SORTBY_TYPE.ASC) {
        cardListSorted.sort((card1: CardsInterface, card2: CardsInterface) => {
          return Number(card2.IsActive) - Number(card1.IsActive);
        });
      } else {
        cardListSorted.sort((card1: CardsInterface, card2: CardsInterface) => {
          return Number(card1.IsActive) - Number(card2.IsActive);
        });
      }

      break;
    case SORTBY.DATE_CREATED:
      if (SortType === SORTBY_TYPE.ASC) {
        cardListSorted.sort((card1: CardsInterface, card2: CardsInterface) => {
          return (
            Number(new Date(card2.CreateDate)) -
            Number(new Date(card1.CreateDate))
          );
        });
      } else {
        cardListSorted.sort((card1: CardsInterface, card2: CardsInterface) => {
          return (
            Number(new Date(card1.CreateDate)) -
            Number(new Date(card2.CreateDate))
          );
        });
      }

      break;

    case SORTBY.ALPHABET:
      if (SortType === SORTBY_TYPE.ASC) {
        cardListSorted.sort((card1: CardsInterface, card2: CardsInterface) => {
          return card1.name.localeCompare(card2.name);
        });
      } else {
        cardListSorted.sort((card1: CardsInterface, card2: CardsInterface) => {
          return card1.name.localeCompare(card2.name);
        });
        cardListSorted.reverse();
      }

      break;

    case SORTBY.LAST_FIRED:
      if (SortType === SORTBY_TYPE.ASC) {
        cardListSorted.sort((card1: CardsInterface, card2: CardsInterface) => {
          return (
            Number(new Date(card2.LastRunTime)) -
            Number(new Date(card1.LastRunTime))
          );
        });
      } else {
        cardListSorted.sort((card1: CardsInterface, card2: CardsInterface) => {
          return (
            Number(new Date(card1.LastRunTime)) -
            Number(new Date(card2.LastRunTime))
          );
        });
      }

      break;
  }
  return cardListSorted;
}

export function FilterCards(
  cardsList: CardsInterface[],
  filterby: FILTERBY,
  SearchValue: string
) {
  switch (filterby) {
    case FILTERBY.ALL:
      if (SearchValue === "") {
        return cardsList;
      } else {
        return cardsList.filter((elem: CardsInterface) => {
          return elem.name
            .toLocaleLowerCase()
            .includes(SearchValue.toLocaleLowerCase());
        });
      }

    case FILTERBY.TIME_TRIGGER_RULES:
      if (SearchValue === "") {
        return cardsList.filter((element: CardsInterface) => {
          return !element.triggerText
            .toLocaleLowerCase()
            .includes(
              i18next.t(translations.RulesContainer.CREATE_RULE.WHEN_SEARCH),
              0
            );
        });
      } else {
        return cardsList.filter((element: CardsInterface) => {
          return (
            !element.triggerText
              .toLocaleLowerCase()
              .includes(
                i18next.t(translations.RulesContainer.CREATE_RULE.WHEN_SEARCH),
                0
              ) &&
            element.name
              .toLocaleLowerCase()
              .includes(SearchValue.toLocaleLowerCase())
          );
        });
      }

    case FILTERBY.MACHINE_STOP_RULES:
      if (SearchValue === "") {
        return cardsList.filter((element: CardsInterface) => {
          return (
            element.triggerText
              .toLocaleLowerCase()
              .includes(
                i18next.t(translations.RulesContainer.CREATE_RULE.WHEN_SEARCH),
                0
              ) &&
            !element.triggerText
              .toLocaleLowerCase()
              .includes(
                i18next.t(
                  translations.RulesContainer.CREATE_RULE.DEVIATION_SEARCH
                ),
                0
              ) &&
            !element.triggerText
              .toLocaleLowerCase()
              .includes(
                i18next
                  .t(translations.RulesContainer.CREATE_RULE.SPC_SEARCH)
                  .toLocaleLowerCase(),
                0
              )
          );
        });
      } else {
        return cardsList.filter((element: CardsInterface) => {
          return (
            element.triggerText
              .toLocaleLowerCase()
              .includes(
                i18next.t(translations.RulesContainer.CREATE_RULE.WHEN_SEARCH),
                0
              ) &&
            element.name
              .toLocaleLowerCase()
              .includes(SearchValue.toLocaleLowerCase()) &&
            !element.triggerText
              .toLocaleLowerCase()
              .includes(
                i18next.t(
                  translations.RulesContainer.CREATE_RULE.DEVIATION_SEARCH
                ),
                0
              )
          );
        });
      }

    case FILTERBY.CREATE_BY_ME:
      if (SearchValue === "") {
        return cardsList.filter((element: CardsInterface) => {
          return element.GroupCreateUserID === Number(LoadUserID());
        });
      } else {
        return cardsList.filter((element: CardsInterface) => {
          return (
            element.GroupCreateUserID === Number(LoadUserID()) &&
            element.name
              .toLocaleLowerCase()
              .includes(SearchValue.toLocaleLowerCase())
          );
        });
      }

    case FILTERBY.NOT_CREATE_BY_ME:
      if (SearchValue === "") {
        return cardsList.filter((element: CardsInterface) => {
          return element.GroupCreateUserID !== Number(LoadUserID());
        });
      } else {
        return cardsList.filter((element: CardsInterface) => {
          return (
            element.GroupCreateUserID !== Number(LoadUserID()) &&
            element.name
              .toLocaleLowerCase()
              .includes(SearchValue.toLocaleLowerCase())
          );
        });
      }

    case FILTERBY.DEVIATION_PARAMETER:
      console.log(
        "deviation search ",
        i18next.t(translations.RulesContainer.CREATE_RULE.DEVIATION_SEARCH)
      );
      if (SearchValue === "") {
        return cardsList.filter((element: CardsInterface) => {
          return element.triggerText
            .toLocaleLowerCase()
            .includes(
              i18next.t(
                translations.RulesContainer.CREATE_RULE.DEVIATION_SEARCH
              ),
              0
            );
        });
      } else {
        return cardsList.filter((element: CardsInterface) => {
          return (
            element.triggerText
              .toLocaleLowerCase()
              .includes(
                i18next.t(
                  translations.RulesContainer.CREATE_RULE.DEVIATION_SEARCH
                ),
                0
              ) &&
            element.name
              .toLocaleLowerCase()
              .includes(SearchValue.toLocaleLowerCase())
          );
        });
      }

    case FILTERBY.SPC_PARAMETER:
      if (SearchValue === "") {
        return cardsList.filter((element: CardsInterface) => {
          return element.triggerText
            .toLocaleLowerCase()
            .includes(
              i18next
                .t(translations.RulesContainer.CREATE_RULE.SPC_SEARCH)
                .toLocaleLowerCase(),
              0
            );
        });
      } else {
        return cardsList.filter((element: CardsInterface) => {
          return (
            element.triggerText
              .toLocaleLowerCase()
              .includes(
                i18next
                  .t(translations.RulesContainer.CREATE_RULE.SPC_SEARCH)
                  .toLocaleLowerCase(),
                0
              ) &&
            element.name
              .toLocaleLowerCase()
              .includes(SearchValue.toLocaleLowerCase())
          );
        });
      }
  }
}

export function Search_Filter_Sort(
  cardsList: CardsInterface[],
  filterby: FILTERBY,
  sortby: SORTBY,
  SearchValue: string,
  SortType: SORTBY_TYPE
) {
  //Filter Cards first!
  const cardListFiltered: CardsInterface[] = FilterCards(
    cardsList,
    filterby,
    SearchValue
  );
  //console.log("cardListFiltered", JSON.parse(JSON.stringify((cardListFiltered))));
  //Search in cards after filter!
  // const cardListFound : CardsInterface[] = SearchCards(cardListFiltered,SearchValue);

  //Sort Cards after Searching!
  const cardListSorted: CardsInterface[] = SortCards(
    cardListFiltered,
    sortby,
    SortType
  );
  // console.log("cardListSorted", JSON.parse(JSON.stringify((cardListSorted))));
  return cardListSorted;
}

export function getAcessToken() {
  //const userAuthToken : string = yield select(selectUserAuthAcessToken);
  //OR
  const userAuthTokenStorage = window.sessionStorage.getItem(
    "ngStorage-userAuthenticated"
  );
  const userAuthobj = userAuthTokenStorage
    ? JSON.parse(userAuthTokenStorage)
    : null;
  const userAuthToken = userAuthobj?.accessToken;
  return userAuthToken;
}
