import { EditingRowContextProvider } from "../../context/EditingRowContext";
import { useErrorContext } from "../../context/ErrorContext";
import { TableWidthProvider } from "../../context/TableWidthContext";
import { useValues } from "../../hooks/useValues";
import ResetButton from "../ResetButton/ResetButton";
import Spinner from "../Spinner/Spinner";
import Table from "../Table/Table";

function TableWrapper() {
  const { values, isLoading, error } = useValues();

  const { error: contextError } = useErrorContext();

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  if (contextError) return "An error has occurred: " + contextError;

  if (values?.error) return "API error: " + values.error.ErrorMessage;

  return (
    values && (
      <EditingRowContextProvider>
        <TableWidthProvider>
          <ResetButton />
          <Table data={values} />
        </TableWidthProvider>
      </EditingRowContextProvider>
    )
  );
}

export default TableWrapper;
