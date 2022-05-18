import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";
import { getTimeFromNow } from "../utils";

export default function useFormattedTimestamp(createDate?: string) {
  const { t } = useTranslation();

  if (!createDate) return null;

  const diffFromNow = getTimeFromNow(createDate);
  const { months, days, hours, mins, seconds } = diffFromNow;

  if (months > 0) {
    return `${months} ${t(translations.TasksManagement.MonthsAgo)}`;
  }
  if (days >= 21) {
    return t(translations.TasksManagement.ThreeWeeksAgo);
  }
  if (days >= 14) {
    return t(translations.TasksManagement.TwoWeeksAgo);
  }
  if (days >= 7) {
    return t(translations.TasksManagement.WeekAgo);
  }
  if (days > 0) {
    return `${days} ${t(translations.TasksManagement.DaysAgo)}`;
  }
  if (hours > 0) {
    return `${hours} ${t(translations.TasksManagement.HoursAgo)}`;
  }
  if (mins > 0) {
    return `${mins} ${t(translations.TasksManagement.MinutesAgo)}`;
  }
  if (seconds >= 20) {
    return t(translations.TasksManagement.LessThanMinuteAgo);
  }
  if (seconds < 20) {
    return t(translations.TasksManagement.FewSecondsAgo);
  }
}
