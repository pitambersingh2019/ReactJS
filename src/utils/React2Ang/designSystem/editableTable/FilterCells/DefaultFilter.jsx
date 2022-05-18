/* eslint-disable @typescript-eslint/no-unused-vars */
import SearchText from "../../Table/Components/SearchField";
const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  // const count = preFilteredRows.length;
  // console.log("filter value", filterValue);
  return (
    <SearchText
      // placeholder={`${count} records...`}
      onChange={(text) => setFilter(text || undefined)}
      size="sm"
      value={filterValue ?? ""}
    />
  );
};
export default DefaultColumnFilter;
