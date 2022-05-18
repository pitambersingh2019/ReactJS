/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";

const useManageData = (
  handleGetUpdatedData,
  data,
  setdata,
  deleteFromValidations,
  handleGetUpdatedDataFull
) => {
  const [editedIdsRows, seteditedIdsRows] = useState(new Set());
  const [addedRowsIds, setAddedRowsIds] = useState(new Set());
  const [deletedRowsIds, setDeletedRowsIds] = useState(new Set());

  const AddDeletedRowId = useCallback(
    (rowIndexs) => {
      setDeletedRowsIds((prev) => new Set([...prev, ...rowIndexs]));
      rowIndexs.forEach((index) => {
        deleteFromValidations(+index);
      });
    },
    [deleteFromValidations]
  );

  const UpdateData = useCallback(
    (rowIndex, columnId, value, isNewRow = false) => {
      if (!editedIdsRows.has(rowIndex) && !isNewRow) {
        seteditedIdsRows((prev) => new Set([...prev, rowIndex]));
      }
      setdata((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            console.log(old[index]);
            return {
              ...old[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        })
      );
    },
    [editedIdsRows, setdata]
  );

  useEffect(() => {
    const deleteIds = new Set([...deletedRowsIds].map((x) => +x));
    const newIds = new Set([...addedRowsIds].filter((x) => !deleteIds.has(x)));
    const editIds = new Set(
      [...editedIdsRows].filter((x) => !deleteIds.has(x))
    );
    const UpdateData = [
      ...[...editIds].map((id) => ({ id: id, row: data[id], type: "Update" })),
      ...[...newIds].map((id) => ({ id: id, row: data[id], type: "New" })),
      ...[...deleteIds].map((id) => ({
        id: id,
        row: data[id],
        type: "Delete",
      })),
    ];
    handleGetUpdatedData && handleGetUpdatedData(UpdateData);
  }, [addedRowsIds, data, editedIdsRows, deletedRowsIds, handleGetUpdatedData]);

  const resetUpdateData = useCallback(() => {
    seteditedIdsRows(new Set());
    setAddedRowsIds(new Set());
    setDeletedRowsIds(new Set());
  }, []);

  useEffect(() => {
    const deleteIds = new Set([...deletedRowsIds].map((x) => +x));
    const dataNew = data.filter(function (value, index) {
      return [...deleteIds].indexOf(index) == -1;
    });
    handleGetUpdatedDataFull && handleGetUpdatedDataFull(dataNew);
  }, [data, deletedRowsIds, handleGetUpdatedDataFull]);
  return [
    UpdateData,
    addedRowsIds,
    setAddedRowsIds,
    deletedRowsIds,
    AddDeletedRowId,
    resetUpdateData,
  ];
};

export default useManageData;
