export const markRows = ({ rows, row, editingRowId }) => {
  const isFixedFactory = rows[0].values.IsFixedTarget;

  const editingRow = rows.find((row) => row.id === editingRowId);

  const machineWillUpdate =
    row.depth === 2 &&
    row.id.substring(0, 3) == editingRowId &&
    !row.values.IsFixedTarget;

  const machineWillUpdateWithFixedFactory =
    row.depth === 2 && !row.values.IsFixedTarget;

  const departmentWillUpdate = row.depth === 1 && !row.values.IsFixedTarget;

  const parentDepartment = rows.find(
    (row) => row.id == editingRowId?.toString().substring(0, 3)
  );

  const departmentMachineWillUpdate =
    row.depth === 2 &&
    row.id.substring(0, 3) == editingRowId?.toString().substring(0, 3) &&
    !row.values.IsFixedTarget;

  const willRowUpdate = () => {
    //factory level
    if (editingRowId === "0") {
      return !row.values.IsFixedTarget;

      //department level
    } else if (editingRow?.depth === 1) {
      if (!isFixedFactory) {
        return machineWillUpdate || row.depth === 0;
      } else {
        return machineWillUpdateWithFixedFactory || departmentWillUpdate;
      }

      //machine level
    } else if (editingRow?.depth === 2) {
      //IsFixedTarget = false on the department level
      if (!parentDepartment.values.IsFixedTarget) {
        if (!isFixedFactory) {
          return parentDepartment.id === row.id;
        } else {
          return !row.values.IsFixedTarget;
        }
        //IsFixedTarget = true on the department level
      } else {
        return departmentMachineWillUpdate;
      }
    } else {
      return false;
    }
  };

  return willRowUpdate();
};
