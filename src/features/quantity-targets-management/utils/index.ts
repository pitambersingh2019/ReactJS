import { Checked } from "../ts";

export const getCheckedAllStatus = (valuesArray: boolean[] | undefined) => {
  if (valuesArray) {
    if (valuesArray.every(Boolean)) {
      return Checked.All;
    }
    if (valuesArray.some(Boolean)) {
      return Checked.Half;
    }
  }
  return Checked.None;
};

export const areAllChecked = (valuesArray: boolean[]) =>
  valuesArray.every(Boolean);
