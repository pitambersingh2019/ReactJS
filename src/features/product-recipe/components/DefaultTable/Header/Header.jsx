import React from "react";
import {
  TableHeader,
  TableHeaderRow,
  TableHeaderTH,
  ColContainer,
  ArrowContainer,
  SortTitleWrapper,
  ColTitle,
  SortIconStyle,
} from "./header.styles";
import SortIcon from "../../../../../assets/icons/Table/sort_default.svg";
import SortAscIcon from "../../../../../assets/icons/Table/sort_asc.svg";
import SortDescIcon from "../../../../../assets/icons/Table/sort_desc.svg";

const Header = ({ headerGroups, showBarOnScroll }) => {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup, index) => (
        <TableHeaderRow {...headerGroup.getHeaderGroupProps()} key={index}>
          {headerGroup.headers.map((column, index) => (
            <TableHeaderTH
              key={index}
              {...column.getHeaderProps([{ className: column.className }])}
            >
              <ColContainer>
                <SortTitleWrapper
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <ColTitle>{column.render("Header")}</ColTitle>
                  <ArrowContainer>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <SortIconStyle src={SortDescIcon} alt="sort desc" />
                      ) : (
                        <SortIconStyle src={SortAscIcon} alt="sort asc" />
                      )
                    ) : column.canSort ? (
                      <SortIconStyle src={SortIcon} alt="sort default" />
                    ) : (
                      ""
                    )}{" "}
                  </ArrowContainer>
                </SortTitleWrapper>
                {showBarOnScroll && (
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                )}
              </ColContainer>
            </TableHeaderTH>
          ))}
        </TableHeaderRow>
      ))}
    </TableHeader>
  );
};

export default Header;
