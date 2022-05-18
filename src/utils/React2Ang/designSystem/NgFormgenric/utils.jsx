export const UpdateChanges = (current, change) => {
  const newChanges = [...current];
  const index = current.findIndex(
    (elem) => elem.FieldName === change.FieldName
  );
  if (index >= 0) {
    newChanges[index] = change;
  } else {
    newChanges.push(change);
  }
  return newChanges;
};
