/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ToolTip from "../../Table/Components/ToolTip/index";
import InputTextField from "../../../../../Component/DesignSystem/InputText";
import { InputType } from "../../../../../Component/DesignSystem/InputText/types";
import { ROW_HEIGHT } from "../../Table/config";
const Text = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: ${(p) => p.width - 10}px;
`;
const DefaultCell = ({ cell }) => {
  const ref = useRef(null);
  const [isOverflowed, setIsOverflow] = useState(false);
  useEffect(() => {
    if (ref.current) {
      const isOverf =
        ref.current.scrollWidth > cell.column.width ||
        ref.current.scrollHeight > ROW_HEIGHT;
      setIsOverflow(isOverf);
    }
  }, [cell]);

  return (
    <div style={{ overflow: "hidden" }}>
      {cell.value ? (
        <ToolTip title={isOverflowed ? String(cell.value) : ""}>
          <Text width={cell.column.width} ref={ref}>
            {String(cell.value.value)}
          </Text>
        </ToolTip>
      ) : null}
    </div>
  );
};

const EditableCell = ({
  row: { index },
  cell,
  UpdateData, // This is a custom function that we supplied to our table instance
  ValidationError,
}) => {
  // We need to keep and update the state of the cell normally
  const [record, setRecord] = useState(cell.value);
  const updated = useRef(null);
  const onChange = (value) => {
    setRecord((prev) => ({ ...prev, value: value }));
    updated.current = true;
  };
  // We'll only update the external data when the input is blurred
  const onBlur = (text) => {
    if (updated.current) {
      const isNewRow = record.AddRow;
      UpdateData(index, cell.column.id, record, isNewRow);
    }
    updated.current = false;
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setRecord(cell.value);
  }, [cell.value]);

  useEffect(() => {
    if (record.value?.length === 0) {
      ValidationError(index, cell.column.id, true);
    } else {
      ValidationError(index, cell.column.id, false);
    }
  }, [ValidationError, cell.column.id, index, record]);

  return (
    <>
      <InputTextField
        value={record.value}
        onChange={onChange}
        onBlur={onBlur}
        type={InputType.number}
        required={false}
      />
    </>
  );
};

// const Index = (props) => {
//   if (props.cell.value.AddRow) {
//     return <EditableCell {...props} />;
//   } else {
//     return <DefaultCell {...props} />;
//   }
// };
export default EditableCell;
