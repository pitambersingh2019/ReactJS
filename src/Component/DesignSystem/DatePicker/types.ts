export const SelectionsToAvoid = [2, 5, 10, 13, 16];

export interface DatePickerInterface {
  onDateChange: (date: DateReturned | string) => void;
  selected?: SelectedDate;
  disabled?: boolean;
  Title?: string;
  required?: boolean;
  isSmall?: boolean;
  isValid?: boolean;
  alignCalendarRight?: boolean;
}

export enum POSITION {
  TOP = "top",
  BOTTOM = "bottom",
}

//will be added more
export enum DateFormat {
  DD_MM_YYYY_HH_MM = "DD/MM/YY HH:mm",
  DD_MM_YY_HH_MM = "DD/MM/YY HH:mm",
  DD_MM_YY_HH_MM_comma = "DD/MM/YY, HH:mm",
}

export interface DateReturned {
  dateString: string;
  format: DateFormat;
  month: number;
  year: number;
  date: number;
  hour: number;
  minute: number;
}

export interface SelectedDate {
  format: DateFormat;
  inputString: string;
}
export interface UIDateInterface {
  month: number;
  year: number;
  monthDetailsRen: monthDetailsInterface[][];
}

export interface DayDetails {
  index: number;
  numberOfDays: number;
  firstDay: number;
  year: number;
  month: number;
}

export interface monthDetailsInterface {
  date: number;
  day: number;
  month: number;
  timestamp: number;
  dayString: string;
}
