/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import Cell from "../Cells";
import DateCell from "../Cells/Date";
import SelectColumnFilter from "../FilterCells/DropDownFilter";
import GridVirtualizerFixed from "../../Table/GridTable";
import { apiCall } from "../../../../Network";
import { TableContainer } from "../styles";
import { filterContainText, filterBoolean } from "../utils";
import { useTheme } from "styled-components";
import styled from "styled-components";
import CheckBox from "../../../../../Component/DesignSystem/CheckBox";
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

const CheckBoxCellQualityTestActive = ({ row: { index }, cell }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(cell.value);
  const onChange = () => {
    const newValue = !value;
    const request = {
      Tests: [
        {
          key: cell.row.values.id,
          value: newValue,
        },
      ],
    };
    apiCall("SaveTestDefinitions", "POST", request)
      .then((response) => {
        if (response.error === null) {
          setValue(newValue);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(cell.value);
  }, [cell.value]);

  return (
    <>
      <CheckBox checked={value} onChange={onChange} />
    </>
  );
};
function MainTable(props) {
  const theme = useTheme();
  //TEMPORARY LOAD SearchResult EXAMPLE!!!!
  const assignCurrentStep = useMemo(
    () => searchParent(props, "assignCurrentStep"),
    [props]
  );
  useEffect(() => {
    apiCall("GetTestsDefinitions", "POST", {})
      .then((response) => {
        let tableData = response.ResponseList || [];
        tableData = tableData.map((elem) => ({
          ...elem,
          isdraftmode:
            elem.isdraftmode === true ? "Draft Mode" : "Release Mode",
        }));
        let columns = [
          {
            accessor: "id",
            Header: "Index",
            Cell: ({ cell }) => (
              <LinkItemContainer
                style={{ overflow: "hidden", height: "100%", width: "100%" }}
                onClick={() => {
                  assignCurrentStep("add-qc-tests", tableData[+cell.row.id]);
                  props.$scope.$apply();
                  props.$parent.$apply();
                }}
              >
                {String(cell.value)}
              </LinkItemContainer>
            ),
            filter: filterContainText,
          },
          {
            accessor: "subtypename",
            Header: "Test Name",
            Cell: Cell,
            filter: filterContainText,
            aggregations: [],
          },
          {
            accessor: "testtypename",
            Header: "Test Type",
            Cell: Cell,
            filter: filterContainText,
            aggregations: [],
          },
          {
            accessor: "isdraftmode",
            Header: "Test Mode",
            Cell: Cell,
            filter: filterContainText,
            aggregations: [],
          },
          {
            accessor: "machinetypename",
            Header: "Machine Type",
            Cell: Cell,
            filter: filterContainText,
            aggregations: [],
          },
          {
            accessor: "productname",
            Header: "Product",
            Cell: Cell,
            filter: filterContainText,
            aggregations: [],
          },
          {
            accessor: "lastupdate",
            Header: "Last Update",
            Cell: DateCell,
            DisplayType: "date",
            aggregations: [],
            filter: filterContainText,
          },
          {
            accessor: "isactive",
            Header: "Active Test",
            Filteroptions: [
              { value: false, label: "FALSE" },
              { value: true, label: "TRUE" },
            ],
            Cell: CheckBoxCellQualityTestActive,
            filter: filterBoolean,
            Filter: SelectColumnFilter,
          },
          {
            accessor: "qualitytestgroupname",
            Header: "Quality Test Group",
            Cell: Cell,
            aggregations: [],
            filter: filterContainText,
          },
        ];

        settableData({
          columns: columns,
          data: tableData,
          Title: "Configure_Quality_Tests",
          status: TableStatus.LOADED,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [assignCurrentStep, props.$parent, props.$scope]);

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
