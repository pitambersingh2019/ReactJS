import { useCallback, useEffect, useRef } from "react";
const useSaveState = (initialsaveState, handleSaveState) => {
  const saveState = useRef(null);

  useEffect(() => {
    saveState.current = initialsaveState;
  }, [initialsaveState]);

  const SetSaveState = useCallback(
    (newState) => {
      saveState.current = newState;
      handleSaveState && handleSaveState(newState);
    },
    [handleSaveState]
  );
  // const SetColumnDisplayStructure = useCallback((newColDisplay) => {
  //   saveState.current = {
  //     UserReportStructure: {
  //       ...saveState.current,
  //       ColumnDisplayStructure: newColDisplay,
  //     },
  //   };
  // }, []);

  // const SetColumnOrderStructure = useCallback((newColOrder) => {
  //   const old = saveState.current.ColumnOrderStructure;
  //   const ColOrder = old.map((elem) => {
  //     const item = newColOrder.find(
  //       (elem2) => elem2.fieldName === elem.fieldName
  //     );
  //     return { ...elem, ...item };
  //   });
  //   console.log(ColOrder);
  //   saveState.current = {
  //     UserReportStructure: {
  //       ...saveState.current,
  //       ColumnOrderStructure: ColOrder,
  //     },
  //   };
  // }, []);

  // const buildColOrderwithWidthJSON = useCallback((ColOrder, ColSizes) => {
  //   // const ColSizesArr = Object.entries(ColSizes).map((e) => ({ [e[0]]: e[1] }));
  //   const ColSizesMap = new Map();
  //   for (const [key, value] of Object.entries(ColSizes)) {
  //     ColSizesMap.set(key, value);
  //   }
  //   const ColOrderArr = ColOrder.filter(
  //     (col) => col !== MENU_COLS && col !== SELECTION_COLS
  //   );
  //   const ColOrderWithSizes = ColOrderArr.map((col) => {
  //     const width = ColSizesMap.get(col);
  //     return { fieldName: col, width: width ?? "*" };
  //   });
  //   console.log("ColOrderWithSizes", ColOrderWithSizes);
  // }, []);
  return [saveState, SetSaveState];
};

export default useSaveState;
