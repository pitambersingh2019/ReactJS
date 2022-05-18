import React, { useState, useEffect } from "react";
import { TableWrapper } from "./default-table.styles";
import Table from "./Table/Table";
import useTableColumns from "../../utils/hooks/useTableColumns";
import { makeTableDataFromChannelData } from "../../utils/utils";

function DefaultTable({ originalChannelData, channelData, showBarOnScroll }) {
  const tableColumns = useTableColumns({ channelData: originalChannelData });
  const [columns, setColmun] = useState(tableColumns);
  const [data, setData] = useState(() =>
    makeTableDataFromChannelData(channelData)
  );

  useEffect(() => {
    setColmun(tableColumns);
    setData(makeTableDataFromChannelData(channelData));
  }, [channelData]);

  return (
    <TableWrapper>
      <Table columns={columns} data={data} showBarOnScroll={showBarOnScroll} />
    </TableWrapper>
  );
}

export default DefaultTable;
