import { useCallback } from "react";
import _debounce from "lodash/debounce";

const useAddRow = (
  scrollToLastTable,
  setdata,
  AddRowData,
  index,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addedRowsIds,
  setAddedRowsIds
) => {
  // Initialize the state

  const handleAddRow = useCallback(() => {
    _debounce(() => {
      //no need anymore
      //dispatch({ type: "addrow", index: index });
      setdata((prev) => [...prev, AddRowData]);
      if (!addedRowsIds.has(index)) {
        setAddedRowsIds((prev) => new Set([...prev, index]));
      }
      scrollToLastTable();
    }, 50)();
  }, [
    AddRowData,
    addedRowsIds,
    index,
    scrollToLastTable,
    setAddedRowsIds,
    setdata,
  ]);

  // const handleAddRowConfirm = useCallback(() => {
  //   if (!addedRowsIds.has(addrowState)) {
  //     setAddedRowsIds((prev) => new Set([...prev, addrowState]));
  //   }
  //   dispatch({ type: "addrow", index: null });
  // }, [addedRowsIds, addrowState, dispatch, setAddedRowsIds]);

  //deleteing the two icons of add and delete
  // const handleDeleteRow = useCallback(() => {
  //   setdata((prev) => {
  //     return prev.filter((_, i) => i !== addrowState);
  //   });
  //   dispatch({ type: "addrow", index: null });
  // }, [addrowState, dispatch, setdata]);

  return [handleAddRow];
};

export default useAddRow;
