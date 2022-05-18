export const filterContainText = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = row.values[id].value;
    return rowValue !== undefined
      ? String(rowValue)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase())
      : true;
  });
};

export const filterCombo = (rows, id, filterValue) => {
  return rows.filter((row) => {
    const rowValue = row.values[id].value;
    return rowValue === filterValue || Number(filterValue) === rowValue;
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SortText = (rowA, rowB, id, desc) => {
  if (rowA.values[id].value > rowB.values[id].value) return 1;
  if (rowB.values[id].value > rowA.values[id].value) return -1;
  return 0;
};
