import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  useTable,
  useSortBy,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import Switch from "../../../../Component/Switch/Swtich";
import CheckIcon from "@material-ui/icons/Check";
import { useDispatch, useSelector } from "react-redux";
import { SetActiveTriggerCard, SetIsSelectedRule } from "../../slice";

import {
  selectCardsResults,
  selectSearchValue,
  selectLoadingTriggers,
} from "../../slice/selectors";
import {
  ArrowContainer,
  ArrowDown,
  ArrowUp,
  Col,
  ColContainer,
  Row,
  Styles,
  CheckBoxContainer,
  Container,
  CheckMark,
} from "./styles";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { DateTime, timeAgo } from "../../../../utils/CommonFunctions";
import { LoadingContainer, LoadingTitle } from "../../styles";
import CircularProgress from "@mui/material/CircularProgress";
import { TooltipDate } from "../../../../Component/ToolTip/ToolTipMUI";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TableView = (props) => {
  const data_results = useSelector(selectCardsResults);
  //const Error = useSelector(selectErrorTriggers);
  const Loading = useSelector(selectLoadingTriggers);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  // to compare switches (isActive)
  const compareIsActive = React.useCallback((rowA, rowB, columnId, desc) => {
    const value = desc
      ? rowA.values[columnId] - rowB.values[columnId]
      : rowA.values[columnId] - rowB.values[columnId];
    return value;
  }, []);

  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata([...data_results]);
  }, [data_results]);

  // const data = useMemo(() => data_cards, [data_cards]);

  const columns = useMemo(
    () => [
      {
        id: "selection",
        accessor: "selection",
        Header: "",
        collapse: `checkbox`,
        disableSortBy: true,
        Cell: ({ row }) => (
          <div style={{ textAlign: "center" }}>
            {" "}
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      {
        Header: t(translations.RulesContainer.TABLE.TITLE),
        accessor: "name", // accessor is the "key" in the data
        collapse: `status`,
      },
      {
        accessor: "IsActive",
        Header: t(translations.RulesContainer.TABLE.STATUS),
        collapse: `status`,
        sortType: compareIsActive,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Cell: ({ cell, cell: { value, column }, row, row: { original } }) => {
          const [state, setstate] = useState(original.IsActive);

          const onToggleChange = useCallback(() => {
            let ruletext = "";
            if (
              row.original.triggerText.toLocaleLowerCase().includes("every day")
            ) {
              ruletext += "Every day";
            } else if (
              row.original.triggerText
                .toLocaleLowerCase()
                .includes("every week")
            ) {
              ruletext += "Every week";
            } else if (
              row.original.triggerText
                .toLocaleLowerCase()
                .includes("every month")
            ) {
              ruletext += "Every month";
            } else {
              ruletext += "Every time period";
            }

            console.log("ROW", row);
            const dispatchObject = {
              ID: row.original.TriggerGroupID,
              Name: row.original.name,
              RuleText: ruletext,
              IsActive: state ? 0 : 1,
            };

            setstate((prev) => !prev);
            setTimeout(
              () => dispatch(SetActiveTriggerCard(dispatchObject)),
              100
            );
          }, [row, state]);

          return (
            <div
              onClick={onToggleChange}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button> {state ? "T" : "F"}</button>
              <Switch IsActive={state} />
            </div>
          );
        },
      },
      {
        Header: t(translations.RulesContainer.TABLE.RULE),
        accessor: "triggerText",
        Cell: ({ row }) => {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: "<b>" + row.original.triggerText + "</b>",
              }}
            />
          );
        },
      },
      {
        Header: t(translations.RulesContainer.TABLE.CREATOR),
        accessor: "GroupCreateUser",
        collapse: `status`,
        Cell: ({ row }) => {
          return (
            <TooltipDate
              title={row.original.GroupCreateUser}
              arrow
              placement="top"
            >
              <div>{row.original.GroupCreateUser}</div>
            </TooltipDate>
          );
        },
      },
      {
        Header: t(translations.RulesContainer.TABLE.LASTUPDATE),
        accessor: "CreateDate",
        collapse: `status`,
        Cell: ({ row }) => {
          const getTime = (CreateDate) => {
            if (CreateDate) {
              let time = timeAgo(CreateDate);
              if (time[1] === "DATE") {
                return time[0].toString();
              } else {
                let str_time =
                  t(translations.RulesContainer.CARD.UPDATED) +
                  " " +
                  (time[0] === 0
                    ? t(translations.RulesContainer.CARD[time[1]])
                    : time[0] +
                      " " +
                      t(translations.RulesContainer.CARD[time[1]]));
                return str_time;
              }
            }
          };
          return (
            <TooltipDate
              title={DateTime(row.original.CreateDate)}
              arrow
              placement="top"
            >
              <div>{getTime(row.original.CreateDate)}</div>
            </TooltipDate>
          );
        },
      },
    ],
    [compareIsActive, dispatch, t]
  );

  // const stateReducer = useCallback((newState, action, prevState) => {
  //   if (action.type === 'setChecked') {
  //     return { ...newState, activeRowIds: !prevState.activeRowIds }
  //   }
  //   return { ...newState, activeRowIds: false }
  // }, []);

  const tableInstance = useTable(
    { columns, data: data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    setGlobalFilter,
    state: { selectedRowIds },
  } = tableInstance;

  //when checkbox clicked change redux state (selected items)
  useEffect(() => {
    console.log("selected ids ", selectedRowIds);
    console.log("selectedFlatRows ", selectedFlatRows);
    const SelectedItems = [];
    selectedFlatRows.forEach((elem) => {
      if (elem.isSelected) {
        SelectedItems.push(elem.original.ID);
      }
    });
    dispatch(SetIsSelectedRule(SelectedItems));
  }, [selectedRowIds, selectedFlatRows, dispatch]);

  //to know width of each row
  const GetClassNameOfColRow = (Col) => {
    switch (Col) {
      case "checkbox":
        return `collapseReactTable_Checkbox`;

      case "status":
        return `collapseReactTable_status`;

      case "title":
        return `collapseReactTable_title`;
      default:
        return ``;
    }
  };

  /*
   * START handle search in table
   */
  const handleSearch = useAsyncDebounce((value) => {
    setGlobalFilter(value || "");
  }, 200);

  const handleSearchCallBack = useCallback(handleSearch, [handleSearch]);

  const SearchValue = useSelector(selectSearchValue);

  /*
   * END handle search in table
   */

  useEffect(() => {
    handleSearchCallBack(SearchValue);
  }, [SearchValue, handleSearchCallBack]);

  return (
    <Styles>
      <div className="wrapper">
        {Loading === false ? (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <Col
                      key={index}
                      {...column.getHeaderProps(
                        column.getSortByToggleProps({
                          className: GetClassNameOfColRow(column.collapse),
                        })
                      )}
                    >
                      <ColContainer>
                        {column.render("Header")}
                        {column.canSort ? (
                          <ArrowContainer onClick={() => console.log(column)}>
                            <ArrowUp />
                            <ArrowDown />
                          </ArrowContainer>
                        ) : null}
                        {column.isSorted ? (column.isSortedDesc ? "" : "") : ""}{" "}
                      </ColContainer>
                    </Col>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr key={index} {...row.getRowProps()} className="tr">
                    {row.cells.map((cell, ind) => {
                      return (
                        <Row
                          key={ind}
                          {...cell.getCellProps({
                            className: GetClassNameOfColRow(
                              cell.column.collapse
                            ),
                          })}
                          isSelected={cell.row.isSelected}
                        >
                          {cell.render("Cell")}
                          {/* {cell.row.isSelected? "true" : "false"} */}
                        </Row>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <LoadingContainer>
            <LoadingTitle>Loading... Please wait</LoadingTitle>
            <CircularProgress />
          </LoadingContainer>
        )}
      </div>
    </Styles>
  );
};

export default TableView;

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        {/* <input type="checkbox" ref={resolvedRef} checked={rest.checked} onChange={rest.onChange} /> */}
        <Container>
          <CheckBoxContainer
            ref={resolvedRef}
            checked={rest.checked}
            onClick={rest.onChange}
          >
            <CheckMark checkd={rest.checked}>
              <CheckIcon style={{ fontSize: "14px" }}></CheckIcon>
            </CheckMark>
          </CheckBoxContainer>
        </Container>
      </>
    );
  }
);
