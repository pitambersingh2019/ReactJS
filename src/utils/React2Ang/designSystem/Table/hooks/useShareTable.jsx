import { useState } from "react";

const useShareTable = () => {
  // Initialize the state

  const [showShareTable, setShowShareTable] = useState(false);

  return [showShareTable, setShowShareTable];
};

export default useShareTable;
