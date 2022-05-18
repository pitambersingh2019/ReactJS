const requestFields = [
  "CycleTimeEfficiencyTarget",
  "RejectsEfficiencyTarget",
  "CavitiesEfficiencyTarget",
  "DownTimeEfficiencyTarget",
  "DownTimeEfficiencyOEETarget",
];

export const prepareRequestData = (row, cells) => {
  if (row.depth === 2) {
    return prepareUpdateMachineRequest(row, cells);
  } else if (row.depth === 1) {
    return prepareUpdateDepartmentRequest(row, cells);
  } else {
    return prepareUpdateFactoryRequest(row, cells);
  }
};

const prepareCells = (cells) => {
  let preparedCells = {};
  cells.map((cell) => {
    if (requestFields.includes(cell.column.id)) {
      preparedCells = {
        ...preparedCells,
        [cell.column.id]: formatValue(cell.value),
      };
    }
  });

  return preparedCells;
};

const prepareUpdateFactoryRequest = (row, cells) => {
  const preparedCells = prepareCells(cells);

  return {
    endpoint: "/UpdateFactoryTarget",
    params: {
      IsFixedTarget: cells.find((cell) => cell.column.id === "IsFixedTarget")
        .value,
      data: preparedCells,
    },
  };
};

const prepareUpdateDepartmentRequest = (row, cells) => {
  const { DepartmentID } = row.original;

  const preparedCells = prepareCells(cells);

  return {
    endpoint: "/UpdateDepartmentTarget",
    params: {
      DepartmentID,
      IsFixedTarget: cells.find((cell) => cell.column.id === "IsFixedTarget")
        .value,
      data: preparedCells,
    },
  };
};

const prepareUpdateMachineRequest = (row, cells) => {
  const { MachineID } = row.original;
  const machineRank = cells.find(
    (cell) => cell.column.id === "MachineRank"
  ).value;
  const isFixedTarget = cells.find(
    (cell) => cell.column.id === "IsFixedTarget"
  ).value;

  const diff = defineChanged(row.original, cells);

  const updateRank = {
    endpoint: "UpdateMachineRank",
    params: {
      id: MachineID,
      rank: machineRank,
      isFixedTarget,
    },
  };

  //if only fixed and/or machine rank are changed, make a call to UpdateMachineRank API
  if (
    diff.length === 2 &&
    diff.includes("IsFixedTarget") &&
    diff.includes("MachineRank")
  ) {
    return updateRank;
  }
  if (
    diff.length === 1 &&
    (diff.includes("IsFixedTarget") || diff.includes("MachineRank"))
  ) {
    return updateRank;
  }

  const preparedCells = prepareCells(cells);

  return {
    endpoint: "/UpdateMachineTarget",
    params: {
      MachineID,
      MachineRank: machineRank,
      IsFixedTarget: cells.find((cell) => cell.column.id === "IsFixedTarget")
        .value,
      data: preparedCells,
    },
  };
};

const formatValue = (value) => {
  return Number(value.replaceAll("%", "")) / 100;
};

const keys = [
  "CavitiesEfficiencyTarget", //Unit in cycle Efficiency
  "CycleTimeEfficiencyTarget",
  "DownTimeEfficiencyOEETarget", //Availability OEE1
  "DownTimeEfficiencyTarget", //Availability PE
  "IsFixedTarget",
  "MachineRank",
  "RejectsEfficiencyTarget", //Quality index1
];

const defineChanged = (original, updated) => {
  const { originalObj, updatedObj } = normalizeObjects(original, updated);
  return compareObjects(originalObj, updatedObj);
};

const normalizeObjects = (original, updated) => {
  let originalObj = {};
  let updatedObj = {};

  updated.forEach((item) => {
    if (keys.includes(item.column.id)) {
      updatedObj[item.column.id] = item.value;
    }
  });

  //take into account only visible columns
  Object.keys(updatedObj).forEach((key) => {
    originalObj[key] = original[key];
  });

  return { originalObj, updatedObj };
};

const compareObjects = (obj1, obj2) => {
  let diff = [];

  keys.forEach((key) => {
    if (obj1[key] !== obj2[key]) {
      diff.push(key);
    }
  });
  return diff;
};
