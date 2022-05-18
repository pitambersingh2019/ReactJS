import { useCallback, useState } from "react";
const getModalstatusStorage = () => {
  const ngStorageModal = window.sessionStorage.getItem(
    "RestoreDefaultsTableModal"
  );
  const ngStorageModalobj = ngStorageModal ? JSON.parse(ngStorageModal) : null;
  return ngStorageModalobj;
};
const useRestore = (dispatch, handleRestoreDefaults) => {
  // Initialize the state

  const [showModalRestore, setShowModalRestore] = useState(false);

  const handleRestoreSorting = useCallback(() => {
    dispatch({ type: "restoreSorting" });
  }, [dispatch]);

  const handleRestoreFilter = useCallback(() => {
    dispatch({ type: "restoreFilter" });
  }, [dispatch]);

  const handleRestoreHiddenCols = useCallback(() => {
    dispatch({ type: "restoreHiddenCols" });
  }, [dispatch]);

  const handleRestoreDefaultsButton = () => {
    const ShouldshowModal = getModalstatusStorage();
    if (!ShouldshowModal) setShowModalRestore(true);
    else {
      handleRestoreDefaults(true);
      handleRestoreSorting();
      handleRestoreFilter();
      handleRestoreHiddenCols();
    }
  };
  return [
    handleRestoreSorting,
    handleRestoreFilter,
    handleRestoreHiddenCols,
    handleRestoreDefaultsButton,
    showModalRestore,
    setShowModalRestore,
  ];
};

export default useRestore;
