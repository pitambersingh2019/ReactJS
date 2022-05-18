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
import IconMenu from "../../../../Component/IconMenu/IconMenu";

const TableView = (props) => {
  const data = useSelector(selectCardsResults);
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

  const columns = useMemo(
    () => [
      {
        Header: t(translations.RulesContainer.TABLE.TITLE),
        accessor: "name", // accessor is the "key" in the data
        collapse: `status`,
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
            <TooltipDate title={row.original.GroupCreateUser} placement="top">
              <div>
                {row.original.GroupCreateUser.length > 20
                  ? row.original.GroupCreateUser.slice(0, 20) + "..."
                  : row.original.GroupCreateUser}
              </div>
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
              placement="top"
            >
              <div>{getTime(row.original.CreateDate)}</div>
            </TooltipDate>
          );
        },
      },
      {
        accessor: "IsActive",
        Header: t(translations.RulesContainer.TABLE.STATUS),
        collapse: `status`,
        sortType: compareIsActive,
        // Cell: ({ row }) => {
        //   return (<div>{row.original.IsActive? "1" : "0"}</div>)

        // }
        Cell: ({ row, row: { original } }) => {
          const [state, setstate] = useState(original.IsActive);

          useEffect(() => {
            setstate(original.IsActive);
          }, [original.IsActive]);

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
          }, [
            row.original.TriggerGroupID,
            row.original.name,
            row.original.triggerText,
            state,
          ]);

          return (
            <div
              onClick={onToggleChange}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Switch IsActive={state} />
            </div>
          );
        },
      },
    ],
    [compareIsActive, dispatch, t]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((cols) => [
      {
        id: "menu",
        Header: "",
        collapse: `menu`,
        disableSortBy: true,
        Cell: ({ row }) => {
          const ItemClickhandler = (optionId) => {
            if (optionId === 0) {
              //edit
              props.handleClickEdit(row.original);
            } else if (optionId === 1) {
              //Duplicate
              props.handleClickDuplicate(row.original);
            } else if (optionId === 2) {
              //delete
              props.handleClickDelete(row.original);
            }
          };

          return (
            <div style={{ textAlign: "center" }}>
              <IconMenu
                data={[
                  { id: 0, name: t(translations.RulesContainer.CARD.EDIT) },
                  {
                    id: 1,
                    name: t(translations.RulesContainer.CARD.DUPLICATE),
                  },
                  {
                    id: 2,
                    name: t(translations.RulesContainer.CARD.DELETE),
                  },
                ]}
                onClickItem={ItemClickhandler}
              />
            </div>
          );
        },
      },
      {
        id: "selection",
        accessor: "selection",
        Header: "",
        collapse: `checkbox`,
        disableSortBy: true,
        Cell: ({ row }) => {
          useEffect(() => {
            dispatch(
              SetIsSelectedRule({
                id: row.original.TriggerGroupID,
                isSelected: row.isSelected,
              })
            );
          }, [row.isSelected, row.original.TriggerGroupID]);

          return (
            <div style={{ textAlign: "center" }}>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          );
        },
      },
      cols[0],
      cols[4],
      cols[1],
      cols[2],
      cols[3],
    ]);
  };

  const tableInstance = useTable(
    { columns, data: data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    tableHooks
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: { selectedRowIds },
  } = tableInstance;

  //when checkbox clicked change redux state (selected items)
  // useEffect(() => {

  //   let selected = []
  //   for (let i = 0; i < selectedFlatRows.length; i++) {
  //     selected.push(selectedFlatRows[i].original.TriggerGroupID)
  //   }
  //   //  dispatch(SetIsSelectedRule(selected));

  // }, [selectedRowIds, dispatch, selectedFlatRows])

  //to know width of each row
  const GetClassNameOfColRow = (Col) => {
    switch (Col) {
      case "checkbox":
        return `collapseReactTable_Checkbox`;

      case "status":
        return `collapseReactTable_status`;

      case "title":
        return `collapseReactTable_title`;

      case "menu":
        return `collapseReactTable_menu`;
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
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Col
                      key={column}
                      {...column.getHeaderProps(
                        column.getSortByToggleProps({
                          className: GetClassNameOfColRow(column.collapse),
                        })
                      )}
                    >
                      <ColContainer>
                        {column.render("Header")}
                        {/* {column.canSort ? <ArrowContainer onClick={() => console.log(column)}>
                          <ArrowUp />
                          <ArrowDown />
                        </ArrowContainer> : null} */}
                        <ArrowContainer>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <ArrowUp />
                            ) : (
                              <ArrowDown />
                            )
                          ) : (
                            ""
                          )}{" "}
                        </ArrowContainer>
                      </ColContainer>
                    </Col>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row} {...row.getRowProps()} className="tr">
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
      <div>
        {/* <input type="checkbox" ref={resolvedRef} checked={rest.checked} onChange={rest.onChange} /> */}
        <Container onClick={rest.onChange}>
          <CheckBoxContainer
            ref={resolvedRef}
            checked={rest.checked}
            onClick={rest.onChange}
          >
            <CheckMark checkd={rest.checked} onClick={rest.onChange}>
              <CheckIcon
                style={{ fontSize: "14px", color: "#ffffff" }}
              ></CheckIcon>
            </CheckMark>
          </CheckBoxContainer>
        </Container>
      </div>
    );
  }
);
