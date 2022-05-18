import { useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus, APIFilter } from "../ts";
import { useFilter } from "../context/useFilter";
import { useSelectedFilterSet } from "../context/useSelectedFilterSet";

type APIUpdateFilter = {
  filterID: number;
};

export default function useSaveFilterSet() {
  const [status, setStatus] = useState<APIStatus>("idle");
  const {
    subjects,
    showOverdueTasks,
    priorityLevels,
    assigneeDisplayName,
    levelObjects,
    statuses,
    doneInXDays,
  } = useFilter();
  const { selectedFilterSet } = useSelectedFilterSet();

  const prepareRequestParams = (filterName: string): APIFilter | undefined => {
    if (priorityLevels && assigneeDisplayName && levelObjects && statuses) {
      const isNewFilterSet = filterName !== selectedFilterSet?.label;
      const filterSetId = isNewFilterSet ? 0 : selectedFilterSet?.value;

      return {
        FilterName: filterName,
        FilterTemplate: JSON.stringify({
          Subjects: subjects || {},
          OnlyLate: showOverdueTasks !== undefined && showOverdueTasks,
          Priority: priorityLevels,
          Status: statuses,
          AssigneeDisplayName: {
            visible: true,
            null: true,
            ...assigneeDisplayName,
          },
          TaskObject: levelObjects,
          doneCancelLastXDays: Number(doneInXDays),
          filtered: true,
        }),
        FilterID: selectedFilterSet ? filterSetId : 0,
      };
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const saveFilterSet = async (
    filterName: string,
    onSuccess?: (filterId: number) => void
  ) => {
    const params = prepareRequestParams(filterName);
    try {
      setStatus("loading");
      const { filterID } = await api
        .post<APIUpdateFilter>(API_URLS.updateSavedFilter, params)
        .then((res) => res.data);
      if (onSuccess) {
        onSuccess(filterID);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return { saveFilterSet, status };
}
