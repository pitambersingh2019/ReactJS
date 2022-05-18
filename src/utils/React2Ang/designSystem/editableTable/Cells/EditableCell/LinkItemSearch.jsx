/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from "react";
import ModalSelectTable from "../../../SearchResults/ModalSearchResult";
import ReactDOM from "react-dom";
import InputSearchFieldPopup from "../../../../../../Component/DesignSystem/SearchFieldPopup";
const EditableCell = ({
  row: { index },
  cell,
  UpdateData, // This is a custom function that we supplied to our table instance
  ValidationError,
}) => {
  // We need to keep and update the state of the cell normally
  const [record, setRecord] = React.useState(cell.value);
  console.log(cell);
  React.useEffect(() => {
    setRecord(cell.value);
  }, [cell.value]);

  //if number with target!
  const [modal, setShowModal] = React.useState(false);

  const handleGetSelectedValue = (selected) => {
    const newRecord = Object.assign(
      {},
      { ...record, value: selected[0] ? selected[0].values.ID : "" }
    );

    setRecord(newRecord);
    const isNewRow = record.AddRow;
    UpdateData(index, cell.column.id, newRecord, isNewRow);
    if (!record.AllowNull) {
      if (!newRecord.value) {
        ValidationError(index, cell.column.id, true);
      } else {
        ValidationError(index, cell.column.id, false);
      }
    }

    setShowModal(false);
  };

  useEffect(() => {
    if (!record.AllowNull) {
      ValidationError(index, cell.column.id, true);
    }
  }, []);

  return (
    <>
      <InputSearchFieldPopup
        placeholder={""}
        value={record.value ?? ""}
        onChange={() => {
          console.log("empty");
        }}
        onSearch={() => {
          setShowModal(true);
        }}
        disabled={false}
      />
      {modal &&
        ReactDOM.createPortal(
          <ModalSelectTable
            content={{
              request: { reportID: record.SearchLinkReportID },
            }}
            onCloseModal={() => setShowModal(false)}
            handleGetSelectedValue={handleGetSelectedValue}
          />,
          document.body
        )}
    </>
  );
};

export default React.memo(EditableCell);
