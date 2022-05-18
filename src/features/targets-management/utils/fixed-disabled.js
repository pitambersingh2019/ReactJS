export const shouldDisableIsFixed = (rows) => {
  const departmentLevel = rows.filter((row) => row.depth === 1);
  const isFixedCountDepartment = departmentLevel.filter(
    (dep) => dep.values.IsFixedTarget
  ).length;

  const machineLevel = rows.filter((row) => row.depth === 2);

  const grouped = groupMachinesByDepartment(machineLevel);

  return {
    departmentShouldDisable:
      isFixedCountDepartment === departmentLevel.length - 1,
    machineShouldDisable: getShouldMachineDisabled(grouped),
  };
};

const groupMachinesByDepartment = (machines) => {
  return machines.reduce((result, machine) => {
    const departmentId = machine.id.substring(0, 3);
    result[departmentId] = result[departmentId] || [];
    result[departmentId].push(machine);
    return result;
  }, {});
};

const getShouldMachineDisabled = (grouped) => {
  let machineShouldDisable = {};
  for (const key of Object.keys(grouped)) {
    const isFixedCountMachine = grouped[key].filter(
      (machine) => machine.values.IsFixedTarget
    ).length;
    machineShouldDisable[key] = isFixedCountMachine === grouped[key].length - 1;
  }
  return machineShouldDisable;
};
