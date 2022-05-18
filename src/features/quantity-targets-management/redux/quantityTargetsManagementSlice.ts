import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { SelectedOption } from "../components/SettingsPanel/DaySettings/DaySettings";
import {
  APIParamsUnitsTargetValues,
  APIUnitsTargetValues,
  DepartmentTarget,
  SelectedPeriod,
  SelectedTimeRange,
} from "../ts";

type SliceState = {
  unitsTargetValues: DepartmentTarget[];
  loading: boolean;
  selectedTimeRange: SelectedTimeRange;
  selectedPeriods: SelectedPeriod[];
  localSelectedPeriods: SelectedPeriod[];
  selectedDates: string[];
  daySettingsSelectedOption: SelectedOption;
};

const initialState: SliceState = {
  unitsTargetValues: [],
  loading: false,
  selectedTimeRange: SelectedTimeRange.Shift,
  selectedPeriods: [],
  localSelectedPeriods: [],
  selectedDates: [moment().format("YYYY-MM-DD")],
  daySettingsSelectedOption: "DaysOfWeek",
};

export const getUnitsTargetValues = createAsyncThunk(
  "targetValues/getUnitsTargetValues",
  async (params: APIParamsUnitsTargetValues) => {
    const res = await api
      .post<APIUnitsTargetValues>(API_URLS.getUnitsTargetValues, params)
      .then((res) => res.data);
    return res;
  }
);

export const quantityTargetsManagementSlice = createSlice({
  name: "QTMSlice",
  initialState,
  reducers: {
    updateSelectedTimeRange(state, action: PayloadAction<SelectedTimeRange>) {
      state.selectedTimeRange = action.payload;
    },
    updateSelectedPeriods(state, action: PayloadAction<SelectedPeriod[]>) {
      state.selectedPeriods = action.payload;
    },
    updateLocalSelectedPeriods(state, action: PayloadAction<SelectedPeriod[]>) {
      state.localSelectedPeriods = action.payload;
    },
    updateSelectedDates(state, action: PayloadAction<string[]>) {
      state.selectedDates = action.payload;
    },
    toggleDaySettingsSelectedOption(
      state,
      action: PayloadAction<SelectedOption>
    ) {
      state.daySettingsSelectedOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUnitsTargetValues.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUnitsTargetValues.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.unitsTargetValues = payload.ResponseDictionaryValues.AllFactory;
    });
    builder.addCase(getUnitsTargetValues.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  updateSelectedTimeRange,
  updateSelectedPeriods,
  updateLocalSelectedPeriods,
  updateSelectedDates,
  toggleDaySettingsSelectedOption,
} = quantityTargetsManagementSlice.actions;

export default quantityTargetsManagementSlice.reducer;
