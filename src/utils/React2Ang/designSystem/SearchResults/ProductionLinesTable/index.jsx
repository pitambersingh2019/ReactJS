/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import Cell from "../Cells";
import BooleabGraphicCell from "../Cells/Booleangraphic";
import SelectColumnFilter from "../FilterCells/DropDownFilter";
import GridVirtualizerFixed from "../../Table/GridTable";
import { apiCall } from "../../../../Network";
import { TableContainer } from "../styles";
import { filterContainText, filterBoolean } from "../utils";
import { useTheme } from "styled-components";
import styled from "styled-components";
import { TableStatus } from "../../Table/config";
const LinkItemContainer = styled.a`
  &:link,
  &:visited {
    color: blue;
  }
  &:hover {
    color: red;
  }
`;

const searchParent = function (scope, functionName) {
  for (var i = 0; i < 15; i++) {
    if (scope[functionName] !== undefined) {
      return scope[functionName];
    }
    if (!scope || !scope.$parent) {
      break;
    }
    if (scope && scope.$parent) {
      scope = scope.$parent;
    }
  }
  console.log(`function ${functionName} not found`);
  return null;
};

function MainTable(props) {
  const theme = useTheme();
  //TEMPORARY LOAD SearchResult EXAMPLE!!!!
  const assignCurrentStep = useMemo(
    () => searchParent(props.$scope, "assignCurrentStep"),
    [props.$scope]
  );
  useEffect(() => {
    apiCall("GetLinesMachines", "POST", {})
      .then((response) => {
        const machinesLines = response.LinesMachines;
        const departments = response.Departments;
        let tableData = Array.from(machinesLines, (it) => {
          let department = departments.filter(
            (item) => item.Id === it.Key.Department
          );
          if (department.length > 0) {
            it.Key.DepartmentName = department[0].EName;
            return it.Key;
          } else {
            return undefined;
          }
        });
        tableData = tableData.filter((it) => it);

        let columns = [
          {
            accessor: "ID",
            Header: "Index",
            Cell: ({ cell }) => (
              <LinkItemContainer
                style={{ overflow: "hidden", height: "100%", width: "100%" }}
                onClick={() => {
                  assignCurrentStep(
                    "new-production-line",
                    cell.row.values,
                    false
                  );
                  props.$scope.$apply();
                }}
              >
                {String(cell.value)}
              </LinkItemContainer>
            ),
            filter: filterContainText,
          },
          {
            accessor: "EName",
            Header: "Name",
            Cell: Cell,
            filter: filterContainText,
          },
          {
            accessor: "Description",
            Header: "Description",
            Cell: Cell,
            filter: filterContainText,
          },
          {
            accessor: "ERPID",
            Header: "ERP ID",
            Cell: Cell,
            filter: filterContainText,
          },
          {
            accessor: "DepartmentName",
            Header: "Department",
            Cell: Cell,
            filter: filterContainText,
          },
          {
            accessor: "IsActive",
            Header: "Active",
            Filteroptions: [
              { value: false, label: "FALSE" },
              { value: true, label: "TRUE" },
            ],
            Cell: BooleabGraphicCell,
            filter: filterBoolean,
            Filter: SelectColumnFilter,
          },
          {
            accessor: "DisplayOrder",
            Header: "Display Order",
            Cell: Cell,
            filter: filterContainText,
          },
        ];

        settableData({
          columns: columns,
          data: tableData,
          Title: "Product Lines",
          status: TableStatus.LOADED,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const TableWrapperRef = useRef(null);
  const [tableSizes, settableSizes] = useState({ width: 0, height: 0 });
  const [tableData, settableData] = useState({
    columns: [],
    data: [],
    status: TableStatus.LOADING,
  });

  useEffect(() => {
    if (TableWrapperRef.current) {
      const fullWidth = TableWrapperRef.current.getBoundingClientRect().width;
      const fullHeight = TableWrapperRef.current.getBoundingClientRect().height;
      settableSizes({ width: fullWidth, height: fullHeight });
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <TableContainer
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#ffffff",
        }}
        className="reactTable"
        ref={TableWrapperRef}
      >
        <GridVirtualizerFixed
          tableData={tableData}
          tableSizes={tableSizes}
          singleSelection={false}
          allowShare={false}
          allowFiltering={false}
          allowAdd={false}
          isRtl={theme.dir === "rtl" ? true : false}
        />
      </TableContainer>
    </div>
  );
}

export default MainTable;
