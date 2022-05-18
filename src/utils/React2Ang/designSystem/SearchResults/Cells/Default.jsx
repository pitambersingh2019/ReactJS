/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ToolTip from "../../Table/Components/ToolTip/index";
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
            {String(cell.value)}
          </Text>
        </ToolTip>
      ) : null}
    </div>
  );
};
export default DefaultCell;
